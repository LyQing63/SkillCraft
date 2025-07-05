// 统一接口响应类型
export type ApiResponse<T = any> = {
  code: number;
  data: T;
  message: string;
};

// 统一请求工具
export async function request<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, options);
  const resp: ApiResponse<T> = await res.json();
  if (resp.code === 200) {
    return resp.data;
  } else {
    throw new Error(resp.message || '请求失败');
  }
}

/*
========================
接口调用标准用法示例
========================

// 登录
async function login(username: string, password: string) {
  return request('/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' }
  });
}

// 注册
async function register(username: string, password: string, email: string) {
  return request('/api/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, email }),
    headers: { 'Content-Type': 'application/json' }
  });
}

// 获取学习计划
async function getLearningPlan() {
  return request('/api/learning-plan', { method: 'GET' });
}

// 新建学习计划
async function createLearningPlan(plan: any) {
  return request('/api/learning-plan', {
    method: 'POST',
    body: JSON.stringify(plan),
    headers: { 'Content-Type': 'application/json' }
  });
}

// 获取学习进度
async function getProgress() {
  return request('/api/progress', { method: 'GET' });
}

// 更新学习进度
async function updateProgress(progress: any) {
  return request('/api/progress', {
    method: 'PUT',
    body: JSON.stringify(progress),
    headers: { 'Content-Type': 'application/json' }
  });
}

// 获取用户设置
async function getSettings() {
  return request('/api/settings', { method: 'GET' });
}

// 更新用户设置
async function updateSettings(settings: any) {
  return request('/api/settings', {
    method: 'PUT',
    body: JSON.stringify(settings),
    headers: { 'Content-Type': 'application/json' }
  });
}

// 错误处理示例
try {
  const data = await login('user', 'pass');
  // 处理 data
} catch (err: any) {
  // 统一处理错误
  alert(err.message);
}
*/