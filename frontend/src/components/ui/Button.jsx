import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  leftIcon = null,
  rightIcon = null,
  fullWidth = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none select-none rounded-lg';

  const variants = {
    primary: 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white shadow-sm shadow-amber-900/10 border border-transparent',
    secondary: 'bg-amber-100 hover:bg-amber-200 active:bg-amber-300 text-amber-900 border border-amber-200/60',
    outline: 'bg-white hover:bg-amber-50/50 active:bg-amber-100/60 text-stone-800 border border-stone-300 shadow-2xs hover:border-amber-400',
    ghost: 'bg-transparent hover:bg-stone-100 active:bg-stone-200 text-stone-700 border border-transparent',
    destructive: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-sm shadow-red-900/10 border border-transparent',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 min-h-[32px]',
    md: 'px-4 py-2 text-sm gap-2 min-h-[40px]',
    lg: 'px-5 py-2.5 text-base gap-2.5 min-h-[48px]',
  };

  const disabledState = isDisabled || isLoading;

  return (
    <button
      type={type}
      disabled={disabledState}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};

export default Button;
