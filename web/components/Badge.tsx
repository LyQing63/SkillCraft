interface BadgeProps {
    name: string;
    description: string;
    icon: string;
    category: string;
    earned: boolean;
    earnedAt?: Date;
    progress?: number;
    requirement?: number;
    size?: 'small' | 'medium' | 'large';
}

export function Badge({
    name,
    description,
    icon,
    category,
    earned,
    earnedAt,
    progress = 0,
    requirement = 1,
    size = 'medium',
}: BadgeProps) {
    const getCategoryColor = (category: string) => {
        const colors = {
            成就: 'bg-yellow-100 text-yellow-800',
            技能: 'bg-green-100 text-green-800',
            习惯: 'bg-pink-100 text-pink-800',
            里程碑: 'bg-purple-100 text-purple-800',
        };
        return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const sizeClasses = {
        small: {
            container: 'p-3',
            icon: 'text-3xl',
            title: 'text-sm',
            description: 'text-xs',
        },
        medium: {
            container: 'p-4',
            icon: 'text-4xl',
            title: 'text-base',
            description: 'text-sm',
        },
        large: {
            container: 'p-6',
            icon: 'text-6xl',
            title: 'text-lg',
            description: 'text-sm',
        },
    };

    const classes = sizeClasses[size];

    return (
        <div
            className={`rounded-2xl border-2 transition-all ${classes.container} ${
                earned
                    ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg'
                    : 'border-gray-200 bg-gray-50'
            }`}
            data-oid="bf1vow0"
        >
            <div className="text-center" data-oid="8mzxu8-">
                <div
                    className={`${classes.icon} mb-2 ${earned ? '' : 'grayscale opacity-50'}`}
                    data-oid="zoj4f7b"
                >
                    {icon}
                </div>
                <h4
                    className={`font-semibold mb-1 ${classes.title} ${earned ? 'text-gray-800' : 'text-gray-500'}`}
                    data-oid="qyptc40"
                >
                    {name}
                </h4>
                <p
                    className={`mb-2 ${classes.description} ${earned ? 'text-gray-600' : 'text-gray-400'}`}
                    data-oid="-cqx9_u"
                >
                    {description}
                </p>
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}
                    data-oid="-c2saed"
                >
                    {category}
                </span>

                {!earned && requirement > 1 && (
                    <div className="mt-3" data-oid="f6:2x_h">
                        <div
                            className="flex justify-between text-xs text-gray-600 mb-1"
                            data-oid="bxme.nk"
                        >
                            <span data-oid="jmqla0b">进度</span>
                            <span data-oid="s8kvy8r">
                                {progress}/{requirement}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5" data-oid="yxt2f38">
                            <div
                                className="bg-gradient-to-r from-pink-500 to-orange-500 h-1.5 rounded-full transition-all duration-500"
                                style={{
                                    width: `${Math.min((progress / requirement) * 100, 100)}%`,
                                }}
                                data-oid="jtt2-13"
                            ></div>
                        </div>
                    </div>
                )}

                {earned && earnedAt && (
                    <div className="mt-2 text-xs text-green-600 font-medium" data-oid="faq3znh">
                        {earnedAt.toLocaleDateString()}
                    </div>
                )}
            </div>
        </div>
    );
}
