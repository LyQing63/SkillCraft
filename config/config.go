package config

import (
	"io/ioutil"
	"os"

	"gopkg.in/yaml.v2"
)

// ServerConfig 定义了服务器的配置
type ServerConfig struct {
	Host string `yaml:"host"`
	Port string `yaml:"port"`
}

// DatabaseConfig 定义了数据库的配置
type DatabaseConfig struct {
	DSN string `yaml:"dsn"`
}

// JWTConfig 定义了 JWT 的配置
type JWTConfig struct {
	Secret string `yaml:"secret"`
}

// Config 是所有配置的根结构体
type Config struct {
	Server   ServerConfig   `yaml:"server"`
	Database DatabaseConfig `yaml:"database"`
	JWT      JWTConfig      `yaml:"jwt"`
}

// AppConfig 是一个全局变量，用于存储应用程序的配置
var AppConfig *Config

// LoadConfig 从 config.yaml 文件加载配置。
// 如果文件不存在，它会创建一个默认的配置文件。
func LoadConfig() error {
	configPath := "config/config.yaml"

	if _, err := os.Stat(configPath); os.IsNotExist(err) {
		defaultConfig := Config{
			Server:   ServerConfig{Host: "127.0.0.1", Port: "8080"},
			Database: DatabaseConfig{DSN: "user:password@tcp(127.0.0.1:3306)/ai_learning_db?charset=utf8mb4&parseTime=True&loc=Local"},
			JWT:      JWTConfig{Secret: "a-very-secret-key"},
		}

		yamlData, err := yaml.Marshal(&defaultConfig)
		if err != nil {
			return err
		}

		if err := os.MkdirAll("config", 0755); err != nil {
			return err
		}

		if err := ioutil.WriteFile(configPath, yamlData, 0644); err != nil {
			return err
		}
	}

	yamlFile, err := ioutil.ReadFile(configPath)
	if err != nil {
		return err
	}

	err = yaml.Unmarshal(yamlFile, &AppConfig)
	if err != nil {
		return err
	}

	return nil
}
