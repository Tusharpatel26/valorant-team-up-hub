
import { User } from '../contexts/AuthContext';
import RankBadge from './RankBadge';
import { Check, Mic, MicOff } from 'lucide-react';

type PlayerCardProps = {
  player: User;
  compact?: boolean;
  className?: string;
  onClick?: () => void;
};

const PlayerCard = ({ player, compact = false, className = '', onClick }: PlayerCardProps) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  if (compact) {
    return (
      <div 
        className={`valorant-card hover:border-valorant-red/30 cursor-pointer transition-all ${className}`}
        onClick={handleClick}
      >
        <div className="flex items-center p-3">
          <div className="flex-shrink-0">
            <img 
              src={player.avatarUrl || 'https://api.dicebear.com/7.x/identicon/svg?seed=' + player.id} 
              alt={player.displayName}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div className="ml-3 flex-1">
            <h3 className="font-semibold text-sm">{player.displayName}</h3>
            <div className="flex items-center space-x-2 mt-1">
              {player.rank && <RankBadge rank={player.rank} size="sm" />}
              {player.role && (
                <span className="bg-valorant-blue px-2 py-0.5 text-xs rounded-md">
                  {player.role}
                </span>
              )}
              {player.hasMic !== undefined && (
                player.hasMic ? 
                <Mic className="w-4 h-4 text-green-400" /> : 
                <MicOff className="w-4 h-4 text-red-400" />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`valorant-card hover:border-valorant-red/30 cursor-pointer transition-all ${className}`}
      onClick={handleClick}
    >
      <div className="relative">
        {/* Cover image - placeholder gradient for now */}
        <div className="h-20 bg-gradient-to-r from-valorant-blue to-valorant-dark"></div>
        
        {/* Avatar */}
        <div className="absolute bottom-0 transform translate-y-1/2 left-4">
          <div className="border-2 border-card rounded-full">
            <img 
              src={player.avatarUrl || 'https://api.dicebear.com/7.x/identicon/svg?seed=' + player.id} 
              alt={player.displayName}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
      
      <div className="p-4 pt-12">
        <h3 className="font-bold text-lg">{player.displayName}</h3>
        
        <div className="flex items-center mt-2 flex-wrap gap-2">
          {player.rank && <RankBadge rank={player.rank} />}
          
          {player.role && (
            <span className="bg-valorant-blue px-3 py-1 text-sm rounded-md">
              {player.role}
            </span>
          )}
          
          {player.hasMic !== undefined && (
            <span className="flex items-center gap-1 px-3 py-1 bg-valorant-blue/50 rounded-md text-sm">
              {player.hasMic ? (
                <>
                  <Mic className="w-4 h-4 text-green-400" />
                  <span>Has Mic</span>
                </>
              ) : (
                <>
                  <MicOff className="w-4 h-4 text-red-400" />
                  <span>No Mic</span>
                </>
              )}
            </span>
          )}
          
          {/* Stats preview */}
          <div className="w-full mt-2 flex justify-between text-sm text-muted-foreground">
            <span>20 matches</span>
            <span className="flex items-center">
              <Check className="w-4 h-4 text-green-400 mr-1" />
              12 upvotes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
