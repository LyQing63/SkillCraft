package models

import "gorm.io/gorm"

// UserProfile represents the user's profile information.
type UserProfile struct {
	gorm.Model
	UserID       uint `gorm:"not null;unique"`
	User         User
	ProviderName string `gorm:"size:255"`
	APIKey       string `gorm:"size:255"` // Note: Consider encryption for this field
	UserInfo     string `gorm:"type:text"`
}
