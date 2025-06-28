'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface GeneratedTask {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    estimatedHours: number;
    points: number;
    prerequisites: string[];
    resources: string[];
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
}

export default function LearningPage() {
    const [selectedSubject, setSelectedSubject] = useState('');
    const [currentLevel, setCurrentLevel] = useState('');
    const [learningGoals, setLearningGoals] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showPlan, setShowPlan] = useState(false);
    const [generatedTasks, setGeneratedTasks] = useState<GeneratedTask[]>([]);
    const router = useRouter();

    const subjects = [
        '编程开发',
        '数据科学',
        '人工智能',
        '网页设计',
        '移动开发',
        '云计算',
        '网络安全',
        '产品管理',
    ];

    const levels = ['初学者', '入门级', '中级', '高级', '专家级'];

    // 模拟AI生成学习计划
    const generateLearningPlan = async () => {
        setIsGenerating(true);

        // 模拟API调用延迟
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // 根据选择的领域生成相应的任务
        const taskTemplates = {
            编程开发: [
                {
                    title: 'HTML基础语法学习',
                    description: '学习HTML标签、属性和文档结构',
                    category: '前端基础',
                    difficulty: 'easy' as const,
                    estimatedHours: 8,
                    points: 100,
                    prerequisites: [],
                    resources: ['MDN HTML教程', 'W3Schools HTML指南'],
                },
                {
                    title: 'CSS样式设计',
                    description: '掌握CSS选择器、布局和响应式设计',
                    category: '前端基础',
                    difficulty: 'medium' as const,
                    estimatedHours: 12,
                    points: 150,
                    prerequisites: ['HTML基础语法学习'],
                    resources: ['CSS完全指南', 'Flexbox教程'],
                },
                {
                    title: 'JavaScript编程基础',
                    description: '学习JavaScript语法、DOM操作和事件处理',
                    category: '编程语言',
                    difficulty: 'medium' as const,
                    estimatedHours: 20,
                    points: 200,
                    prerequisites: ['HTML基础语法学习', 'CSS样式设计'],
                    resources: ['JavaScript权威指南', 'MDN JavaScript教程'],
                },
                {
                    title: 'React框架入门',
                    description: '学习React组件、状态管理和生命周期',
                    category: '前端框架',
                    difficulty: 'hard' as const,
                    estimatedHours: 30,
                    points: 300,
                    prerequisites: ['JavaScript编程基础'],
                    resources: ['React官方文档', 'React实战教程'],
                },
            ],

            数据科学: [
                {
                    title: 'Python基础语法',
                    description: '学习Python基本语法和数据类型',
                    category: '编程语言',
                    difficulty: 'easy' as const,
                    estimatedHours: 15,
                    points: 120,
                    prerequisites: [],
                    resources: ['Python官方教程', 'Python编程快速上手'],
                },
                {
                    title: 'NumPy数组操作',
                    description: '掌握NumPy数组创建、操作和计算',
                    category: '数据处理',
                    difficulty: 'medium' as const,
                    estimatedHours: 10,
                    points: 150,
                    prerequisites: ['Python基础语法'],
                    resources: ['NumPy官方文档', 'NumPy实战指南'],
                },
                {
                    title: 'Pandas数据分析',
                    description: '学习使用Pandas进行数据清洗和分析',
                    category: '数据处理',
                    difficulty: 'medium' as const,
                    estimatedHours: 18,
                    points: 200,
                    prerequisites: ['NumPy数组操作'],
                    resources: ['Pandas官方文档', '数据分析实战'],
                },
                {
                    title: '机器学习入门',
                    description: '学习机器学习基本概念和Scikit-learn库',
                    category: '机器学习',
                    difficulty: 'hard' as const,
                    estimatedHours: 25,
                    points: 300,
                    prerequisites: ['Pandas数据分析'],
                    resources: ['Scikit-learn文档', '机器学习实战'],
                },
            ],
        };

        const selectedTasks =
            taskTemplates[selectedSubject as keyof typeof taskTemplates] ||
            taskTemplates['编程开发'];

        const tasks: GeneratedTask[] = selectedTasks.map((task, index) => ({
            ...task,
            id: `task-${index + 1}`,
            dueDate: new Date(Date.now() + (index + 1) * 7 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split('T')[0],
            priority:
                index < 2 ? ('high' as const) : index < 4 ? ('medium' as const) : ('low' as const),
        }));

        setGeneratedTasks(tasks);
        setIsGenerating(false);
        setShowPlan(true);
    };

    const updateTask = (taskId: string, updates: Partial<GeneratedTask>) => {
        setGeneratedTasks((prev) =>
            prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task)),
        );
    };

    const removeTask = (taskId: string) => {
        setGeneratedTasks((prev) => prev.filter((task) => task.id !== taskId));
    };

    const addNewTask = () => {
        const newTask: GeneratedTask = {
            id: `task-${Date.now()}`,
            title: '新任务',
            description: '请编辑任务描述',
            category: selectedSubject,
            difficulty: 'medium',
            estimatedHours: 5,
            points: 100,
            prerequisites: [],
            resources: [],
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            priority: 'medium',
        };
        setGeneratedTasks((prev) => [...prev, newTask]);
    };

    const saveLearningPlan = () => {
        // 这里可以保存到后端或本地存储
        localStorage.setItem(
            'learningPlan',
            JSON.stringify({
                subject: selectedSubject,
                level: currentLevel,
                goals: learningGoals,
                tasks: generatedTasks,
            }),
        );

        // 跳转到进度页面
        router.push('/progress');
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return 'text-green-600 bg-green-100';
            case 'medium':
                return 'text-yellow-600 bg-yellow-100';
            case 'hard':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'text-red-600 bg-red-100';
            case 'medium':
                return 'text-yellow-600 bg-yellow-100';
            case 'low':
                return 'text-green-600 bg-green-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const getDifficultyText = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return '简单';
            case 'medium':
                return '中等';
            case 'hard':
                return '困难';
            default:
                return difficulty;
        }
    };

    const getPriorityText = (priority: string) => {
        switch (priority) {
            case 'high':
                return '高';
            case 'medium':
                return '中';
            case 'low':
                return '低';
            default:
                return priority;
        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-pink-100 to-orange-100"
            data-oid="rnlzfos"
        >
            {/* Header */}
            <header
                className="bg-white/80 backdrop-blur-sm border-b border-pink-200"
                data-oid="45f2:k8"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="2hta17w">
                    <div className="flex justify-between items-center py-4" data-oid="2drjhvn">
                        <Link href="/" className="flex items-center" data-oid="akkg9.x">
                            <div
                                className="w-8 h-8 bg-gradient-to-r from-pink-300 to-orange-300 rounded-lg mr-3"
                                data-oid="j528gh2"
                            ></div>
                            <h1 className="text-xl font-semibold text-gray-800" data-oid="b6.5a_i">
                                AI学习助手
                            </h1>
                        </Link>
                        <nav className="flex items-center space-x-4" data-oid="5t4z0zt">
                            <Link
                                href="/progress"
                                className="text-gray-600 hover:text-pink-600 transition-colors"
                                data-oid="tawqnpt"
                            >
                                学习进度
                            </Link>
                            <Link
                                href="/settings"
                                className="text-gray-600 hover:text-pink-600 transition-colors"
                                data-oid="e_cazis"
                            >
                                用户设置
                            </Link>
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-pink-600 transition-colors"
                                data-oid="0nb3c_0"
                            >
                                返回首页
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="py-12 px-4 sm:px-6 lg:px-8" data-oid="zkao8me">
                <div className="max-w-4xl mx-auto" data-oid="md90bqd">
                    <div className="text-center mb-12" data-oid="8:r8fe7">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4" data-oid="nf7ti.x">
                            开始您的
                            <span
                                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500"
                                data-oid="53e_o_."
                            >
                                AI学习之旅
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600" data-oid="jcc3c2o">
                            告诉我们您的学习目标，我们将为您量身定制个性化学习计划
                        </p>
                    </div>

                    {/* Learning Setup Form */}
                    <div
                        className="bg-white rounded-2xl shadow-xl border border-pink-200 p-8"
                        data-oid="lh6q6h-"
                    >
                        <div className="space-y-8" data-oid="heaije6">
                            {/* Subject Selection */}
                            <div data-oid="2qs64ya">
                                <h3
                                    className="text-2xl font-semibold text-gray-800 mb-4"
                                    data-oid="sa:ksoh"
                                >
                                    选择学习领域
                                </h3>
                                <div
                                    className="grid grid-cols-2 md:grid-cols-4 gap-3"
                                    data-oid="e7ko4ew"
                                >
                                    {subjects.map((subject) => (
                                        <button
                                            key={subject}
                                            onClick={() => setSelectedSubject(subject)}
                                            className={`p-3 rounded-lg border-2 transition-all ${
                                                selectedSubject === subject
                                                    ? 'border-pink-500 bg-pink-50 text-pink-700'
                                                    : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                                            }`}
                                            data-oid="z.i:5n:"
                                        >
                                            {subject}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Current Level */}
                            <div data-oid="6wlor.1">
                                <h3
                                    className="text-2xl font-semibold text-gray-800 mb-4"
                                    data-oid="hzdelxf"
                                >
                                    当前水平
                                </h3>
                                <div className="flex flex-wrap gap-3" data-oid="1ecp-rl">
                                    {levels.map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => setCurrentLevel(level)}
                                            className={`px-6 py-3 rounded-lg border-2 transition-all ${
                                                currentLevel === level
                                                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                                                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                                            }`}
                                            data-oid="oa4v-2_"
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Learning Goals */}
                            <div data-oid="-vq:_h.">
                                <h3
                                    className="text-2xl font-semibold text-gray-800 mb-4"
                                    data-oid="evvyt:y"
                                >
                                    学习目标
                                </h3>
                                <textarea
                                    value={learningGoals}
                                    onChange={(e) => setLearningGoals(e.target.value)}
                                    placeholder="请描述您的学习目标，例如：我想在3个月内掌握React开发，能够独立完成一个完整的项目..."
                                    className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                                    data-oid="29c:53:"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div
                                className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
                                data-oid="vg.ypj1"
                            >
                                <button
                                    className="bg-white text-gray-700 px-8 py-4 rounded-xl text-lg font-medium border border-pink-200 hover:bg-pink-50 transition-all"
                                    onClick={() => window.history.back()}
                                    data-oid="g6cmb.n"
                                >
                                    返回上一步
                                </button>
                                <button
                                    className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-4 rounded-xl text-lg font-medium hover:from-pink-600 hover:to-orange-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={
                                        !selectedSubject ||
                                        !currentLevel ||
                                        !learningGoals.trim() ||
                                        isGenerating
                                    }
                                    onClick={generateLearningPlan}
                                    data-oid="fmx:on5"
                                >
                                    {isGenerating ? (
                                        <div className="flex items-center" data-oid="yw00qr1">
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                data-oid="yeg1zpv"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    data-oid="z3t6zby"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    data-oid="9.5_qs:"
                                                ></path>
                                            </svg>
                                            生成中...
                                        </div>
                                    ) : (
                                        '生成AI学习计划'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Generated Learning Plan */}
                    {showPlan && (
                        <div
                            className="mt-12 bg-white rounded-2xl shadow-xl border border-pink-200 p-8"
                            data-oid="hskl-l8"
                        >
                            <div
                                className="flex justify-between items-center mb-6"
                                data-oid="k._jauu"
                            >
                                <h3
                                    className="text-2xl font-semibold text-gray-800"
                                    data-oid="3az4hk8"
                                >
                                    🎯 您的个性化学习计划
                                </h3>
                                <button
                                    onClick={addNewTask}
                                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-600 hover:to-green-700 transition-all"
                                    data-oid="lb243dz"
                                >
                                    + 添加任务
                                </button>
                            </div>

                            <div
                                className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg border border-pink-200"
                                data-oid="_ogluak"
                            >
                                <h4 className="font-semibold text-gray-800 mb-2" data-oid=".r9qgi3">
                                    学习概览
                                </h4>
                                <div
                                    className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm"
                                    data-oid="5758.rq"
                                >
                                    <div data-oid="8x_m-c_">
                                        <span className="text-gray-600" data-oid="knydi5g">
                                            学习领域：
                                        </span>
                                        <span
                                            className="font-medium text-pink-600"
                                            data-oid="wwmsgbl"
                                        >
                                            {selectedSubject}
                                        </span>
                                    </div>
                                    <div data-oid="a5jczk7">
                                        <span className="text-gray-600" data-oid="bpph6-y">
                                            当前水平：
                                        </span>
                                        <span
                                            className="font-medium text-orange-600"
                                            data-oid="tdbgi.f"
                                        >
                                            {currentLevel}
                                        </span>
                                    </div>
                                    <div data-oid="tvl3404">
                                        <span className="text-gray-600" data-oid="w.keqeq">
                                            总任务数：
                                        </span>
                                        <span
                                            className="font-medium text-green-600"
                                            data-oid="w0ed5se"
                                        >
                                            {generatedTasks.length} 个
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4" data-oid="uel91-2">
                                {generatedTasks.map((task, index) => (
                                    <div
                                        key={task.id}
                                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                                        data-oid="sl5.xoi"
                                    >
                                        <div
                                            className="flex justify-between items-start mb-4"
                                            data-oid="0e.w1w8"
                                        >
                                            <div
                                                className="flex items-center space-x-3"
                                                data-oid="m77k20x"
                                            >
                                                <span
                                                    className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full text-sm font-bold"
                                                    data-oid="o-.mh0o"
                                                >
                                                    {index + 1}
                                                </span>
                                                <input
                                                    type="text"
                                                    value={task.title}
                                                    onChange={(e) =>
                                                        updateTask(task.id, {
                                                            title: e.target.value,
                                                        })
                                                    }
                                                    className="text-lg font-semibold text-gray-800 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-2 py-1"
                                                    data-oid="sd1_ku."
                                                />
                                            </div>
                                            <button
                                                onClick={() => removeTask(task.id)}
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                                data-oid="0cbudfh"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    data-oid="ketpl5w"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        data-oid=".eeudl-"
                                                    />
                                                </svg>
                                            </button>
                                        </div>

                                        <div
                                            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                                            data-oid="2ul21lw"
                                        >
                                            <div className="space-y-4" data-oid="48gekaq">
                                                <div data-oid="nt9-612">
                                                    <label
                                                        className="block text-sm font-medium text-gray-700 mb-1"
                                                        data-oid="4i3uo6n"
                                                    >
                                                        任务描述
                                                    </label>
                                                    <textarea
                                                        value={task.description}
                                                        onChange={(e) =>
                                                            updateTask(task.id, {
                                                                description: e.target.value,
                                                            })
                                                        }
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                                                        rows={3}
                                                        data-oid="6a863bg"
                                                    />
                                                </div>

                                                <div
                                                    className="grid grid-cols-2 gap-3"
                                                    data-oid="gmz-3db"
                                                >
                                                    <div data-oid="g1.3ahb">
                                                        <label
                                                            className="block text-sm font-medium text-gray-700 mb-1"
                                                            data-oid="qkyz06m"
                                                        >
                                                            分类
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={task.category}
                                                            onChange={(e) =>
                                                                updateTask(task.id, {
                                                                    category: e.target.value,
                                                                })
                                                            }
                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                            data-oid="aeb4ph1"
                                                        />
                                                    </div>
                                                    <div data-oid="s-600q3">
                                                        <label
                                                            className="block text-sm font-medium text-gray-700 mb-1"
                                                            data-oid="zwe0fqt"
                                                        >
                                                            预计时长(小时)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={task.estimatedHours}
                                                            onChange={(e) =>
                                                                updateTask(task.id, {
                                                                    estimatedHours:
                                                                        parseInt(e.target.value) ||
                                                                        0,
                                                                })
                                                            }
                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                            data-oid="vuii326"
                                                        />
                                                    </div>
                                                </div>

                                                <div
                                                    className="grid grid-cols-3 gap-3"
                                                    data-oid="2q78bdt"
                                                >
                                                    <div data-oid="hgpbebm">
                                                        <label
                                                            className="block text-sm font-medium text-gray-700 mb-1"
                                                            data-oid="7e_lj_:"
                                                        >
                                                            难度
                                                        </label>
                                                        <select
                                                            value={task.difficulty}
                                                            onChange={(e) =>
                                                                updateTask(task.id, {
                                                                    difficulty: e.target.value as
                                                                        | 'easy'
                                                                        | 'medium'
                                                                        | 'hard',
                                                                })
                                                            }
                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                            data-oid="l40biwj"
                                                        >
                                                            <option value="easy" data-oid="xdl8jvl">
                                                                简单
                                                            </option>
                                                            <option
                                                                value="medium"
                                                                data-oid="ed86awc"
                                                            >
                                                                中等
                                                            </option>
                                                            <option value="hard" data-oid="5iu5ttc">
                                                                困难
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div data-oid="2yo8f-z">
                                                        <label
                                                            className="block text-sm font-medium text-gray-700 mb-1"
                                                            data-oid="30zxww8"
                                                        >
                                                            优先级
                                                        </label>
                                                        <select
                                                            value={task.priority}
                                                            onChange={(e) =>
                                                                updateTask(task.id, {
                                                                    priority: e.target.value as
                                                                        | 'low'
                                                                        | 'medium'
                                                                        | 'high',
                                                                })
                                                            }
                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                            data-oid="p_5oun2"
                                                        >
                                                            <option value="low" data-oid="o1g6-a7">
                                                                低
                                                            </option>
                                                            <option
                                                                value="medium"
                                                                data-oid="m0gwumu"
                                                            >
                                                                中
                                                            </option>
                                                            <option value="high" data-oid="qho5u5g">
                                                                高
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div data-oid="dnm17an">
                                                        <label
                                                            className="block text-sm font-medium text-gray-700 mb-1"
                                                            data-oid="t2r-8xu"
                                                        >
                                                            积分
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={task.points}
                                                            onChange={(e) =>
                                                                updateTask(task.id, {
                                                                    points:
                                                                        parseInt(e.target.value) ||
                                                                        0,
                                                                })
                                                            }
                                                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                            data-oid="o3iw43r"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4" data-oid="fgnmm:q">
                                                <div data-oid="vj8hw7c">
                                                    <label
                                                        className="block text-sm font-medium text-gray-700 mb-1"
                                                        data-oid="308c:ly"
                                                    >
                                                        截止日期
                                                    </label>
                                                    <input
                                                        type="date"
                                                        value={task.dueDate}
                                                        onChange={(e) =>
                                                            updateTask(task.id, {
                                                                dueDate: e.target.value,
                                                            })
                                                        }
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                        data-oid="f_oar-_"
                                                    />
                                                </div>

                                                <div data-oid="3g7lcs-">
                                                    <label
                                                        className="block text-sm font-medium text-gray-700 mb-1"
                                                        data-oid="2d_7uod"
                                                    >
                                                        前置任务
                                                    </label>
                                                    <div className="space-y-2" data-oid=".n6s-zw">
                                                        {task.prerequisites.map(
                                                            (prereq, prereqIndex) => (
                                                                <div
                                                                    key={prereqIndex}
                                                                    className="flex items-center space-x-2"
                                                                    data-oid="j6t6vvg"
                                                                >
                                                                    <input
                                                                        type="text"
                                                                        value={prereq}
                                                                        onChange={(e) => {
                                                                            const newPrereqs = [
                                                                                ...task.prerequisites,
                                                                            ];

                                                                            newPrereqs[
                                                                                prereqIndex
                                                                            ] = e.target.value;
                                                                            updateTask(task.id, {
                                                                                prerequisites:
                                                                                    newPrereqs,
                                                                            });
                                                                        }}
                                                                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                                                                        data-oid="ozxe8:."
                                                                    />

                                                                    <button
                                                                        onClick={() => {
                                                                            const newPrereqs =
                                                                                task.prerequisites.filter(
                                                                                    (_, i) =>
                                                                                        i !==
                                                                                        prereqIndex,
                                                                                );
                                                                            updateTask(task.id, {
                                                                                prerequisites:
                                                                                    newPrereqs,
                                                                            });
                                                                        }}
                                                                        className="text-red-500 hover:text-red-700"
                                                                        data-oid="0b7vqi2"
                                                                    >
                                                                        <svg
                                                                            className="w-4 h-4"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            viewBox="0 0 24 24"
                                                                            data-oid="a3xw1_l"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M6 18L18 6M6 6l12 12"
                                                                                data-oid="17n_9va"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            ),
                                                        )}
                                                        <button
                                                            onClick={() =>
                                                                updateTask(task.id, {
                                                                    prerequisites: [
                                                                        ...task.prerequisites,
                                                                        '',
                                                                    ],
                                                                })
                                                            }
                                                            className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                                                            data-oid="7qrq6fn"
                                                        >
                                                            + 添加前置任务
                                                        </button>
                                                    </div>
                                                </div>

                                                <div data-oid="ix-rhso">
                                                    <label
                                                        className="block text-sm font-medium text-gray-700 mb-1"
                                                        data-oid="4:cg1-a"
                                                    >
                                                        学习资源
                                                    </label>
                                                    <div className="space-y-2" data-oid="usaa9sl">
                                                        {task.resources.map(
                                                            (resource, resourceIndex) => (
                                                                <div
                                                                    key={resourceIndex}
                                                                    className="flex items-center space-x-2"
                                                                    data-oid="roc5_r_"
                                                                >
                                                                    <input
                                                                        type="text"
                                                                        value={resource}
                                                                        onChange={(e) => {
                                                                            const newResources = [
                                                                                ...task.resources,
                                                                            ];

                                                                            newResources[
                                                                                resourceIndex
                                                                            ] = e.target.value;
                                                                            updateTask(task.id, {
                                                                                resources:
                                                                                    newResources,
                                                                            });
                                                                        }}
                                                                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                                                                        data-oid="cw_5t7a"
                                                                    />

                                                                    <button
                                                                        onClick={() => {
                                                                            const newResources =
                                                                                task.resources.filter(
                                                                                    (_, i) =>
                                                                                        i !==
                                                                                        resourceIndex,
                                                                                );
                                                                            updateTask(task.id, {
                                                                                resources:
                                                                                    newResources,
                                                                            });
                                                                        }}
                                                                        className="text-red-500 hover:text-red-700"
                                                                        data-oid="mlo0t.c"
                                                                    >
                                                                        <svg
                                                                            className="w-4 h-4"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            viewBox="0 0 24 24"
                                                                            data-oid="-l3k66s"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M6 18L18 6M6 6l12 12"
                                                                                data-oid="mv7lx27"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            ),
                                                        )}
                                                        <button
                                                            onClick={() =>
                                                                updateTask(task.id, {
                                                                    resources: [
                                                                        ...task.resources,
                                                                        '',
                                                                    ],
                                                                })
                                                            }
                                                            className="text-sm text-pink-600 hover:text-pink-700 font-medium"
                                                            data-oid="7:3nmlr"
                                                        >
                                                            + 添加学习资源
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Task Summary */}
                                        <div
                                            className="mt-4 pt-4 border-t border-gray-200"
                                            data-oid="8-mv6-o"
                                        >
                                            <div
                                                className="flex flex-wrap items-center gap-3"
                                                data-oid="joi_j4x"
                                            >
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(task.difficulty)}`}
                                                    data-oid="q3y1afw"
                                                >
                                                    {getDifficultyText(task.difficulty)}
                                                </span>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}
                                                    data-oid="x:2ntls"
                                                >
                                                    优先级: {getPriorityText(task.priority)}
                                                </span>
                                                <span
                                                    className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                    data-oid="6ru7ot3"
                                                >
                                                    {task.estimatedHours} 小时
                                                </span>
                                                <span
                                                    className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                                                    data-oid="q.cb4yp"
                                                >
                                                    {task.points} 积分
                                                </span>
                                                <span
                                                    className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                                    data-oid="3xsth4p"
                                                >
                                                    截止:{' '}
                                                    {new Date(task.dueDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div
                                className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pt-6 border-t border-gray-200"
                                data-oid="f13gszf"
                            >
                                <button
                                    onClick={() => setShowPlan(false)}
                                    className="bg-white text-gray-700 px-8 py-3 rounded-xl text-lg font-medium border border-gray-300 hover:bg-gray-50 transition-all"
                                    data-oid="6jg0vcy"
                                >
                                    重新生成
                                </button>
                                <button
                                    onClick={saveLearningPlan}
                                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl text-lg font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-lg"
                                    data-oid="x279v7d"
                                >
                                    保存学习计划
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Features Preview */}
                    {!showPlan && (
                        <div className="mt-16 grid md:grid-cols-3 gap-8" data-oid="xhio50i">
                            <div className="text-center" data-oid="c2l_w.o">
                                <div
                                    className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4"
                                    data-oid="3f:dku."
                                >
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="cc17vf4"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                            data-oid="dxe9_v4"
                                        />
                                    </svg>
                                </div>
                                <h4
                                    className="text-xl font-semibold text-gray-800 mb-2"
                                    data-oid="tvra7u1"
                                >
                                    智能分析
                                </h4>
                                <p className="text-gray-600" data-oid="p.lf7si">
                                    AI分析您的背景和目标，制定最适合的学习路径
                                </p>
                            </div>

                            <div className="text-center" data-oid="cxgyt62">
                                <div
                                    className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
                                    data-oid=":.hx_7x"
                                >
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="60bi1hi"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            data-oid="1cfvrjj"
                                        />
                                    </svg>
                                </div>
                                <h4
                                    className="text-xl font-semibold text-gray-800 mb-2"
                                    data-oid="g2:azs2"
                                >
                                    个性化计划
                                </h4>
                                <p className="text-gray-600" data-oid="db.616.">
                                    根据您的时间安排，生成可执行的学习计划
                                </p>
                            </div>

                            <div className="text-center" data-oid="75y0f:n">
                                <div
                                    className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
                                    data-oid="z5ajakx"
                                >
                                    <svg
                                        className="w-8 h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        data-oid="1wamb:z"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                            data-oid="f5rzlv8"
                                        />
                                    </svg>
                                </div>
                                <h4
                                    className="text-xl font-semibold text-gray-800 mb-2"
                                    data-oid="9goy6lo"
                                >
                                    实时调整
                                </h4>
                                <p className="text-gray-600" data-oid="xy8i157">
                                    根据学习进度，动态调整计划内容和难度
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
