package handlers

import (
	"AILearning/database"
	"AILearning/models"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// UserOutput defines a safe structure for returning user information.
type UserOutput struct {
	Username string `json:"username"`
	Email    string `json:"email"`
}

// ProfileOutput defines the structure for API responses of user profiles.
// It combines fields from UserProfile and ModelProviders, excluding sensitive data.
type ProfileOutput struct {
	// Fields from UserProfile
	User              UserOutput `json:"user"`
	UserInfo          string     `json:"user_info"`
	PreferredLanguage string     `json:"preferred_language"`
	Avatar            string     `json:"avatar"`
	TimeZone          string     `json:"time_zone"`
	DefaultProviderID uint       `json:"default_provider_id"`

	// Fields from the default ModelProvider
	ProviderName string `json:"provider_name"`
}

// UpdateProfileInput defines the input for updating a user profile and their model provider settings.
type UpdateProfileInput struct {
	// UserProfile fields
	UserInfo          string `json:"user_info"`
	PreferredLanguage string `json:"preferred_language"`
	Avatar            string `json:"avatar"`
	TimeZone          string `json:"time_zone"`
	DefaultProviderID uint   `json:"default_provider_id"`

	// ModelProvider fields
	ProviderName string `json:"provider_name"`
	Endpoint     string `json:"endpoint"`
	APIKey       string `json:"api_key"`
}

// GetProfile handles retrieving a user's profile.
// If the profile does not exist for a valid user, it creates one.
func GetProfile(c *gin.Context) {
	userID, exists := c.Get("userId")
	if !exists {
		Response.Error(c, http.StatusUnauthorized, "User ID not found in context")
		return
	}
	uid := userID.(uint)

	var userProfile models.UserProfile
	err := database.DB.Preload("User").Preload("Providers").Where("user_id = ?", uid).First(&userProfile).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			// Profile not found, check if the user exists
			var user models.User
			if err := database.DB.First(&user, uid).Error; err != nil {
				// This case includes gorm.ErrRecordNotFound for the user
				Response.Error(c, http.StatusNotFound, "User not found, cannot create profile")
				return
			}

			// User exists, so create a new profile for them
			newProfile := models.UserProfile{
				UserID: uid,
				User:   user, // Associate the existing user
			}
			if err := database.DB.Create(&newProfile).Error; err != nil {
				Response.Error(c, http.StatusInternalServerError, "Failed to create new profile")
				return
			}
			// Assign the newly created profile to userProfile to continue the flow
			userProfile = newProfile
		} else {
			// Other database error
			log.Printf("Error retrieving profile for user %d: %v", uid, err)
			Response.Error(c, http.StatusInternalServerError, "Failed to retrieve profile")
			return
		}
	}

	var providerName string
	// Find the default provider's name
	for _, p := range userProfile.Providers {
		if p.ID == userProfile.DefaultProviderID {
			providerName = p.ProviderName
			break
		}
	}

	// Map to the new combined output struct
	output := ProfileOutput{
		User: UserOutput{
			Username: userProfile.User.Username,
			Email:    userProfile.User.Email,
		},
		UserInfo:          userProfile.UserInfo,
		PreferredLanguage: userProfile.PreferredLanguage,
		Avatar:            userProfile.Avatar,
		TimeZone:          userProfile.TimeZone,
		DefaultProviderID: userProfile.DefaultProviderID,
		ProviderName:      providerName,
	}

	Response.Success(c, output, "Profile retrieved successfully")
}

// UpdateProfile handles updating a user's profile.
func UpdateProfile(c *gin.Context) {
	userID, exists := c.Get("userId")
	if !exists {
		Response.Error(c, http.StatusUnauthorized, "User ID not found in context")
		return
	}
	uid := userID.(uint)

	var input UpdateProfileInput
	if err := c.ShouldBindJSON(&input); err != nil {
		Response.Error(c, http.StatusBadRequest, err.Error())
		return
	}

	// Use a transaction to ensure atomicity
	err := database.DB.Transaction(func(tx *gorm.DB) error {
		// Find existing profile or create a new one
		var userProfile models.UserProfile
		if err := tx.Where(models.UserProfile{UserID: uid}).FirstOrCreate(&userProfile).Error; err != nil {
			return err
		}

		// Update UserProfile fields
		userProfile.UserInfo = input.UserInfo
		userProfile.PreferredLanguage = input.PreferredLanguage
		userProfile.Avatar = input.Avatar
		userProfile.TimeZone = input.TimeZone

		// Handle the provider information
		if input.ProviderName != "" {
			var provider models.ModelProviders
			// Find or create the provider for this user
			if err := tx.Where(models.ModelProviders{ProviderName: input.ProviderName, UserID: uid}).FirstOrCreate(&provider).Error; err != nil {
				return err
			}

			// Update provider details
			provider.Endpoint = input.Endpoint
			provider.APIKey = input.APIKey // Encrypt this in a real app!
			if err := tx.Save(&provider).Error; err != nil {
				return err
			}

			// Set this provider as the default
			userProfile.DefaultProviderID = provider.ID
		}

		// Save the updated user profile
		if err := tx.Save(&userProfile).Error; err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		Response.Error(c, http.StatusInternalServerError, "Could not update profile: "+err.Error())
		return
	}

	// Retrieve the updated profile to return the correct output
	GetProfile(c)
}
