import React from 'react';
import { Star } from 'lucide-react';

const Rating = ({
  rating = 5.0,
  maxStars = 5,
  reviewCount = null,
  showScore = true,
  size = 'md',
  onRate = null,
  className = '',
}) => {
  const stars = Array.from({ length: maxStars }, (_, i) => i + 1);

  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of ${maxStars} stars`}>
        {stars.map((starIndex) => {
          const isFilled = rating >= starIndex;
          const isHalf = rating >= starIndex - 0.5 && rating < starIndex;

          return (
            <button
              key={starIndex}
              type="button"
              disabled={!onRate}
              onClick={() => onRate && onRate(starIndex)}
              className={`p-0 bg-transparent border-none ${onRate ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
            >
              <Star
                className={`
                  ${starSizes[size] || starSizes.md}
                  ${isFilled
                    ? 'fill-amber-400 text-amber-400'
                    : isHalf
                    ? 'fill-amber-200 text-amber-400'
                    : 'fill-stone-100 text-stone-300'
                  }
                `}
              />
            </button>
          );
        })}
      </div>

      {showScore && (
        <span className={`font-semibold text-stone-800 ${textSizes[size]}`}>
          {Number(rating).toFixed(1)}
        </span>
      )}

      {reviewCount !== null && (
        <span className={`text-stone-500 font-normal ${textSizes[size]}`}>
          ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
};

export default Rating;
