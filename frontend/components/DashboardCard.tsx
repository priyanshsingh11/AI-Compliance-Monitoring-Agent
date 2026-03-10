import React from 'react';

export interface DashboardCardProps {
    title?: string;
    value?: string | number | React.ReactNode;
    subtitle?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    variant?: 'default' | 'secondary';
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, subtitle, icon, children, className = '', variant = 'default' }) => {
    const isSecondary = variant === 'secondary';

    return (
        <div className={`p-6 rounded-3xl ${isSecondary ? 'bg-[#344e41] text-emerald-50' : 'bg-[#1a1d24] text-white'} border border-white/5 flex flex-col relative overflow-hidden group shadow-lg ${className}`}>
            {icon && (
                <div className="absolute top-0 right-0 p-6 opacity-80 group-hover:scale-110 transition-all duration-300">
                    {icon}
                </div>
            )}

            {(title || value) && (
                <div className="z-10 relative">
                    {title && <h3 className={`text-sm tracking-wide font-medium mb-1 ${isSecondary ? 'text-emerald-100' : 'text-[#8e95a5]'}`}>{title}</h3>}
                    {value !== undefined && <div className={`text-3xl font-bold tracking-tight mb-2 ${isSecondary ? 'text-white' : 'text-white'}`}>{value}</div>}
                    {subtitle && <p className={`text-xs font-semibold ${isSecondary ? 'text-emerald-200' : 'text-[#8e95a5]'}`}>{subtitle}</p>}
                </div>
            )}

            {children && (
                <div className="mt-auto pt-4 z-10 relative w-full h-full flex flex-col justify-end">
                    {children}
                </div>
            )}
        </div>
    );
}
