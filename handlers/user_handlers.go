package handlers

import (
	"AILearning/database"
	"AILearning/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

// TODO: Move this to a secure configuration/environment variable
var jwtKey = []byte("your_secret_key")

// Claims defines the JWT claims.
type Claims struct {
	UserID uint `json:"user_id"`
	jwt.RegisteredClaims
}

// RegisterUserInput defines the input for the user registration.
type RegisterUserInput struct {
	Username        string `json:"username" binding:"required"`
	Email           string `json:"email" binding:"required,email"`
	Password        string `json:"password" binding:"required,min=8"`
	ConfirmPassword string `json:"confirmPassword" binding:"required,min=8"`
}

type RegisterUserOutput struct {
	UserID   uint   `json:"user_id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

// RegisterUser handles new user registration.
func RegisterUser(c *gin.Context) {
	var input RegisterUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		Error(c, http.StatusBadRequest, "Invalid input")
		return
	}

	// 检查密码和确认密码是否匹配
	if input.Password != input.ConfirmPassword {
		Error(c, http.StatusBadRequest, "Passwords do not match")
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		Error(c, http.StatusInternalServerError, "Could not hash password")
		return
	}

	// Create user model
	user := models.User{
		Username:     input.Username,
		Email:        input.Email,
		PasswordHash: string(hashedPassword),
	}

	// Save user to the database
	if result := database.DB.Create(&user); result.Error != nil {
		Error(c, http.StatusBadRequest, "User already exists or invalid input")
		return
	}

	Success(c, RegisterUserOutput{
		UserID:   user.ID,
		Username: user.Username,
		Email:    user.Email,
	}, "User registered successfully")
}

// LoginUserInput defines the input for the user login.
type LoginUserInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type LoginUserOutput struct {
	Token string `json:"token"`
}

// LoginUser handles user login.
func LoginUser(c *gin.Context) {
	var input LoginUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		Error(c, http.StatusBadRequest, "Invalid input")
		return
	}

	var user models.User
	if result := database.DB.Where("email = ?", input.Email).First(&user); result.Error != nil {
		Error(c, http.StatusUnauthorized, "用户不存在")
		return
	}

	// Compare the stored hashed password with the password from the input
	err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(input.Password))
	if err != nil {
		// If the passwords do not match, return an unauthorized error
		Error(c, http.StatusUnauthorized, "密码错误")
		return
	}

	// Generate JWT
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		UserID: user.ID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		Error(c, http.StatusInternalServerError, "Could not generate token")
		return
	}

	Success(c, LoginUserOutput{
		Token: tokenString,
	}, "登录成功!")
}

// GetUser handles retrieving a user's basic information.
func GetUser(c *gin.Context) {
	userID, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in context"})
		return
	}

	var user models.User
	if result := database.DB.First(&user, userID); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user_id":  user.ID,
		"username": user.Username,
		"email":    user.Email,
	})
}

// DeleteUser handles deleting a user and their profile.
func DeleteUser(c *gin.Context) {
	userID, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in context"})
		return
	}

	// Start a new transaction
	tx := database.DB.Begin()
	if tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
		return
	}

	// Delete UserProfile first
	if err := tx.Where("user_id = ?", userID).Delete(&models.UserProfile{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user profile"})
		return
	}

	// Delete User
	if err := tx.Delete(&models.User{}, userID).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}

	// Commit the transaction
	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User and profile deleted successfully"})
}
