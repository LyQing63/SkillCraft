package models

import "gorm.io/gorm"

// UserProfile represents the user's profile information.
type UserProfile struct {
	gorm.Model
	UserID            uint `gorm:"not null;unique"`
	User              User
	DefaultProviderID uint             `gorm:"null"`
	UserInfo          string           `gorm:"type:text"`
	PreferredLanguage string           `gorm:"size:50"`  // e.g., "en", "zh", etc.
	Avatar            string           `gorm:"size:255"` // URL or path to the user's avatar image
	TimeZone          string           `gorm:"size:50"`  // e.g., "UTC", "Asia/Shanghai", etc.
	Providers         []ModelProviders `gorm:"foreignKey:UserID;references:UserID"`
}
