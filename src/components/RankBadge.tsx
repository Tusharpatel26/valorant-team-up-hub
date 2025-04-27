
import React from 'react';

type RankBadgeProps = {
  rank: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const rankColors = {
  'iron': 'bg-zinc-500',
  'bronze': 'bg-amber-700',
  'silver': 'bg-zinc-300',
  'gold': 'bg-amber-400',
  'platinum': 'bg-cyan-300',
  'diamond': 'bg-blue-400',
  'ascendant': 'bg-emerald-400',
  'immortal': 'bg-purple-500',
  'radiant': 'bg-yellow-300 text-black',
};

const RankBadge: React.FC<RankBadgeProps> = ({ rank, size = 'md', className = '' }) => {
  const rankLower = rank.toLowerCase();
  let rankColor = 'bg-gray-500';  // Default color
  
  // Determine color based on rank
  Object.entries(rankColors).forEach(([key, color]) => {
    if (rankLower.includes(key)) {
      rankColor = color;
    }
  });
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };
  
  return (
    <span className={`inline-flex items-center ${rankColor} text-white rounded-full font-semibold ${sizeClasses[size]} ${className}`}>
      {rank}
    </span>
  );
};

export default RankBadge;
