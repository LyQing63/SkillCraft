package handlers

import (
	"AILearning/database"
	"AILearning/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// UpdateProfileInput defines the input for updating a user profile.
type UpdateProfileInput struct {
	ProviderName string `json:"provider_name"`
	APIKey       string `json:"api_key"`
	UserInfo     string `json:"user_info"`
}

// GetProfile handles retrieving a user's profile.
func GetProfile(c *gin.Context) {
	userID, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in context"})
		return
	}

	var userProfile models.UserProfile
	if result := database.DB.Where("user_id = ?", userID).First(&userProfile); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Profile not found"})
		return
	}

	c.JSON(http.StatusOK, userProfile)
}

// UpdateProfile handles updating a user's profile.
func UpdateProfile(c *gin.Context) {
	userID, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in context"})
		return
	}

	var input UpdateProfileInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var userProfile models.UserProfile
	// Find existing profile or create a new one
	if err := database.DB.Where(models.UserProfile{UserID: userID.(uint)}).FirstOrCreate(&userProfile).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not access profile data"})
		return
	}

	// Update fields
	userProfile.ProviderName = input.ProviderName
	userProfile.APIKey = input.APIKey
	userProfile.UserInfo = input.UserInfo

	if err := database.DB.Save(&userProfile).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update profile"})
		return
	}

	c.JSON(http.StatusOK, userProfile)
}
