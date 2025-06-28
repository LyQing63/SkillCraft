package database

import (
	"AILearning/models"
	"fmt"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

// InitDatabase initializes the database connection.
func InitDatabase(dsn string) {
	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	fmt.Println("Database connection successfully opened.")

	// Migrate the schema
	err = DB.AutoMigrate(&models.User{}, &models.UserProfile{}, &models.LearningTask{}, &models.LearningPlan{})
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}
	fmt.Println("Database migrated.")
}
