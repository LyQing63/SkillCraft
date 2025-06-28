'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-pink-100 to-orange-100"
            data-oid="5.pmo:6"
        >
            {/* Header */}
            <header
                className="bg-white/80 backdrop-blur-sm border-b border-pink-200"
                data-oid="pi31.hs"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-oid="j5m29xz">
                    <div className="flex justify-between items-center py-4" data-oid="-fwzls-">
                        <div className="flex items-center" data-oid="p30kzlg">
                            <div
                                className="w-8 h-8 bg-gradient-to-r from-pink-300 to-orange-300 rounded-lg mr-3"
                                data-oid="xv1tqv:"
                            ></div>
                            <h1 className="text-xl font-semibold text-gray-800" data-oid="nupzoq4">
                                AI学习助手
                            </h1>
                        </div>
                        <nav className="hidden md:flex space-x-8" data-oid="awcek28">
                            <a
                                href="#features"
                                className="text-gray-600 hover:text-pink-600 transition-colors"
                                data-oid="yo8i592"
                            >
                                功能特色
                            </a>
                            <button
                                onClick={() => router.push('/progress')}
                                className="text-gray-600 hover:text-pink-600 transition-colors"
                                data-oid="fj5y.gu"
                            >
                                学习进度
                            </button>
                            <button
                                onClick={() => router.push('/settings')}
                                className="text-gray-600 hover:text-pink-600 transition-colors"
                                data-oid="ng3kr7z"
                            >
                                用户设置
                            </button>
                            <a
                                href="#about"
                                className="text-gray-600 hover:text-pink-600 transition-colors"
                                data-oid="pktnp60"
                            >
                                关于我们
                            </a>
                            <a
                                href="#contact"
                                className="text-gray-600 hover:text-pink-600 transition-colors"
                                data-oid="v0a44.f"
                            >
                                联系我们
                            </a>
                        </nav>
                        <div className="flex items-center space-x-4" data-oid="laks9cr">
                            <button
                                className="text-gray-600 hover:text-pink-600 transition-colors"
                                onClick={() => router.push('/login')}
                                data-oid="gi94oqy"
                            >
                                登录
                            </button>
                            <button
                                className="bg-gradient-to-r from-pink-400 to-orange-400 text-white px-4 py-2 rounded-lg hover:from-pink-500 hover:to-orange-500 transition-all"
                                onClick={() => router.push('/register')}
                                data-oid="7dy0dsh"
                            >
                                注册
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8" data-oid="b3wj-k4">
                <div className="max-w-7xl mx-auto text-center" data-oid="bmhi61o">
                    <h2
                        className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
                        data-oid="d3rqw0f"
                    >
                        个性化{' '}
                        <span
                            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500"
                            data-oid="tr58ra2"
                        >
                            AI 学习
                        </span>{' '}
                        体验
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto" data-oid="ylg91r8">
                        根据您的现有能力和学习偏好，智能生成个性化学习计划，让技能提升更高效、更有趣
                    </p>
                    <div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        data-oid="jobuaq1"
                    >
                        <button
                            className="bg-white text-gray-700 px-8 py-4 rounded-xl text-lg font-medium border border-pink-200 hover:bg-pink-50 transition-all"
                            data-oid="civu8yo"
                        >
                            了解更多
                        </button>
                        <button
                            className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-4 rounded-xl text-lg font-medium hover:from-pink-600 hover:to-orange-600 transition-all shadow-lg"
                            onClick={() => router.push('/learning')}
                            data-oid="0es4:21"
                        >
                            开始学习之旅
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section
                id="features"
                className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50"
                data-oid="axz2j4m"
            >
                <div className="max-w-7xl mx-auto" data-oid="pjw:18o">
                    <h3
                        className="text-3xl font-bold text-center text-gray-800 mb-16"
                        data-oid="_0th9tb"
                    >
                        核心功能
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" data-oid="7:4fe.8">
                        {/* User System */}
                        <div
                            className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-shadow"
                            data-oid="7ae5a.i"
                        >
                            <div
                                className="w-12 h-12 bg-gradient-to-r from-pink-300 to-pink-400 rounded-xl flex items-center justify-center mb-4"
                                data-oid="c.h3ljv"
                            >
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="bvr:iq3"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        data-oid="j_qgiif"
                                    />
                                </svg>
                            </div>
                            <h4
                                className="text-xl font-semibold text-gray-800 mb-2"
                                data-oid="zgg1-k-"
                            >
                                用户系统
                            </h4>
                            <p className="text-gray-600" data-oid="9.ogz18">
                                安全便捷的注册登录系统，保护您的学习数据和隐私
                            </p>
                        </div>

                        {/* Personal Settings */}
                        <div
                            className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow"
                            data-oid="hf4:h6v"
                        >
                            <div
                                className="w-12 h-12 bg-gradient-to-r from-orange-300 to-orange-400 rounded-xl flex items-center justify-center mb-4"
                                data-oid="d:jh1ga"
                            >
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="u7b9bz8"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        data-oid="k.8ym_j"
                                    />

                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        data-oid="dae4za5"
                                    />
                                </svg>
                            </div>
                            <h4
                                className="text-xl font-semibold text-gray-800 mb-2"
                                data-oid="80r3ce:"
                            >
                                个人设置
                            </h4>
                            <p className="text-gray-600" data-oid="ylx4qhy">
                                配置AI提供商、个人信息和学习偏好标签
                            </p>
                        </div>

                        {/* AI Learning Plans */}
                        <div
                            className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-shadow"
                            data-oid="b3r:scj"
                        >
                            <div
                                className="w-12 h-12 bg-gradient-to-r from-pink-400 to-orange-400 rounded-xl flex items-center justify-center mb-4"
                                data-oid="anke379"
                            >
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="tub7.0f"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                        data-oid="f34vnjh"
                                    />
                                </svg>
                            </div>
                            <h4
                                className="text-xl font-semibold text-gray-800 mb-2"
                                data-oid="kc6xumq"
                            >
                                AI学习计划
                            </h4>
                            <p className="text-gray-600" data-oid="n6q:abd">
                                基于AI智能生成个性化学习路径和计划
                            </p>
                        </div>

                        {/* Task Management */}
                        <div
                            className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow"
                            data-oid="7mtg3mm"
                        >
                            <div
                                className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-400 rounded-xl flex items-center justify-center mb-4"
                                data-oid="47dxq0."
                            >
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="-quv0jh"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        data-oid="vff:wu8"
                                    />
                                </svg>
                            </div>
                            <h4
                                className="text-xl font-semibold text-gray-800 mb-2"
                                data-oid="3n3mmxt"
                            >
                                任务管理
                            </h4>
                            <p className="text-gray-600" data-oid=":444wg0">
                                智能任务分配与日历管理，让学习更有条理
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8" data-oid="l7n5q6:">
                <div className="max-w-4xl mx-auto text-center" data-oid="91g1s7u">
                    <h3 className="text-3xl font-bold text-gray-800 mb-6" data-oid="67htq_4">
                        准备开始您的AI学习之旅吗？
                    </h3>
                    <p className="text-xl text-gray-600 mb-8" data-oid="_fr.n8w">
                        加入我们，体验个性化AI学习的魅力，让每一分钟的学习都更有价值
                    </p>
                    <div
                        className="bg-white rounded-2xl p-8 shadow-xl border border-pink-200"
                        data-oid="ylgci:c"
                    >
                        <div
                            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                            data-oid="2uwz8a0"
                        >
                            <input
                                type="email"
                                placeholder="输入您的邮箱地址"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                data-oid="cit0cfa"
                            />

                            <button
                                className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-orange-600 transition-all"
                                data-oid="zx8pin_"
                            >
                                立即开始
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                className="bg-white border-t border-pink-200 py-12 px-4 sm:px-6 lg:px-8"
                data-oid="egsfh6f"
            >
                <div className="max-w-7xl mx-auto" data-oid="ksi7z3.">
                    <div
                        className="flex flex-col md:flex-row justify-between items-center"
                        data-oid="x9ek4cp"
                    >
                        <div className="flex items-center mb-4 md:mb-0" data-oid="pzock9p">
                            <div
                                className="w-8 h-8 bg-gradient-to-r from-pink-300 to-orange-300 rounded-lg mr-3"
                                data-oid=":bsugxj"
                            ></div>
                            <span
                                className="text-xl font-semibold text-gray-800"
                                data-oid="m.6th.l"
                            >
                                AI学习助手
                            </span>
                        </div>
                        <div className="flex space-x-6 text-gray-600" data-oid="51i-sys">
                            <a
                                href="#"
                                className="hover:text-pink-600 transition-colors"
                                data-oid="pkfnhui"
                            >
                                隐私政策
                            </a>
                            <a
                                href="#"
                                className="hover:text-pink-600 transition-colors"
                                data-oid=":eipywi"
                            >
                                服务条款
                            </a>
                            <a
                                href="#"
                                className="hover:text-pink-600 transition-colors"
                                data-oid="l-ec8w1"
                            >
                                联系我们
                            </a>
                        </div>
                    </div>
                    <div
                        className="mt-8 pt-8 border-t border-pink-100 text-center text-gray-500"
                        data-oid="gr7g3om"
                    >
                        <p data-oid="76a-1jm">&copy; 2024 AI学习助手. 保留所有权利.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
