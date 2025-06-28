package models

import "gorm.io/gorm"

// LearningPlan represents an AI-generated learning plan for a user.
type LearningPlan struct {
	gorm.Model
	UserID             uint   `gorm:"not null"`
	Title              string `gorm:"not null"`
	Description        string
	TargetSkill        string `gorm:"not null"`
	TotalDurationWeeks int    `gorm:"not null"`
}

// LearningTask represents a single task within a learning plan.
type LearningTask struct {
	gorm.Model
	PlanID      uint   `gorm:"not null"`
	Title       string `gorm:"not null"`
	Description string
	Status      string `gorm:"default:'pending'"` // e.g., pending, in_progress, completed
	WeekNumber  int
}
