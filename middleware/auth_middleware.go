package middleware

import (
	"AILearning/config"
	"AILearning/handlers"
	"fmt"
	"net/http"
	"strings"

	"AILearning/utils"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

var Response = &utils.ResponseHandler{}

// AuthMiddleware creates a middleware for JWT authentication.
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			Response.Error(c, http.StatusUnauthorized, "Authorization header not found")
			c.Abort()
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenString == authHeader {
			Response.Error(c, http.StatusUnauthorized, "Invalid Authorization header format")
			c.Abort()
			return
		}

		claims := &handlers.Claims{}
		fmt.Println("解析时token: ", tokenString)
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte(config.Cfg.JWT.Secret), nil // 统一读取配置密钥
		})

		if err != nil {
			if err == jwt.ErrSignatureInvalid {
				Response.Error(c, http.StatusUnauthorized, "Invalid token signature")
				c.Abort()
				return
			}
			Response.Error(c, http.StatusBadRequest, "Error parsing token: "+err.Error())
			c.Abort()
			return
		}

		if !token.Valid {
			Response.Error(c, http.StatusUnauthorized, "Token is not valid")
			c.Abort()
			return
		}

		// Set user ID in context for subsequent handlers
		c.Set("userId", claims.UserID)
		c.Next()
	}
}
