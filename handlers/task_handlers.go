package handlers

import (
	"AILearning/database"
	"AILearning/models"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// GetTasks retrieves tasks for a user within a specific date range.
// @Summary Get user tasks
// @Description Get all learning tasks for the authenticated user between a start and end date
// @Tags tasks
// @Produce json
// @Param startDate query string true "Start Date (YYYY-MM-DD)"
// @Param endDate query string true "End Date (YYYY-MM-DD)"
// @Success 200 {array} models.LearningTask
// @Failure 400 {object} gin.H{"error": "Invalid date format or user ID"}
// @Failure 401 {object} gin.H{"error": "Unauthorized"}
// @Failure 500 {object} gin.H{"error": "Failed to fetch tasks"}
// @Router /api/tasks [get]
func GetTasks(c *gin.Context) {
	// 1. Get user ID from JWT middleware
	userID, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in token"})
		return
	}

	// 2. Get date range from query parameters
	startDateStr := c.Query("startDate")
	endDateStr := c.Query("endDate")

	if startDateStr == "" || endDateStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "startDate and endDate queries are required"})
		return
	}

	// For simplicity, we assume tasks are associated directly with the user for now.
	// In a more complex scenario, we might need to join tables.
	// This handler will find tasks whose creation date is within the range.
	// A more robust implementation might use a specific `task_date` field.
	var tasks []models.LearningTask
	// We need to find all plans for the user first, then get tasks from those plans.
	// This is a simplification. A better approach would be to have a direct link
	// from user to tasks if tasks are not always tied to a plan, or a more efficient query.

	// Let's assume a direct query on LearningTask is sufficient for now,
	// but we need to add a UserID to the LearningTask model.
	// Let's pretend the model is updated for now and write the query.
	// The query should be:
	// result := database.DB.Where("user_id = ? AND created_at BETWEEN ? AND ?", userID, startDate, endDate).Find(&tasks)

	// Since LearningTask doesn't have UserID, we'll fetch plans first.
	var plans []models.LearningPlan
	if err := database.DB.Where("user_id = ?", userID).Find(&plans).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch plans for user"})
		return
	}

	if len(plans) == 0 {
		c.JSON(http.StatusOK, []models.LearningTask{})
		return
	}

	var planIDs []uint
	for _, plan := range plans {
		planIDs = append(planIDs, plan.ID)
	}

	// Parse dates
	layout := "2006-01-02"
	startDate, err := time.Parse(layout, startDateStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid startDate format. Use YYYY-MM-DD"})
		return
	}
	endDate, err := time.Parse(layout, endDateStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid endDate format. Use YYYY-MM-DD"})
		return
	}
	// Adjust endDate to include the whole day
	endDate = endDate.Add(24*time.Hour - 1*time.Nanosecond)

	if err := database.DB.Where("plan_id IN ? AND created_at BETWEEN ? AND ?", planIDs, startDate, endDate).Find(&tasks).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch tasks"})
		return
	}

	c.JSON(http.StatusOK, tasks)
}

// UpdateTaskStatus updates the status of a specific task.
// @Summary Update task status
// @Description Update the status of a single learning task
// @Tags tasks
// @Accept json
// @Produce json
// @Param taskId path int true "Task ID"
// @Param status body object{status: string} true "New status"
// @Success 200 {object} models.LearningTask
// @Failure 400 {object} gin.H{"error": "Invalid input"}
// @Failure 401 {object} gin.H{"error": "Unauthorized"}
// @Failure 403 {object} gin.H{"error": "Forbidden"}
// @Failure 404 {object} gin.H{"error": "Task not found"}
// @Failure 500 {object} gin.H{"error": "Failed to update task"}
// @Router /api/tasks/{taskId}/status [put]
func UpdateTaskStatus(c *gin.Context) {
	// 1. Get user ID from JWT
	userID, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in token"})
		return
	}

	// 2. Get task ID from URL
	taskID, err := strconv.Atoi(c.Param("taskId"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid task ID"})
		return
	}

	// 3. Get new status from request body
	var input struct {
		Status string `json:"status" binding:"required"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 4. Verify task ownership and update
	var task models.LearningTask
	// First, find the task by its ID
	if err := database.DB.First(&task, taskID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	// Now, find the plan associated with the task to check the user ID
	var plan models.LearningPlan
	if err := database.DB.First(&plan, task.PlanID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to verify task ownership"})
		return
	}

	// Check if the plan's user ID matches the one from the token
	if plan.UserID != userID.(uint) {
		c.JSON(http.StatusForbidden, gin.H{"error": "You are not authorized to update this task"})
		return
	}

	// 5. Update the task status
	task.Status = input.Status
	if err := database.DB.Save(&task).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update task status"})
		return
	}

	c.JSON(http.StatusOK, task)
}
