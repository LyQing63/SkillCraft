package models

import "gorm.io/gorm"

// User represents the user model.
type User struct {
	gorm.Model
	Username     string `gorm:"size:255;not null;unique" json:"username"`
	Email        string `gorm:"size:255;not null;unique" json:"email"`
	PasswordHash string `gorm:"size:255;not null" json:"-"` // Do not expose password hash
}
