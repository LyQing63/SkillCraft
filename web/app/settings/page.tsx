'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ModelProvider {
    id: string;
    name: string;
    logo: string;
    description: string;
    models: string[];
    apiKeyRequired: boolean;
    apiKey?: string;
    enabled: boolean;
}

interface UserProfile {
    name: string;
    email: string;
    avatar: string;
    bio: string;
    learningGoals: string[];
    preferredLanguage: string;
    timezone: string;
    notifications: {
        email: boolean;
        push: boolean;
        weekly: boolean;
    };
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<'profile' | 'providers' | 'api' | 'notifications'>(
        'profile',
    );

    const [userProfile, setUserProfile] = useState<UserProfile>({
        name: '张三',
        email: 'zhangsan@example.com',
        avatar: '/default-avatar.png',
        bio: '热爱学习的技术爱好者',
        learningGoals: ['前端开发', '人工智能', '数据科学'],
        preferredLanguage: 'zh-CN',
        timezone: 'Asia/Shanghai',
        notifications: {
            email: true,
            push: true,
            weekly: false,
        },
    });

    const [modelProviders, setModelProviders] = useState<ModelProvider[]>([
        {
            id: 'baai',
            name: 'BAAI',
            logo: '🧠',
            description: 'TEXT EMBEDDING, TEXT RE-RANK',
            models: ['bge-large-zh-v1.5', 'bge-reranker-large'],
            apiKeyRequired: true,
            apiKey: '',
            enabled: false,
        },
        {
            id: 'deepseek',
            name: 'DeepSeek',
            logo: '🔍',
            description: 'LLM',
            models: ['deepseek-chat', 'deepseek-coder'],
            apiKeyRequired: true,
            apiKey: '',
            enabled: false,
        },
        {
            id: 'tongyi',
            name: 'Tongyi-Qianwen',
            logo: '🌟',
            description: 'LLM,TEXT EMBEDDING,SPEECH2TEXT,MODERATION',
            models: ['qwen-turbo', 'qwen-plus', 'qwen-max'],
            apiKeyRequired: true,
            apiKey: '',
            enabled: false,
        },
        {
            id: 'youdao',
            name: 'Youdao',
            logo: '📚',
            description: 'LLM,TEXT EMBEDDING,SPEECH2TEXT,MODERATION',
            models: ['youdao-chat', 'youdao-embedding'],
            apiKeyRequired: true,
            apiKey: '',
            enabled: false,
        },
    ]);

    const updateProfile = (field: keyof UserProfile, value: any) => {
        setUserProfile((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const updateNotifications = (field: keyof UserProfile['notifications'], value: boolean) => {
        setUserProfile((prev) => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [field]: value,
            },
        }));
    };

    const updateModelProvider = (id: string, updates: Partial<ModelProvider>) => {
        setModelProviders((prev) =>
            prev.map((provider) => (provider.id === id ? { ...provider, ...updates } : provider)),
        );
    };

    const addLearningGoal = (goal: string) => {
        if (goal && !userProfile.learningGoals.includes(goal)) {
            updateProfile('learningGoals', [...userProfile.learningGoals, goal]);
        }
    };

    const removeLearningGoal = (goal: string) => {
        updateProfile(
            'learningGoals',
            userProfile.learningGoals.filter((g) => g !== goal),
        );
    };

    const saveSettings = () => {
        // 这里可以保存到后端
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        localStorage.setItem('modelProviders', JSON.stringify(modelProviders));
        alert('设置已保存！');
    };

