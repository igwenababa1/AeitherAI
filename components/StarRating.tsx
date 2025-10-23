import React from 'react';
import { StarIcon } from './icons/StarIcon';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5, className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;
        return (
          <StarIcon
            key={starNumber}
            className={`w-5 h-5 ${starNumber <= rating ? 'text-yellow-400' : 'text-slate-500'}`}
          />
        );
      })}
    </div>
  );
};

export default StarRating;