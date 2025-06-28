'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Task {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
    completed: boolean;
    completedAt?: Date;
    dueDate?: Date;
}

interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
    earned: boolean;
    earnedAt?: Date;
    progress: number;
    requirement: number;
}

interface LearningStats {
    totalPoints: number;
    completedTasks: number;
    totalTasks: number;
    earnedBadges: number;
    totalBadges: number;
    currentStreak: number;
    longestStreak: number;
    weeklyGoal: number;
    weeklyProgress: number;
}

export default function ProgressPage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'badges' | 'analytics'>(
        'overview',
    );
    const [tasks, setTasks] = useState<Task[]>([]);
    const [badges, setBadges] = useState<Badge[]>([]);
    const [stats, setStats] = useState<LearningStats>({
        totalPoints: 0,
        completedTasks: 0,
        totalTasks: 0,
        earnedBadges: 0,
        totalBadges: 0,
        currentStreak: 0,
        longestStreak: 0,
        weeklyGoal: 5,
        weeklyProgress: 3,
    });

    // 模拟数据初始化
    useEffect(() => {
        const mockTasks: Task[] = [
            {
                id: '1',
                title: 'React基础概念学习',
                description: '学习React组件、Props和State的基本概念',
                category: '前端开发',
                difficulty: 'easy',
                points: 100,
                completed: true,
                completedAt: new Date('2024-01-15'),
            },
            {
                id: '2',
                title: '构建Todo应用',
                description: '使用React构建一个完整的Todo应用程序',
                category: '前端开发',
                difficulty: 'medium',
                points: 250,
                completed: true,
                completedAt: new Date('2024-01-18'),
            },
            {
                id: '3',
                title: 'Next.js路由系统',
                description: '掌握Next.js的App Router和页面路由',
                category: '前端开发',
                difficulty: 'medium',
                points: 200,
                completed: false,
                dueDate: new Date('2024-01-25'),
            },
            {
                id: '4',
                title: 'TypeScript进阶',
                description: '学习TypeScript的高级类型和泛型',
                category: '编程语言',
                difficulty: 'hard',
                points: 300,
                completed: false,
                dueDate: new Date('2024-01-30'),
            },
        ];

        const mockBadges: Badge[] = [
            {
                id: '1',
                name: '初学者',
                description: '完成第一个学习任务',
                icon: '🌱',
                category: '成就',
                earned: true,
                earnedAt: new Date('2024-01-15'),
                progress: 1,
                requirement: 1,
            },
            {
                id: '2',
                name: 'React新手',
                description: '完成5个React相关任务',
                icon: '⚛️',
                category: '技能',
                earned: true,
                earnedAt: new Date('2024-01-18'),
                progress: 5,
                requirement: 5,
            },
            {
                id: '3',
                name: '连续学习者',
                description: '连续7天完成学习任务',
                icon: '🔥',
                category: '习惯',
                earned: false,
                progress: 3,
                requirement: 7,
            },
            {
                id: '4',
                name: '积分达人',
                description: '累计获得1000积分',
                icon: '💎',
                category: '成就',
                earned: false,
                progress: 350,
                requirement: 1000,
            },
        ];

        setTasks(mockTasks);
        setBadges(mockBadges);

        // 计算统计数据
        const completedTasks = mockTasks.filter((task) => task.completed).length;
        const totalPoints = mockTasks
            .filter((task) => task.completed)
            .reduce((sum, task) => sum + task.points, 0);
        const earnedBadges = mockBadges.filter((badge) => badge.earned).length;

        setStats({
            totalPoints,
            completedTasks,
            totalTasks: mockTasks.length,
            earnedBadges,
            totalBadges: mockBadges.length,
            currentStreak: 3,
            longestStreak: 5,
            weeklyGoal: 5,
            weeklyProgress: 3,
        });
    }, []);

    const toggleTaskComplete = (taskId: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId
                    ? {
                          ...task,
                          completed: !task.completed,
                          completedAt: !task.completed ? new Date() : undefined,
                      }
                    : task,
            ),
        );
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

    const getCategoryColor = (category: string) => {
        const colors = {
            前端开发: 'bg-blue-100 text-blue-800',
            编程语言: 'bg-purple-100 text-purple-800',
            成就: 'bg-yellow-100 text-yellow-800',
            技能: 'bg-green-100 text-green-800',
            习惯: 'bg-pink-100 text-pink-800',
        };
        return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-pink-100 to-orange-100"
            data-oid="hl:mkol"
        >
            {/* Header */}
            <header
                className="bg-white/80 backdrop-blur-sm border-b border-pink-200"
                data-oid="18thbc-"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="2y-t2ke">
                    <div className="flex justify-between items-center py-4" data-oid="3q.mn_0">
                        <Link href="/" className="flex items-center" data-oid="-6:6f5s">
                            <div
                                className="w-8 h-8 bg-gradient-to-r from-pink-300 to-orange-300 rounded-lg mr-3"
                                data-oid="7r9nu7n"
                            ></div>
                            <h1 className="text-xl font-semibold text-gray-800" data-oid="cnp39bx">
                                AI学习助手
                            </h1>
                        </Link>
                        <nav className="flex items-center space-x-4" data-oid="2amm2sp">
                            <Link
                                href="/learning"
                                className="text-gray-600 hover:text-pink-600 transition-colors"
                                data-oid=":polufb"
                            >
                                学习中心
                            </Link>
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-pink-600 transition-colors"
                                data-oid="_r6uo.."
                            >
                                返回首页
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="py-8 px-4 sm:px-6 lg:px-8" data-oid="4nr6_2g">
                <div className="max-w-7xl mx-auto" data-oid="j1qo62a">
                    {/* Page Title */}
                    <div className="text-center mb-8" data-oid="3.gx8n8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4" data-oid="66v1sd5">
                            学习进度
                            <span
                                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500"
                                data-oid="2iz2xaq"
                            >
                                追踪
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600" data-oid="9c:9_.8">
                            记录您的学习成就，可视化进步历程
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-8" data-oid="r3hdlx9">
                        <div
                            className="bg-white rounded-xl p-1 shadow-lg border border-pink-200"
                            data-oid="l..gfb1"
                        >
                            {[
                                { key: 'overview', label: '总览', icon: '📊' },
                                { key: 'tasks', label: '任务', icon: '✅' },
                                { key: 'badges', label: '徽章', icon: '🏆' },
                                { key: 'analytics', label: '分析', icon: '📈' },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key as any)}
                                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                                        activeTab === tab.key
                                            ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md'
                                            : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                                    }`}
                                    data-oid="5a8mccp"
                                >
                                    <span className="mr-2" data-oid="nh0h0yb">
                                        {tab.icon}
                                    </span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8" data-oid="7u.a-60">
                            {/* Stats Cards */}
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                                data-oid="iqq7vrx"
                            >
                                <div
                                    className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100"
                                    data-oid="x5n:i0k"
                                >
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="wdwaw.6"
                                    >
                                        <div data-oid="ta:5i3-">
                                            <p className="text-sm text-gray-600" data-oid="1jsxag1">
                                                总积分
                                            </p>
                                            <p
                                                className="text-3xl font-bold text-pink-600"
                                                data-oid="t0lm7y_"
                                            >
                                                {stats.totalPoints}
                                            </p>
                                        </div>
                                        <div
                                            className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center"
                                            data-oid="pv4cfwr"
                                        >
                                            <span className="text-2xl" data-oid="co20x9b">
                                                💎
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100"
                                    data-oid="qzujliz"
                                >
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid=".i2p__p"
                                    >
                                        <div data-oid="i15hj5j">
                                            <p className="text-sm text-gray-600" data-oid=":yltha7">
                                                完成任务
                                            </p>
                                            <p
                                                className="text-3xl font-bold text-orange-600"
                                                data-oid="pm5tbx8"
                                            >
                                                {stats.completedTasks}/{stats.totalTasks}
                                            </p>
                                        </div>
                                        <div
                                            className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center"
                                            data-oid="cct0b3s"
                                        >
                                            <span className="text-2xl" data-oid="mflxz:a">
                                                ✅
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="bg-white rounded-2xl p-6 shadow-lg border border-green-100"
                                    data-oid="lv:npg-"
                                >
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="4na8c8d"
                                    >
                                        <div data-oid="w0hjoog">
                                            <p className="text-sm text-gray-600" data-oid="i_n3_fr">
                                                获得徽章
                                            </p>
                                            <p
                                                className="text-3xl font-bold text-green-600"
                                                data-oid="qtk-_6d"
                                            >
                                                {stats.earnedBadges}/{stats.totalBadges}
                                            </p>
                                        </div>
                                        <div
                                            className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"
                                            data-oid="dttns6z"
                                        >
                                            <span className="text-2xl" data-oid="t_:wiac">
                                                🏆
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100"
                                    data-oid="c5dwf:k"
                                >
                                    <div
                                        className="flex items-center justify-between"
                                        data-oid="4458j1a"
                                    >
                                        <div data-oid="bsks_-y">
                                            <p className="text-sm text-gray-600" data-oid="ixfc587">
                                                连续天数
                                            </p>
                                            <p
                                                className="text-3xl font-bold text-purple-600"
                                                data-oid="8z1e:ds"
                                            >
                                                {stats.currentStreak}
                                            </p>
                                        </div>
                                        <div
                                            className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"
                                            data-oid="lgkrjhm"
                                        >
                                            <span className="text-2xl" data-oid="1h5-ck_">
                                                🔥
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Weekly Progress */}
                            <div
                                className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100"
                                data-oid="g6gxpr9"
                            >
                                <h3
                                    className="text-xl font-semibold text-gray-800 mb-4"
                                    data-oid="coqlfpz"
                                >
                                    本周学习目标
                                </h3>
                                <div
                                    className="flex items-center justify-between mb-2"
                                    data-oid="m3kd8d1"
                                >
                                    <span className="text-gray-600" data-oid="_5wkmn8">
                                        进度
                                    </span>
                                    <span className="text-gray-800 font-medium" data-oid="tk9.t8y">
                                        {stats.weeklyProgress}/{stats.weeklyGoal} 任务
                                    </span>
                                </div>
                                <div
                                    className="w-full bg-gray-200 rounded-full h-3"
                                    data-oid="fta3j6m"
                                >
                                    <div
                                        className="bg-gradient-to-r from-pink-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${(stats.weeklyProgress / stats.weeklyGoal) * 100}%`,
                                        }}
                                        data-oid=".ad1i1n"
                                    ></div>
                                </div>
                                <p className="text-sm text-gray-600 mt-2" data-oid=":f9-mo:">
                                    还需完成 {stats.weeklyGoal - stats.weeklyProgress}{' '}
                                    个任务达成本周目标
                                </p>
                            </div>

                            {/* Recent Achievements */}
                            <div
                                className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100"
                                data-oid="jg1znfg"
                            >
                                <h3
                                    className="text-xl font-semibold text-gray-800 mb-4"
                                    data-oid="tbjgphy"
                                >
                                    最近成就
                                </h3>
                                <div className="space-y-3" data-oid="47d6f:k">
                                    {badges
                                        .filter((badge) => badge.earned)
                                        .slice(0, 3)
                                        .map((badge) => (
                                            <div
                                                key={badge.id}
                                                className="flex items-center space-x-3 p-3 bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg"
                                                data-oid="c_a1.eh"
                                            >
                                                <span className="text-2xl" data-oid="1dsiqzc">
                                                    {badge.icon}
                                                </span>
                                                <div data-oid="nohrxmn">
                                                    <p
                                                        className="font-medium text-gray-800"
                                                        data-oid="qrn8yhm"
                                                    >
                                                        {badge.name}
                                                    </p>
                                                    <p
                                                        className="text-sm text-gray-600"
                                                        data-oid="vf1mvvj"
                                                    >
                                                        {badge.description}
                                                    </p>
                                                </div>
                                                <div
                                                    className="ml-auto text-xs text-gray-500"
                                                    data-oid="aiyxteq"
                                                >
                                                    {badge.earnedAt?.toLocaleDateString()}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tasks Tab */}
                    {activeTab === 'tasks' && (
                        <div className="space-y-6" data-oid="eltsbvy">
                            <div
                                className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100"
                                data-oid="ufii7ls"
                            >
                                <h3
                                    className="text-xl font-semibold text-gray-800 mb-6"
                                    data-oid="41z9t:i"
                                >
                                    学习任务
                                </h3>
                                <div className="space-y-4" data-oid="pkimpz.">
                                    {tasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className={`p-4 rounded-lg border-2 transition-all ${
                                                task.completed
                                                    ? 'border-green-200 bg-green-50'
                                                    : 'border-gray-200 hover:border-pink-300'
                                            }`}
                                            data-oid="g9ao_v_"
                                        >
                                            <div
                                                className="flex items-start space-x-4"
                                                data-oid="g5o-be1"
                                            >
                                                <button
                                                    onClick={() => toggleTaskComplete(task.id)}
                                                    className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                                        task.completed
                                                            ? 'border-green-500 bg-green-500'
                                                            : 'border-gray-300 hover:border-pink-500'
                                                    }`}
                                                    data-oid="2fk5eg3"
                                                >
                                                    {task.completed && (
                                                        <svg
                                                            className="w-4 h-4 text-white"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            data-oid="x0zwle5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M5 13l4 4L19 7"
                                                                data-oid="ad65xf_"
                                                            />
                                                        </svg>
                                                    )}
                                                </button>
                                                <div className="flex-1" data-oid="wmnf.io">
                                                    <div
                                                        className="flex items-center space-x-2 mb-2"
                                                        data-oid="56bo2.."
                                                    >
                                                        <h4
                                                            className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                                                            data-oid="ejcpsd_"
                                                        >
                                                            {task.title}
                                                        </h4>
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}
                                                            data-oid="576qky7"
                                                        >
                                                            {task.category}
                                                        </span>
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(task.difficulty)}`}
                                                            data-oid="1fmufr-"
                                                        >
                                                            {task.difficulty}
                                                        </span>
                                                    </div>
                                                    <p
                                                        className={`text-sm mb-2 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}
                                                        data-oid="92y_6cs"
                                                    >
                                                        {task.description}
                                                    </p>
                                                    <div
                                                        className="flex items-center justify-between"
                                                        data-oid="c2rc.zv"
                                                    >
                                                        <span
                                                            className="text-sm font-medium text-pink-600"
                                                            data-oid="_sfuspy"
                                                        >
                                                            +{task.points} 积分
                                                        </span>
                                                        {task.dueDate && !task.completed && (
                                                            <span
                                                                className="text-sm text-gray-500"
                                                                data-oid="w56rehn"
                                                            >
                                                                截止:{' '}
                                                                {task.dueDate.toLocaleDateString()}
                                                            </span>
                                                        )}
                                                        {task.completedAt && (
                                                            <span
                                                                className="text-sm text-green-600"
                                                                data-oid="rll930q"
                                                            >
                                                                完成于:{' '}
                                                                {task.completedAt.toLocaleDateString()}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Badges Tab */}
                    {activeTab === 'badges' && (
                        <div className="space-y-6" data-oid="66vesck">
                            <div
                                className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100"
                                data-oid="3m_fm4h"
                            >
                                <h3
                                    className="text-xl font-semibold text-gray-800 mb-6"
                                    data-oid="rzmiwfp"
                                >
                                    技能徽章
                                </h3>
                                <div
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                    data-oid="129ypwh"
                                >
                                    {badges.map((badge) => (
                                        <div
                                            key={badge.id}
                                            className={`p-6 rounded-2xl border-2 transition-all ${
                                                badge.earned
                                                    ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg'
                                                    : 'border-gray-200 bg-gray-50'
                                            }`}
                                            data-oid="nz7d864"
                                        >
                                            <div className="text-center" data-oid="l_7mps3">
                                                <div
                                                    className={`text-6xl mb-4 ${badge.earned ? '' : 'grayscale opacity-50'}`}
                                                    data-oid="povq7kp"
                                                >
                                                    {badge.icon}
                                                </div>
                                                <h4
                                                    className={`text-lg font-semibold mb-2 ${badge.earned ? 'text-gray-800' : 'text-gray-500'}`}
                                                    data-oid="5ok_ksf"
                                                >
                                                    {badge.name}
                                                </h4>
                                                <p
                                                    className={`text-sm mb-4 ${badge.earned ? 'text-gray-600' : 'text-gray-400'}`}
                                                    data-oid="0r2f:7c"
                                                >
                                                    {badge.description}
                                                </p>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(badge.category)}`}
                                                    data-oid="n1buecd"
                                                >
                                                    {badge.category}
                                                </span>

                                                {!badge.earned && (
                                                    <div className="mt-4" data-oid="-bmg0_0">
                                                        <div
                                                            className="flex justify-between text-sm text-gray-600 mb-1"
                                                            data-oid="u0pr1yb"
                                                        >
                                                            <span data-oid="6uqweyn">进度</span>
                                                            <span data-oid=":4v19pz">
                                                                {badge.progress}/{badge.requirement}
                                                            </span>
                                                        </div>
                                                        <div
                                                            className="w-full bg-gray-200 rounded-full h-2"
                                                            data-oid="lhk2y3f"
                                                        >
                                                            <div
                                                                className="bg-gradient-to-r from-pink-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                                                                style={{
                                                                    width: `${(badge.progress / badge.requirement) * 100}%`,
                                                                }}
                                                                data-oid="37lwuw1"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                )}

                                                {badge.earned && badge.earnedAt && (
                                                    <div
                                                        className="mt-4 text-xs text-green-600 font-medium"
                                                        data-oid="jsj3e58"
                                                    >
                                                        获得于:{' '}
                                                        {badge.earnedAt.toLocaleDateString()}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Analytics Tab */}
                    {activeTab === 'analytics' && (
                        <div className="space-y-6" data-oid="zg99zdd">
                            <div
                                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                                data-oid="74l9irb"
                            >
                                {/* Learning Streak */}
                                <div
                                    className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100"
                                    data-oid="p:ri2o5"
                                >
                                    <h3
                                        className="text-xl font-semibold text-gray-800 mb-4"
                                        data-oid="e-ugiig"
                                    >
                                        学习连续性
                                    </h3>
                                    <div className="space-y-4" data-oid="yxyc_3d">
                                        <div
                                            className="flex justify-between items-center"
                                            data-oid="0fxt5t_"
                                        >
                                            <span className="text-gray-600" data-oid="zk-g58c">
                                                当前连续天数
                                            </span>
                                            <span
                                                className="text-2xl font-bold text-pink-600"
                                                data-oid="oi8376q"
                                            >
                                                {stats.currentStreak} 天
                                            </span>
                                        </div>
                                        <div
                                            className="flex justify-between items-center"
                                            data-oid="kuxz5sf"
                                        >
                                            <span className="text-gray-600" data-oid="1z2mdft">
                                                最长连续记录
                                            </span>
                                            <span
                                                className="text-2xl font-bold text-orange-600"
                                                data-oid="rljznru"
                                            >
                                                {stats.longestStreak} 天
                                            </span>
                                        </div>
                                        <div className="mt-6" data-oid="0bypaoi">
                                            <p
                                                className="text-sm text-gray-600 mb-2"
                                                data-oid=".-g85z0"
                                            >
                                                本周学习日历
                                            </p>
                                            <div
                                                className="grid grid-cols-7 gap-2"
                                                data-oid="32ruk.."
                                            >
                                                {['一', '二', '三', '四', '五', '六', '日'].map(
                                                    (day, index) => (
                                                        <div
                                                            key={day}
                                                            className="text-center"
                                                            data-oid="km8cl2c"
                                                        >
                                                            <div
                                                                className="text-xs text-gray-500 mb-1"
                                                                data-oid="f8toj0c"
                                                            >
                                                                {day}
                                                            </div>
                                                            <div
                                                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                                                                    index < 3
                                                                        ? 'bg-green-500 text-white'
                                                                        : index === 3
                                                                          ? 'bg-yellow-500 text-white'
                                                                          : 'bg-gray-200 text-gray-500'
                                                                }`}
                                                                data-oid="0sms84."
                                                            >
                                                                {index < 3
                                                                    ? '✓'
                                                                    : index === 3
                                                                      ? '○'
                                                                      : ''}
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Category Progress */}
                                <div
                                    className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100"
                                    data-oid="kiohlbq"
                                >
                                    <h3
                                        className="text-xl font-semibold text-gray-800 mb-4"
                                        data-oid="9tewcc7"
                                    >
                                        分类进度
                                    </h3>
                                    <div className="space-y-4" data-oid="dzezswx">
                                        {[
                                            { name: '前端开发', progress: 75, color: 'blue' },
                                            { name: '编程语言', progress: 45, color: 'purple' },
                                            { name: '数据结构', progress: 30, color: 'green' },
                                            { name: '算法', progress: 20, color: 'red' },
                                        ].map((category) => (
                                            <div key={category.name} data-oid="179pkrz">
                                                <div
                                                    className="flex justify-between text-sm text-gray-600 mb-1"
                                                    data-oid="up-ezjv"
                                                >
                                                    <span data-oid="sres9_b">{category.name}</span>
                                                    <span data-oid="l:m9iwy">
                                                        {category.progress}%
                                                    </span>
                                                </div>
                                                <div
                                                    className="w-full bg-gray-200 rounded-full h-2"
                                                    data-oid="-z5vg12"
                                                >
                                                    <div
                                                        className={`bg-${category.color}-500 h-2 rounded-full transition-all duration-500`}
                                                        style={{ width: `${category.progress}%` }}
                                                        data-oid="ltftdck"
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Monthly Overview */}
                            <div
                                className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100"
                                data-oid="_:50p36"
                            >
                                <h3
                                    className="text-xl font-semibold text-gray-800 mb-4"
                                    data-oid="f.dr1pr"
                                >
                                    月度总览
                                </h3>
                                <div
                                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                                    data-oid="9.-wx2c"
                                >
                                    <div
                                        className="text-center p-4 bg-pink-50 rounded-lg"
                                        data-oid="dg-mf:i"
                                    >
                                        <div
                                            className="text-2xl font-bold text-pink-600"
                                            data-oid="nequ6-7"
                                        >
                                            12
                                        </div>
                                        <div className="text-sm text-gray-600" data-oid="stx6bpr">
                                            完成任务
                                        </div>
                                    </div>
                                    <div
                                        className="text-center p-4 bg-orange-50 rounded-lg"
                                        data-oid="j3s2mi1"
                                    >
                                        <div
                                            className="text-2xl font-bold text-orange-600"
                                            data-oid="p0b7if7"
                                        >
                                            850
                                        </div>
                                        <div className="text-sm text-gray-600" data-oid="2h08-:u">
                                            获得积分
                                        </div>
                                    </div>
                                    <div
                                        className="text-center p-4 bg-green-50 rounded-lg"
                                        data-oid="w:lm..h"
                                    >
                                        <div
                                            className="text-2xl font-bold text-green-600"
                                            data-oid="sexk1xc"
                                        >
                                            18
                                        </div>
                                        <div className="text-sm text-gray-600" data-oid="74nnkb3">
                                            学习天数
                                        </div>
                                    </div>
                                    <div
                                        className="text-center p-4 bg-purple-50 rounded-lg"
                                        data-oid="oyt0w2n"
                                    >
                                        <div
                                            className="text-2xl font-bold text-purple-600"
                                            data-oid="i-vlyn2"
                                        >
                                            3
                                        </div>
                                        <div className="text-sm text-gray-600" data-oid="8rejo02">
                                            新徽章
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
