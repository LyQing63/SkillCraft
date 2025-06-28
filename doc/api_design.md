# API 接口设计

本文档定义了 AI 学习网站的 RESTful API 接口。

## 1. 用户认证

### `POST /api/auth/register`
**描述**: 注册新用户。
**请求正文**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
**成功响应 (201 Created)**:
```json
{
  "user_id": "integer",
  "username": "string",
  "email": "string",
  "message": "User registered successfully"
}
```
**错误响应 (400 Bad Request)**:
```json
{
  "error": "Username or email already exists"
}
```

### `POST /api/auth/login`
**描述**: 用户登录。
**请求正文**:
```json
{
  "email": "string",
  "password": "string"
}
```
**成功响应 (200 OK)**:
```json
{
  "token": "string (JWT)",
  "message": "Login successful"
}
```
**错误响应 (401 Unauthorized)**:
```json
{
  "error": "Invalid credentials"
}
```

## 2. 用户信息

### `GET /api/users/me`
**描述**: 获取当前登录用户的信息。
**认证**: 需要 JWT Token。
**成功响应 (200 OK)**:
```json
{
  "user_id": "integer",
  "username": "string",
  "email": "string",
  "profile": {
    "provider_name": "string",
    "user_info": "string"
  },
  "skills": ["string"],
  "learning_styles": ["string"]
}
```

### `PUT /api/users/me/profile`
**描述**: 更新用户的个人资料（包括大模型提供商和个人简介）。
**认证**: 需要 JWT Token。
**请求正文**:
```json
{
  "provider_name": "string",
  "api_key": "string",
  "user_info": "string"
}
```
**成功响应 (200 OK)**:
```json
{
  "message": "Profile updated successfully"
}
```

### `PUT /api/users/me/tags`
**描述**: 更新用户的能力和学习方式标签。
**认证**: 需要 JWT Token。
**请求正文**:
```json
{
  "skills": ["string"],
  "learning_styles": ["string"]
}
```
**成功响应 (200 OK)**:
```json
{
  "message": "User tags updated successfully"
}
```

### `DELETE /api/users/me`
**描述**: 删除当前登录的用户及其所有关联数据（如 Profile）。
**认证**: 需要 JWT Token。
**成功响应 (200 OK)**:
```json
{
  "message": "User and all associated data deleted successfully"
}
```
**错误响应 (404 Not Found)**:
```json
{
  "error": "User not found"
}
```

## 3. 学习计划

### `POST /api/learning-plans`
**描述**: 基于用户的个人信息和标签，请求 AI 生成一个新的学习计划。
**认证**: 需要 JWT Token。
**请求正文**:
```json
{
  "title": "string",
  "goal": "string (e.g., 'Learn Go programming')"
}
```
**成功响应 (202 Accepted)**:
*AI 生成是异步的，立即返回一个任务 ID。*
```json
{
  "task_id": "string",
  "message": "Learning plan generation started"
}
```

### `GET /api/learning-plans`
**描述**: 获取当前用户的所有学习计划。
**认证**: 需要 JWT Token。
**成功响应 (200 OK)**:
```json
[
  {
    "plan_id": "integer",
    "title": "string",
    "description": "string",
    "created_at": "datetime"
  }
]
```

### `GET /api/learning-plans/{plan_id}`
**描述**: 获取特定学习计划的详情，包括所有任务。
**认证**: 需要 JWT Token。
**成功响应 (200 OK)**:
```json
{
  "plan_id": "integer",
  "title": "string",
  "description": "string",
  "tasks": [
    {
      "task_id": "integer",
      "title": "string",
      "description": "string",
      "status": "string",
      "due_date": "date"
    }
  ]
}
```

### `DELETE /api/learning-plans/{plan_id}`
**描述**: 删除指定的学习计划及其所有关联的任务。
**认证**: 需要 JWT Token。
**路径参数**:
*   `plan_id` (integer, required): 要删除的学习计划的 ID。
**成功响应 (200 OK)**:
```json
{
  "message": "Learning plan and all associated tasks deleted successfully"
}
```
**错误响应 (404 Not Found)**:
```json
{
  "error": "Plan not found"
}
```

## 4. 任务与日历

### `PUT /api/tasks/{task_id}`
**描述**: 更新任务的状态或其他信息。
**认证**: 需要 JWT Token。
**请求正文**:
```json
{
  "title": "string",
  "description": "string",
  "status": "string (e.g., 'completed')",
  "due_date": "date"
}
```
**成功响应 (200 OK)**:
```json
{
  "message": "Task updated successfully"
}
```

### `GET /api/calendar/events`
**描述**: 获取指定时间范围内的日历事件。
**认证**: 需要 JWT Token。
**查询参数**: `start_date=YYYY-MM-DD`, `end_date=YYYY-MM-DD`
**成功响应 (200 OK)**:
```json
[
  {
    "event_id": "integer",
    "task_id": "integer",
    "title": "string",
    "start_time": "datetime",
    "end_time": "datetime"
  }
]
```