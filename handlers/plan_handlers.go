package handlers

import (
	"AILearning/database"
	"AILearning/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type GeneratePlanRequest struct {
	TargetSkill        string `json:"targetSkill" binding:"required"`
	TotalDurationWeeks int    `json:"totalDurationWeeks" binding:"required"`
}

// GenerateLearningPlan handles the creation of a new learning plan.
func GenerateLearningPlan(c *gin.Context) {
	// 1. Get UserID from JWT context
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	// 2. Parse request body
	var req GeneratePlanRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 3. Get user profile (for future use, e.g., learning style)
	var userProfile models.UserProfile
	if err := database.DB.Where("user_id = ?", userID).First(&userProfile).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve user profile"})
		return
	}

	// 4. (Simulated AI Call) Create a hardcoded list of tasks
	// In a real scenario, this would be a call to an AI service
	// tasks := []models.LearningTask{
	// 	{Title: "Week 1: Fundamentals of " + req.TargetSkill, Description: "Understand the core concepts and history.", WeekNumber: 1, Status: "pending"},
	// 	{Title: "Week 2: Practical Application", Description: "Build a simple project using " + req.TargetSkill, WeekNumber: 2, Status: "pending"},
	// 	{Title: "Week 3: Advanced Topics", Description: "Explore advanced features and best practices.", WeekNumber: 3, Status: "pending"},
	// }

	// 5. Create and save the learning plan and tasks to the database
	learningPlan := models.LearningPlan{
		UserID:             userID.(uint),
		Title:              "Learning Plan for " + req.TargetSkill,
		Description:        "A " + strconv.Itoa(req.TotalDurationWeeks) + "-week plan to master " + req.TargetSkill,
		TargetSkill:        req.TargetSkill,
		TotalDurationWeeks: req.TotalDurationWeeks,
	}

	if err := database.DB.Create(&learningPlan).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save learning plan"})
		return
	}

	// 6. Return the created plan and tasks
	c.JSON(http.StatusCreated, gin.H{
		"message": "Learning plan generated successfully",
		"plan":    learningPlan,
	})
}

// DeleteLearningPlan handles deleting a learning plan and its associated tasks.
func DeleteLearningPlan(c *gin.Context) {
	// 1. Get UserID from JWT context
	userID, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	// 2. Get PlanID from URL parameter
	planIDStr := c.Param("planId")
	planID, err := strconv.ParseUint(planIDStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid plan ID"})
		return
	}

	// 3. Verify the plan belongs to the user
	var plan models.LearningPlan
	if err := database.DB.Where("id = ? AND user_id = ?", planID, userID).First(&plan).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Learning plan not found or you don't have permission to delete it"})
		return
	}

	// 4. Start a new transaction
	tx := database.DB.Begin()
	if tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
		return
	}

	// 5. Delete associated tasks first
	if err := tx.Where("plan_id = ?", planID).Delete(&models.LearningTask{}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete associated tasks"})
		return
	}

	// 6. Delete the learning plan
	if err := tx.Delete(&models.LearningPlan{}, planID).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete learning plan"})
		return
	}

	// 7. Commit the transaction
	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Learning plan and associated tasks deleted successfully"})
}
