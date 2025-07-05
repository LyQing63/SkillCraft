# 用户模块 API 文档

## 模块说明
用户模块提供注册、登录、用户信息管理、标签管理等功能。

---

### 1. 注册新用户

- **端点**：`POST /api/auth/register`
- **认证**：无需认证
- **功能描述**：注册新用户。

#### 请求参数

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### 成功响应

```json
{
  "userId": 1,
  "username": "string",
  "email": "string",
  "message": "User registered successfully"
}
```

#### 失败响应

```json
{
  "error": "Username or email already exists"
}
```

---

### 2. 用户登录

- **端点**：`POST /api/auth/login`
- **认证**：无需认证
- **功能描述**：用户登录，获取 JWT Token。

#### 请求参数

```json
{
  "email": "string",
  "password": "string"
}
```

#### 成功响应

```json
{
  "token": "string",
  "message": "Login successful"
}
```

#### 失败响应

```json
{
  "error": "Invalid credentials"
}
```

---

### 3. 获取当前用户信息

- **端点**：`GET /api/users/me`
- **认证**：JWT
- **功能描述**：获取当前登录用户的信息。

#### 成功响应

```json
{
  "userId": 1,
  "username": "string",
  "email": "string",
  "profile": {
    "providerName": "string",
    "userInfo": "string"
  },
  "skills": ["string"],
  "learningStyles": ["string"]
}
```

---

### 4. 更新个人资料

- **端点**：`PUT /api/users/me/profile`
- **认证**：JWT
- **功能描述**：更新用户的个人资料（如大模型提供商、个人简介）。

#### 请求参数

```json
{
  "providerName": "string",
  "apiKey": "string",
  "userInfo": "string"
}
```

#### 成功响应

```json
{
  "message": "Profile updated successfully"
}
```

---

### 5. 更新能力与学习方式标签

- **端点**：`PUT /api/users/me/tags`
- **认证**：JWT
- **功能描述**：更新用户的能力和学习方式标签。

#### 请求参数

```json
{
  "skills": ["string"],
  "learningStyles": ["string"]
}
```

#### 成功响应

```json
{
  "message": "User tags updated successfully"
}
```

---

### 6. 删除用户

- **端点**：`DELETE /api/users/me`
- **认证**：JWT
- **功能描述**：删除当前登录的用户及其所有关联数据。

#### 成功响应

```json
{
  "message": "User and all associated data deleted successfully"
}
```

#### 失败响应

```json
{
  "error": "User not found"
}