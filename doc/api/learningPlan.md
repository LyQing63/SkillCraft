# 学习计划模块 API 文档

## 模块说明
学习计划模块提供学习计划的生成、查询、详情、删除及任务管理等功能。

---

### 1. 生成学习计划

- **端点**：`POST /api/learning-plans`
- **认证**：JWT
- **功能描述**：基于用户信息和标签，AI 生成新的学习计划（异步，返回任务 ID）。

#### 请求参数

```json
{
  "title": "string",
  "goal": "string"
}
```

#### 成功响应

```json
{
  "taskId": "string",
  "message": "Learning plan generation started"
}
```

---

### 2. 获取所有学习计划

- **端点**：`GET /api/learning-plans`
- **认证**：JWT
- **功能描述**：获取当前用户的所有学习计划。

#### 成功响应

```json
[
  {
    "planId": 1,
    "title": "string",
    "description": "string",
    "createdAt": "2025-07-02T14:00:00Z"
  }
]
```

---

### 3. 获取学习计划详情

- **端点**：`GET /api/learning-plans/{planId}`
- **认证**：JWT
- **功能描述**：获取指定学习计划的详细信息及所有任务。

#### 成功响应

```json
{
  "planId": 1,
  "title": "string",
  "description": "string",
  "tasks": [
    {
      "taskId": 1,
      "title": "string",
      "description": "string",
      "status": "string",
      "dueDate": "2025-07-09"
    }
  ]
}
```

---

### 4. 删除学习计划

- **端点**：`DELETE /api/learning-plans/{planId}`
- **认证**：JWT
- **功能描述**：删除指定学习计划及其所有任务。

#### 成功响应

```json
{
  "message": "Learning plan and all associated tasks deleted successfully"
}
```

#### 失败响应

```json
{
  "error": "Plan not found"
}
```

---

### 5. 更新任务

- **端点**：`PUT /api/tasks/{taskId}`
- **认证**：JWT
- **功能描述**：更新任务的状态或其他信息。

#### 请求参数

```json
{
  "title": "string",
  "description": "string",
  "status": "string",
  "dueDate": "2025-07-09"
}
```

#### 成功响应

```json
{
  "message": "Task updated successfully"
}
```

---

### 6. 获取日历事件

- **端点**：`GET /api/calendar/events`
- **认证**：JWT
- **功能描述**：获取指定时间范围内的日历事件。

#### 查询参数

- `startDate=YYYY-MM-DD`
- `endDate=YYYY-MM-DD`

#### 成功响应

```json
[
  {
    "eventId": 1,
    "taskId": 1,
    "title": "string",
    "startTime": "2025-07-02T14:00:00Z",
    "endTime": "2025-07-02T16:00:00Z"
  }
]