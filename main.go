package main

import (
	"AILearning/config"
	"AILearning/database"
	"AILearning/handlers"
	"AILearning/middleware"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	// 加载配置
	if err := config.LoadConfig(); err != nil {
		log.Fatalf("配置加载失败: %v", err)
	}

	// 用 config.yaml 配置初始化数据库
	database.InitDatabase(config.AppConfig.Database.DSN)

	// 初始化 Gin 路由
	router := gin.Default()

	// JWT 密钥用作中间件示例（假设支持参数传递）
	authMiddleware := middleware.AuthMiddleware()

	// API 路由
	api := router.Group("/api")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/register", handlers.RegisterUser)
			auth.POST("/login", handlers.LoginUser)
		}

		user := api.Group("/user")
		user.Use(authMiddleware)
		{
			user.GET("/", handlers.GetUser)
			user.DELETE("/", handlers.DeleteUser)
		}

		profile := api.Group("/profile")
		profile.Use(authMiddleware)
		{
			profile.GET("/", handlers.GetProfile)
			profile.PUT("/", handlers.UpdateProfile)
		}

		plans := api.Group("/plans")
		plans.Use(authMiddleware)
		{
			plans.POST("/", handlers.GenerateLearningPlan)
			plans.DELETE("/:planId", handlers.DeleteLearningPlan)
		}

		tasks := api.Group("/tasks")
		tasks.Use(authMiddleware)
		{
			tasks.GET("/", handlers.GetTasks)
			tasks.PUT("/:taskId/status", handlers.UpdateTaskStatus)
		}
	}

	// 拼接监听地址
	serverAddr := config.AppConfig.Server.Host + ":" + config.AppConfig.Server.Port
	log.Printf("Starting server on %s...\n", serverAddr)
	if err := router.Run(serverAddr); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
