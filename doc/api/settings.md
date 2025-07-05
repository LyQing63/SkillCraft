# 设置模块 API 文档

## 模块说明
设置模块用于管理用户的个性化偏好，如通知、主题、语言等。

---

### 1. 获取用户设置

- **端点**：`GET /api/settings`
- **认证**：JWT
- **功能描述**：获取当前用户的所有设置项。

#### 成功响应

```json
{
  "theme": "light",
  "language": "zh-CN",
  "notificationEnabled": true,
  "updatedAt": "2025-07-02T14:00:00Z"
}
```

---

### 2. 更新用户设置

- **端点**：`PUT /api/settings`
- **认证**：JWT
- **功能描述**：更新当前用户的设置项。

#### 请求参数

```json
{
  "theme": "dark",
  "language": "en-US",
  "notificationEnabled": false
}
```

#### 成功响应

```json
{
  "message": "Settings updated successfully",
  "updatedAt": "2025-07-02T14:10:00Z"
}