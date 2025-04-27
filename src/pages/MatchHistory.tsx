
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useToast } from '../hooks/use-toast';
import { User } from '../contexts/AuthContext';
import PlayerCard from '../components/PlayerCard';

// Define the match type
type Match = {
  id: string;
  date: Date;
  map: string;
  mode: string;
  result: 'Win' | 'Loss' | 'Draw';
  score: string;
  performance: {
    kills: number;
    deaths: number;
    assists: number;
    acs: number;
  };
  agent: string;
  teammates: User[];
};

// Mock match data
const mockMatches: Match[] = [
  {
    id: 'match1',
    date: new Date('2023-04-26T20:30:00'),
    map: 'Ascent',
    mode: 'Competitive',
    result: 'Win',
    score: '13-7',
    performance: {
      kills: 22,
      deaths: 14,
      assists: 8,
      acs: 276,
    },
    agent: 'Jett',
    teammates: [
      {
        id: 'teammate1',
        email: 'teammate1@example.com',
        displayName: 'FlickMaster',
        rank: 'Diamond 1',
        role: 'Duelist',
        hasMic: true,
        avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=teammate1',
      },
      {
        id: 'teammate2',
        email: 'teammate2@example.com',
        displayName: 'SmokeGod',
        rank: 'Platinum 3',
        role: 'Controller',
        hasMic: true,
        avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=teammate2',
      },
      {
        id: 'teammate3',
        email: 'teammate3@example.com',
        displayName: 'HeadshotKing',
        rank: 'Diamond 2',
        role: 'Sentinel',
        hasMic: false,
        avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=teammate3',
      },
      {
        id: 'teammate4',
        email: 'teammate4@example.com',
        displayName: 'FlashMaster',
        rank: 'Platinum 2',
        role: 'Initiator',
        hasMic: true,
        avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=teammate4',
      },
    ],
  },
  {
    id: 'match2',
    date: new Date('2023-04-25T18:15:00'),
    map: 'Bind',
    mode: 'Competitive',
    result: 'Loss',
    score: '10-13',
    performance: {
      kills: 18,
      deaths: 16,
      assists: 6,
      acs: 224,
    },
    agent: 'Reyna',
    teammates: [
      {
        id: 'teammate5',
        email: 'teammate5@example.com',
        displayName: 'WallBanger',
        rank: 'Platinum 3',
        role: 'Initiator',
        hasMic: true,
        avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=teammate5',
      },
      {
        id: 'teammate6',
        email: 'teammate6@example.com',
        displayName: 'TurretMan',
        rank: 'Diamond 1',
        role: 'Sentinel',
        hasMic: true,
        avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=teammate6',
      },
      {
        id: 'teammate7',
        email: 'teammate7@example.com',
        displayName: 'FlankWatcher',
        rank: 'Diamond 2',
        role: 'Controller',
        hasMic: false,
        avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=teammate7',
      },
      {
        id: 'teammate8',
        email: 'teammate8@example.com',
        displayName: 'UltMaster',
        rank: 'Platinum 1',
        role: 'Duelist',
        hasMic: true,
        avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=teammate8',
      },
    ],
  },
  {
    id: 'match3',
    date: new Date('2023-04-24T21:45:00'),
    map: 'Haven',
    mode: 'Competitive',
    result: 'Win',
    score: '13-11',
    performance: {
      kills: 24,
      deaths: 13,
      assists: 10,
      acs: 302,
    },
    agent: 'Chamber',
    teammates: [
      {
        id: 'teammate9',
        email: 'teammate9@example.com',
        displayName: 'SmokeScreen',
        rank: 'Diamond 3',
        role: 'Controller',
        hasMic: true,
        avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=teammate9',
      },
      {
        id: 'teammate10',
        email: 'teammate10@example.com',
        displayName: 'ReconBolt',
        rank: 'Diamond 2',
        role: 'Initiator',
        hasMic: true,
        avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=teammate10',
      },
      {
        id: 'teammate11',
        email: 'teammate11@example.com',
        displayName: 'HealingSkye',
        rank: 'Diamond 1',
        role: 'Initiator',
        hasMic: true,
        avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=teammate11',
      },
      {
        id: 'teammate12',
        email: 'teammate12@example.com',
        displayName: 'EntryFragger',
        rank: 'Diamond 2',
        role: 'Duelist',
        hasMic: true,
        avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=teammate12',
      },
    ],
  },
];

const MatchHistory = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // In a real app, you'd fetch from your API
        setMatches(mockMatches);
      } catch (error) {
        console.error('Error fetching matches:', error);
        toast({
          title: "Error",
          description: "Failed to load match history. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchMatches();
  }, [toast]);
  
  const toggleMatchExpansion = (matchId: string) => {
    if (expandedMatch === matchId) {
      setExpandedMatch(null);
    } else {
      setExpandedMatch(matchId);
    }
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Layout>
      <div className="pb-12">
        <h1 className="text-3xl font-bold mb-6">Match History</h1>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-valorant-red"></div>
          </div>
        ) : matches.length > 0 ? (
          <div className="space-y-6">
            {matches.map((match) => (
              <div key={match.id} className="valorant-card overflow-hidden">
                {/* Match summary */}
                <div 
                  className={`p-6 cursor-pointer transition-colors ${
                    expandedMatch === match.id ? 'bg-valorant-blue/20' : 'hover:bg-valorant-blue/10'
                  }`}
                  onClick={() => toggleMatchExpansion(match.id)}
                >
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`
                        w-2 h-16 rounded-full
                        ${match.result === 'Win' ? 'bg-green-500' : match.result === 'Loss' ? 'bg-red-500' : 'bg-yellow-500'}
                      `}></div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground">{formatDate(match.date)}</div>
                        <div className="font-bold">{match.map}</div>
                        <div className="text-sm">{match.mode}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className={`font-bold text-lg ${
                          match.result === 'Win' ? 'text-green-400' : match.result === 'Loss' ? 'text-red-400' : 'text-yellow-400'
                        }`}>
                          {match.result}
                        </div>
                        <div className="text-sm">{match.score}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="font-semibold">{match.agent}</div>
                        <div className="text-sm">
                          {match.performance.kills}/{match.performance.deaths}/{match.performance.assists}
                        </div>
                      </div>
                      
                      <div className="text-center bg-valorant-blue/30 px-3 py-1 rounded-md hidden md:block">
                        <div className="text-xs text-muted-foreground">ACS</div>
                        <div className="font-bold">{match.performance.acs}</div>
                      </div>
                      
                      <div className={`transform transition-transform ${expandedMatch === match.id ? 'rotate-180' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m6 9 6 6 6-6"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Expanded details */}
                {expandedMatch === match.id && (
                  <div className="p-6 border-t border-valorant-blue/20 bg-valorant-blue/5">
                    <h3 className="text-lg font-semibold mb-4">Teammates</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {match.teammates.map((teammate) => (
                        <PlayerCard 
                          key={teammate.id} 
                          player={teammate}
                          compact={true}
                        />
                      ))}
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      <button className="valorant-button-outline">
                        View Full Match Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="text-center pt-4">
              <button className="valorant-button-outline">
                Load More Matches
              </button>
            </div>
          </div>
        ) : (
          <div className="valorant-card p-6 text-center">
            <h3 className="text-lg font-medium">No matches found</h3>
            <p className="text-muted-foreground mt-2">
              Your match history will appear here once you start playing with teammates from fiveQ.gg
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MatchHistory;
