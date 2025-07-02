package database

import (
	"AILearning/models"
	"fmt"
	"log"

	"AILearning/config"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

// InitDatabase initializes the database connection.
func InitDatabase() {
	cfgDB := config.Cfg.DB
	var err error
	fmt.Printf("Connecting to database %s at %s:%d as user %s password %s...\n", cfgDB.Name, cfgDB.Host, cfgDB.Port, cfgDB.User, cfgDB.Password)
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		cfgDB.User, cfgDB.Password, cfgDB.Host, cfgDB.Port, cfgDB.Name,
	)

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
