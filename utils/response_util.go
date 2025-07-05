package utils

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Response 统一接口响应结构体
type Response struct {
	Code    int         `json:"code"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

// ResponseHandler 响应处理器，相当于一个“类”
type ResponseHandler struct{}

// New 创建一个 ResponseHandler 实例（可选工厂函数）
func New() *ResponseHandler {
	return &ResponseHandler{}
}

// JSON 通用响应方法
func (r *ResponseHandler) JSON(c *gin.Context, code int, data interface{}, message string) {
	c.JSON(code, Response{
		Code:    code,
		Data:    data,
		Message: message,
	})
}

// Success 响应成功
func (r *ResponseHandler) Success(c *gin.Context, data interface{}, message string) {
	r.JSON(c, http.StatusOK, data, message)
}

// Error 响应错误
func (r *ResponseHandler) Error(c *gin.Context, code int, message string) {
	r.JSON(c, code, nil, message)
}