    const setDefaultModels = () => {
        const defaultProviders = modelProviders.map((provider) => ({
            ...provider,
            enabled: provider.id === 'tongyi' || provider.id === 'deepseek',
            apiKey:
                provider.id === 'tongyi'
                    ? 'sk-demo-key-tongyi'
                    : provider.id === 'deepseek'
                      ? 'sk-demo-key-deepseek'
                      : '',
        }));
        setModelProviders(defaultProviders);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-100 to-orange-100">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link href="/" className="flex items-center">
                            <img src="/logo.png" alt="SkillCraft Logo" className="w-8 h-8 mr-3" />
                            <h1 className="text-xl font-semibold text-gray-800">SkillCraft</h1>
                        </Link>
                        <nav className="flex items-center space-x-4">
                            <Link
                                href="/learning"
                                className="text-gray-600 hover:text-pink-600 transition-colors"
                            >
                                学习中心
                            </Link>
                            <Link
                                href="/progress"
                                className="text-gray-600 hover:text-pink-600 transition-colors"
                            >
                                学习进度
                            </Link>
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-pink-600 transition-colors"
                            >
                                返回首页
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            用户
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
                                设置
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600">个性化您的SkillCraft体验</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <div className="lg:w-1/4">
                            <div className="bg-white rounded-2xl shadow-lg border border-pink-200 p-6">
                                <nav className="space-y-2">
                                    {[
                                        { key: 'profile', label: '个人资料', icon: '👤' },
                                        { key: 'providers', label: '模型提供商', icon: '🤖' },
                                        { key: 'api', label: 'API设置', icon: '🔑' },
                                        { key: 'notifications', label: '通知设置', icon: '🔔' },
                                    ].map((tab) => (
                                        <button
                                            key={tab.key}
                                            onClick={() => setActiveTab(tab.key as any)}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                                                activeTab === tab.key
                                                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md'
                                                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                                            }`}
                                        >
                                            <span className="text-xl">{tab.icon}</span>
                                            <span className="font-medium">{tab.label}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="lg:w-3/4">
                            {/* Profile Tab */}
                            {activeTab === 'profile' && (
                                <div className="bg-white rounded-2xl shadow-lg border border-pink-200 p-8">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                        个人资料
                                    </h2>

                                    <div className="space-y-6">
                                        {/* Avatar */}
                                        <div className="flex items-center space-x-6">
                                            <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                                {userProfile.name.charAt(0)}
                                            </div>
                                            <div>
                                                <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-all">
                                                    更换头像
                                                </button>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    支持 JPG, PNG 格式，最大 2MB
                                                </p>
                                            </div>
                                        </div>

                                        {/* Basic Info */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    姓名
                                                </label>
                                                <input
                                                    type="text"
                                                    value={userProfile.name}
                                                    onChange={(e) =>
                                                        updateProfile('name', e.target.value)
                                                    }
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    邮箱
                                                </label>
                                                <input
                                                    type="email"
                                                    value={userProfile.email}
                                                    onChange={(e) =>
                                                        updateProfile('email', e.target.value)
                                                    }
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                />
                                            </div>
                                        </div>

                                        {/* Bio */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                个人简介
                                            </label>
                                            <textarea
                                                value={userProfile.bio}
                                                onChange={(e) =>
                                                    updateProfile('bio', e.target.value)
                                                }
                                                rows={3}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                                                placeholder="介绍一下您自己..."
                                            />
                                        </div>

                                        {/* Learning Goals */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                学习目标
                                            </label>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {userProfile.learningGoals.map((goal) => (
                                                    <span
                                                        key={goal}
                                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-800"
                                                    >
                                                        {goal}
                                                        <button
                                                            onClick={() => removeLearningGoal(goal)}
                                                            className="ml-2 text-pink-600 hover:text-pink-800"
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="添加学习目标..."
                                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            addLearningGoal(
                                                                (e.target as HTMLInputElement)
                                                                    .value,
                                                            );
                                                            (e.target as HTMLInputElement).value =
                                                                '';
                                                        }
                                                    }}
                                                />
                                                <button
                                                    onClick={() => {
                                                        const input = document.querySelector(
                                                            'input[placeholder="添加学习目标..."]',
                                                        ) as HTMLInputElement;
                                                        addLearningGoal(input.value);
                                                        input.value = '';
                                                    }}
                                                    className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-all"
                                                >
                                                    添加
                                                </button>
                                            </div>
                                        </div>

                                        {/* Preferences */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    首选语言
                                                </label>
                                                <select
                                                    value={userProfile.preferredLanguage}
                                                    onChange={(e) =>
                                                        updateProfile(
                                                            'preferredLanguage',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                >
                                                    <option value="zh-CN">中文（简体）</option>
                                                    <option value="zh-TW">中文（繁体）</option>
                                                    <option value="en-US">English</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    时区
                                                </label>
                                                <select
                                                    value={userProfile.timezone}
                                                    onChange={(e) =>
                                                        updateProfile('timezone', e.target.value)
                                                    }
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                >
                                                    <option value="Asia/Shanghai">
                                                        北京时间 (UTC+8)
                                                    </option>
                                                    <option value="Asia/Tokyo">
                                                        东京时间 (UTC+9)
                                                    </option>
                                                    <option value="America/New_York">
                                                        纽约时间 (UTC-5)
                                                    </option>
                                                    <option value="Europe/London">
                                                        伦敦时间 (UTC+0)
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Model Providers Tab */}
                            {activeTab === 'providers' && (
                                <div className="bg-white rounded-2xl shadow-lg border border-pink-200 p-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-semibold text-gray-800">
                                            模型提供商
                                        </h2>
                                        <button
                                            onClick={setDefaultModels}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
                                        >
                                            🔧 设置默认模型
                                        </button>
                                    </div>
                                    <p className="text-gray-600 mb-6">配置模型参数和API KEY</p>

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium text-gray-800">
                                            已添加的模型
                                        </h3>
                                        {modelProviders.map((provider) => (
                                            <div
                                                key={provider.id}
                                                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                                                            {provider.logo}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-lg font-semibold text-gray-800">
                                                                {provider.name}
                                                            </h4>
                                                            <p className="text-sm text-gray-600">
                                                                {provider.description}
                                                            </p>
                                                            <div className="flex flex-wrap gap-1 mt-2">
                                                                {provider.models.map((model) => (
                                                                    <span
                                                                        key={model}
                                                                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                                                                    >
                                                                        {model}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-3">
                                                        <button className="text-gray-400 hover:text-gray-600">
                                                            📤 Share
                                                        </button>
                                                        <button className="text-gray-400 hover:text-gray-600">
                                                            🔑 API-Key
                                                        </button>
                                                        <button className="text-gray-400 hover:text-gray-600">
                                                            ⚙️ Show more models
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                updateModelProvider(provider.id, {
                                                                    enabled: !provider.enabled,
                                                                })
                                                            }
                                                            className={`w-12 h-6 rounded-full transition-all ${
                                                                provider.enabled
                                                                    ? 'bg-green-500'
                                                                    : 'bg-gray-300'
                                                            }`}
                                                        >
                                                            <div
                                                                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                                                    provider.enabled
                                                                        ? 'translate-x-6'
                                                                        : 'translate-x-1'
                                                                }`}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>

                                                {provider.enabled && (
                                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            API Key
                                                        </label>
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="password"
                                                                value={provider.apiKey || ''}
                                                                onChange={(e) =>
                                                                    updateModelProvider(
                                                                        provider.id,
                                                                        { apiKey: e.target.value },
                                                                    )
                                                                }
                                                                placeholder="请输入API Key"
                                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                            />
                                                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all">
                                                                测试连接
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                        <h4 className="font-medium text-blue-800 mb-2">💡 提示</h4>
                                        <p className="text-sm text-blue-700">
                                            您可以配置多个AI模型提供商，系统会根据任务类型自动选择最适合的模型。
                                            建议至少配置一个LLM模型用于对话和文本生成。
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* API Settings Tab */}
                            {activeTab === 'api' && (
                                <div className="bg-white rounded-2xl shadow-lg border border-pink-200 p-8">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                        API设置
                                    </h2>

                                    <div className="space-y-6">
                                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                            <h3 className="font-medium text-yellow-800 mb-2">
                                                🔐 API安全
                                            </h3>
                                            <p className="text-sm text-yellow-700">
                                                您的API密钥将被安全加密存储。我们不会将您的密钥用于除您授权之外的任何用途。
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-medium text-gray-800 mb-4">
                                                API使用统计
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg border border-pink-200">
                                                    <div className="text-2xl font-bold text-pink-600">
                                                        1,234
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        本月API调用
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                                                    <div className="text-2xl font-bold text-green-600">
                                                        98.5%
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        成功率
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                                                    <div className="text-2xl font-bold text-purple-600">
                                                        156ms
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        平均响应时间
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-medium text-gray-800 mb-4">
                                                API配置
                                            </h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        请求超时时间（秒）
                                                    </label>
                                                    <input
                                                        type="number"
                                                        defaultValue={30}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        最大重试次数
                                                    </label>
                                                    <input
                                                        type="number"
                                                        defaultValue={3}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Notifications Tab */}
                            {activeTab === 'notifications' && (
                                <div className="bg-white rounded-2xl shadow-lg border border-pink-200 p-8">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                        通知设置
                                    </h2>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-800 mb-4">
                                                通知方式
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-medium text-gray-800">
                                                            邮件通知
                                                        </h4>
                                                        <p className="text-sm text-gray-600">
                                                            接收学习提醒和进度更新
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            updateNotifications(
                                                                'email',
                                                                !userProfile.notifications.email,
                                                            )
                                                        }
                                                        className={`w-12 h-6 rounded-full transition-all ${
                                                            userProfile.notifications.email
                                                                ? 'bg-green-500'
                                                                : 'bg-gray-300'
                                                        }`}
                                                    >
                                                        <div
                                                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                                                userProfile.notifications.email
                                                                    ? 'translate-x-6'
                                                                    : 'translate-x-1'
                                                            }`}
                                                        />
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-medium text-gray-800">
                                                            推送通知
                                                        </h4>
                                                        <p className="text-sm text-gray-600">
                                                            浏览器推送通知
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            updateNotifications(
                                                                'push',
                                                                !userProfile.notifications.push,
                                                            )
                                                        }
                                                        className={`w-12 h-6 rounded-full transition-all ${
                                                            userProfile.notifications.push
                                                                ? 'bg-green-500'
                                                                : 'bg-gray-300'
                                                        }`}
                                                    >
                                                        <div
                                                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                                                userProfile.notifications.push
                                                                    ? 'translate-x-6'
                                                                    : 'translate-x-1'
                                                            }`}
                                                        />
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-medium text-gray-800">
                                                            周报
                                                        </h4>
                                                        <p className="text-sm text-gray-600">
                                                            每周学习总结报告
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() =>
                                                            updateNotifications(
                                                                'weekly',
                                                                !userProfile.notifications.weekly,
                                                            )
                                                        }
                                                        className={`w-12 h-6 rounded-full transition-all ${
                                                            userProfile.notifications.weekly
                                                                ? 'bg-green-500'
                                                                : 'bg-gray-300'
                                                        }`}
                                                    >
                                                        <div
                                                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                                                userProfile.notifications.weekly
                                                                    ? 'translate-x-6'
                                                                    : 'translate-x-1'
                                                            }`}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-medium text-gray-800 mb-4">
                                                通知时间
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        学习提醒时间
                                                    </label>
                                                    <input
                                                        type="time"
                                                        defaultValue="09:00"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        周报发送时间
                                                    </label>
                                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                                                        <option value="monday">周一</option>
                                                        <option value="friday">周五</option>
                                                        <option value="sunday">周日</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Save Button */}
                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={saveSettings}
                                    className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-3 rounded-xl text-lg font-medium hover:from-pink-600 hover:to-orange-600 transition-all shadow-lg"
                                >
                                    保存设置
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
