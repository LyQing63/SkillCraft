interface ProgressBarProps {
    progress: number;
    total: number;
    label?: string;
    color?: 'pink' | 'orange' | 'green' | 'blue' | 'purple';
    size?: 'small' | 'medium' | 'large';
    showPercentage?: boolean;
    animated?: boolean;
}

export function ProgressBar({
    progress,
    total,
    label,
    color = 'pink',
    size = 'medium',
    showPercentage = true,
    animated = true,
}: ProgressBarProps) {
    const percentage = Math.min((progress / total) * 100, 100);

    const colorClasses = {
        pink: 'from-pink-500 to-pink-600',
        orange: 'from-orange-500 to-orange-600',
        green: 'from-green-500 to-green-600',
        blue: 'from-blue-500 to-blue-600',
        purple: 'from-purple-500 to-purple-600',
    };

    const sizeClasses = {
        small: 'h-2',
        medium: 'h-3',
        large: 'h-4',
    };

    return (
        <div className="w-full" data-oid=":ng9f8i">
            {(label || showPercentage) && (
                <div className="flex justify-between items-center mb-2" data-oid="3ybwicw">
                    {label && (
                        <span className="text-sm text-gray-600" data-oid=":h-ua66">
                            {label}
                        </span>
                    )}
                    {showPercentage && (
                        <span className="text-sm font-medium text-gray-800" data-oid="3o19bek">
                            {progress}/{total} ({Math.round(percentage)}%)
                        </span>
                    )}
                </div>
            )}
            <div
                className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}
                data-oid="eg8ided"
            >
                <div
                    className={`bg-gradient-to-r ${colorClasses[color]} ${sizeClasses[size]} rounded-full ${
                        animated ? 'transition-all duration-700 ease-out' : ''
                    }`}
                    style={{ width: `${percentage}%` }}
                    data-oid="d-rf8t_"
                ></div>
            </div>
        </div>
    );
}
