package models

import "gorm.io/gorm"

// UserProfile represents the user's profile information.
type ModelProviders struct {
	gorm.Model
	ProviderName string `gorm:"size:255"` // Name of the provider, e.g., "OpenAI", "Google", etc.
	Endpoint     string `gorm:"size:255"` // API endpoint for the provider
	APIKey       string `gorm:"size:255"` // Note: Consider encryption for this field
	UserID       uint
	Models       []Model `gorm:"foreignKey:ProviderID"`
}

// Model represents a specific model offered by a provider.
type Model struct {
	gorm.Model
	ProviderID uint
	ModelName  string `gorm:"size:255"`
}
