interface TaskCardProps {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    points: number;
    completed: boolean;
    completedAt?: Date;
    dueDate?: Date;
    onToggle: (id: string) => void;
}

export function TaskCard({
    id,
    title,
    description,
    category,
    difficulty,
    points,
    completed,
    completedAt,
    dueDate,
    onToggle,
}: TaskCardProps) {
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
            数据结构: 'bg-green-100 text-green-800',
            算法: 'bg-red-100 text-red-800',
            设计: 'bg-pink-100 text-pink-800',
        };
        return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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

    return (
        <div
            className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                completed
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 hover:border-pink-300 bg-white'
            }`}
            data-oid=":pw6-6i"
        >
            <div className="flex items-start space-x-4" data-oid=":xc2xh1">
                <button
                    onClick={() => onToggle(id)}
                    className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        completed
                            ? 'border-green-500 bg-green-500 hover:bg-green-600'
                            : 'border-gray-300 hover:border-pink-500 hover:bg-pink-50'
                    }`}
                    data-oid="eb3yk:2"
                >
                    {completed && (
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            data-oid="bwc95es"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                                data-oid="n-_46sy"
                            />
                        </svg>
                    )}
                </button>

                <div className="flex-1" data-oid="b60__m1">
                    <div className="flex items-center flex-wrap gap-2 mb-2" data-oid="g.yrn1j">
                        <h4
                            className={`font-medium ${completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                            data-oid="eg-1fa7"
                        >
                            {title}
                        </h4>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}
                            data-oid="t98nl-0"
                        >
                            {category}
                        </span>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}
                            data-oid="mbkqk:h"
                        >
                            {getDifficultyText(difficulty)}
                        </span>
                    </div>

                    <p
                        className={`text-sm mb-3 ${completed ? 'text-gray-400' : 'text-gray-600'}`}
                        data-oid="vh95dns"
                    >
                        {description}
                    </p>

                    <div className="flex items-center justify-between" data-oid="6dqw25p">
                        <div className="flex items-center space-x-4" data-oid="90z:iy0">
                            <span
                                className="text-sm font-medium text-pink-600 flex items-center"
                                data-oid="wzpe56e"
                            >
                                <svg
                                    className="w-4 h-4 mr-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    data-oid="w_40ngf"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                        data-oid="x9wrddi"
                                    />
                                </svg>
                                +{points} 积分
                            </span>
                        </div>

                        <div className="text-sm text-gray-500" data-oid="sobxpmd">
                            {completed && completedAt && (
                                <span className="text-green-600 font-medium" data-oid="9pt8yhf">
                                    ✓ {completedAt.toLocaleDateString()}
                                </span>
                            )}
                            {!completed && dueDate && (
                                <span
                                    className={`${
                                        new Date(dueDate) < new Date()
                                            ? 'text-red-600'
                                            : 'text-gray-500'
                                    }`}
                                    data-oid="zki3ow7"
                                >
                                    📅 {dueDate.toLocaleDateString()}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
