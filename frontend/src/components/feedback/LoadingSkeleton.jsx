import React from 'react';
import { Loader2 } from 'lucide-react';

export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };
  return (
    <Loader2 className={`animate-spin text-amber-600 ${sizes[size] || sizes.md} ${className}`} />
  );
};

export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-4 animate-pulse shadow-xs">
      <div className="h-44 bg-stone-200 rounded-xl w-full" />
      <div className="space-y-2">
        <div className="h-4 bg-stone-200 rounded w-3/4" />
        <div className="h-3 bg-stone-100 rounded w-full" />
        <div className="h-3 bg-stone-100 rounded w-5/6" />
      </div>
      <div className="pt-3 border-t border-stone-100 flex justify-between items-center">
        <div className="h-6 bg-stone-200 rounded w-20" />
        <div className="h-8 bg-stone-200 rounded-lg w-24" />
      </div>
    </div>
  );
};

export const TextSkeleton = ({ lines = 3 }) => {
  return (
    <div className="space-y-2.5 animate-pulse w-full">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3.5 bg-stone-200 rounded"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  );
};

export const AvatarSkeleton = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };
  return (
    <div className={`rounded-full bg-stone-200 animate-pulse shrink-0 ${sizes[size] || sizes.md}`} />
  );
};

export default CardSkeleton;
