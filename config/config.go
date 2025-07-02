package config

import (
	"fmt"

	"github.com/joho/godotenv"
	"github.com/spf13/viper"
)

type DBConfig struct {
	Host     string
	Port     int
	User     string
	Password string
	Name     string
}

type Server struct {
	Host string
	Port string
}

type JWTConfig struct {
	Secret string
}
type Config struct {
	Server Server
	DB     DBConfig
	JWT    JWTConfig
}

var Cfg Config

func LoadConfig() error {
	// 优先加载 .env 文件，将其中的变量设置到环境变量中
	if err := godotenv.Load(); err != nil {
		// 如果 .env 文件不存在，可以打印一条信息，但不要中断程序
		// 因为环境变量可能已经通过其他方式设置了
		fmt.Println("未找到 .env 文件，将依赖现有环境变量和配置文件:", err)
	}

	// 设置 Viper 从环境变量中读取配置
	// APP_DB_HOST -> db.host
	viper.SetEnvPrefix("APP")
	viper.AutomaticEnv()

	// 将 viper 的键绑定到环境变量
	// 这样做可以确保 viper.Get("db.host") 能够正确获取到 APP_DB_HOST
	viper.BindEnv("db.host", "APP_DB_HOST")
	viper.BindEnv("db.port", "APP_DB_PORT")
	viper.BindEnv("db.user", "APP_DB_USER")
	viper.BindEnv("db.password", "APP_DB_PASSWORD")
	viper.BindEnv("db.name", "APP_DB_NAME")
	viper.BindEnv("jwt.secret", "APP_JWT_SECRET")
	viper.BindEnv("server.host", "APP_SERVER_HOST")
	viper.BindEnv("server.port", "APP_SERVER_PORT")

	// 设置配置文件的路径和名称，作为环境变量不存在时的备用方案
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("./config")

	// 尝试读取配置文件，如果文件不存在也不会报错
	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			// 配置文件未找到，可以忽略，因为我们将依赖环境变量
			fmt.Println("未找到 config.yaml，将完全依赖环境变量。")
		} else {
			// 配置文件找到了但解析出错
			return fmt.Errorf("无法解析配置文件: %w", err)
		}
	}

	// 将所有配置解析到 Cfg 结构体中
	if err := viper.Unmarshal(&Cfg); err != nil {
		return fmt.Errorf("无法解析配置到结构体: %w", err)
	}

	return nil
}
