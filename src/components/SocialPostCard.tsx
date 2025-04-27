
import React from 'react';
import { User } from '../contexts/AuthContext';
import { MessageSquare, Heart } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export type PostType = {
  id: string;
  user: User;
  content: string;
  createdAt: Date;
  likes: number;
  comments: number;
  isLiked?: boolean;
};

type SocialPostCardProps = {
  post: PostType;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onUserClick?: (userId: string) => void;
  className?: string;
};

const SocialPostCard: React.FC<SocialPostCardProps> = ({ 
  post, 
  onLike, 
  onComment,
  onUserClick,
  className = '' 
}) => {
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onLike) onLike(post.id);
  };
  
  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onComment) onComment(post.id);
  };
  
  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUserClick) onUserClick(post.user.id);
  };

  return (
    <div className={`valorant-card ${className}`}>
      <div className="p-4">
        {/* Post header - user info and timestamp */}
        <div className="flex items-center">
          <div 
            className="flex-shrink-0 cursor-pointer" 
            onClick={handleUserClick}
          >
            <img 
              src={post.user.avatarUrl || 'https://api.dicebear.com/7.x/identicon/svg?seed=' + post.user.id} 
              alt={post.user.displayName}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div className="ml-3 flex-1">
            <div className="flex items-center justify-between">
              <h3 
                className="font-semibold cursor-pointer hover:text-valorant-red transition-colors"
                onClick={handleUserClick}
              >
                {post.user.displayName}
              </h3>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
              </span>
            </div>
            {post.user.rank && (
              <div className="text-xs text-muted-foreground">
                {post.user.rank} • {post.user.role || 'Player'}
              </div>
            )}
          </div>
        </div>
        
        {/* Post content */}
        <div className="mt-3">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>
        
        {/* Post actions */}
        <div className="mt-4 flex items-center space-x-4 text-sm">
          <button 
            className={`flex items-center space-x-1 ${post.isLiked ? 'text-valorant-red' : 'hover:text-valorant-red'} transition-colors`}
            onClick={handleLike}
          >
            <Heart className="w-4 h-4" />
            <span>{post.likes}</span>
          </button>
          <button 
            className="flex items-center space-x-1 hover:text-valorant-red transition-colors"
            onClick={handleComment}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{post.comments}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialPostCard;
