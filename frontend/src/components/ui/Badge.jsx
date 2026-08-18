import React from 'react';
import { CheckCircle2, Flame, Sparkles, Clock, AlertCircle } from 'lucide-react';

const Badge = ({
  children,
  variant = 'verified',
  size = 'md',
  icon = null,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide select-none';

  const variants = {
    verified: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80',
    available: 'bg-teal-50 text-teal-800 border border-teal-200/80',
    pending: 'bg-amber-50 text-amber-800 border border-amber-200/80',
    popular: 'bg-saffron-50 text-saffron-800 border border-saffron-200/80',
    new: 'bg-purple-50 text-purple-800 border border-purple-200/80',
    recommended: 'bg-gold-100 text-amber-900 border border-gold-400/60',
    saffron: 'bg-amber-600 text-white border border-transparent shadow-2xs',
    gray: 'bg-stone-100 text-stone-700 border border-stone-200',
  };

  const defaultIcons = {
    verified: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />,
    popular: <Flame className="w-3.5 h-3.5 text-saffron-600 shrink-0" />,
    recommended: <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />,
    pending: <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />,
    new: <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />,
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
  };

  const activeIcon = icon !== null ? icon : defaultIcons[variant];

  return (
    <span
      className={`
        ${baseStyles}
        ${variants[variant] || variants.verified}
        ${sizes[size] || sizes.md}
        ${className}
      `}
    >
      {activeIcon}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
