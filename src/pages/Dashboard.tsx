
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import PlayerCard from '../components/PlayerCard';
import { User } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { Mic, MicOff } from 'lucide-react';

// Mock data for players - would come from API in a real app
const mockPlayers: User[] = [
  {
    id: 'player1',
    email: 'player1@example.com',
    displayName: 'ShadowSniper',
    rank: 'Diamond 2',
    role: 'Duelist',
    hasMic: true,
    avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=player1',
  },
  {
    id: 'player2',
    email: 'player2@example.com',
    displayName: 'ValorantQueen',
    rank: 'Platinum 3',
    role: 'Controller',
    hasMic: true,
    avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=player2',
  },
  {
    id: 'player3',
    email: 'player3@example.com',
    displayName: 'HeadshotKing',
    rank: 'Gold 1',
    role: 'Sentinel',
    hasMic: false,
    avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=player3',
  },
  {
    id: 'player4',
    email: 'player4@example.com',
    displayName: 'FlickMaster',
    rank: 'Diamond 1',
    role: 'Initiator',
    hasMic: true,
    avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=player4',
  },
  {
    id: 'player5',
    email: 'player5@example.com',
    displayName: 'TacticalGenius',
    rank: 'Immortal 1',
    role: 'Controller',
    hasMic: true,
    avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=player5',
  },
  {
    id: 'player6',
    email: 'player6@example.com',
    displayName: 'AimAssist',
    rank: 'Silver 3',
    role: 'Duelist',
    hasMic: false,
    avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=player6',
  },
  {
    id: 'player7',
    email: 'player7@example.com',
    displayName: 'RankGrinder',
    rank: 'Gold 3',
    role: 'Sentinel',
    hasMic: true,
    avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=player7',
  },
  {
    id: 'player8',
    email: 'player8@example.com',
    displayName: 'Valorant_Pro',
    rank: 'Platinum 1',
    role: 'Initiator',
    hasMic: true,
    avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=player8',
  },
];

// Available ranks
const ranks = [
  'Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'
];

// Available roles
const roles = ['Duelist', 'Controller', 'Sentinel', 'Initiator'];

const Dashboard = () => {
  const [players, setPlayers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    rank: '',
    role: '',
    hasMic: null as boolean | null,
  });
  const { toast } = useToast();
  
  // Simulate API fetch
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // In a real app, you'd fetch from your API
        setPlayers(mockPlayers);
      } catch (error) {
        console.error('Error fetching players:', error);
        toast({
          title: "Error",
          description: "Failed to load players. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlayers();
  }, [toast]);
  
  // Filter players based on selected filters
  const filteredPlayers = players.filter(player => {
    // Apply rank filter
    if (filters.rank && player.rank && !player.rank.toLowerCase().includes(filters.rank.toLowerCase())) {
      return false;
    }
    
    // Apply role filter
    if (filters.role && player.role !== filters.role) {
      return false;
    }
    
    // Apply mic filter
    if (filters.hasMic !== null && player.hasMic !== filters.hasMic) {
      return false;
    }
    
    return true;
  });
  
  // Handle filter changes
  const handleFilterChange = (filterName: string, value: string | boolean) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value,
    }));
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      rank: '',
      role: '',
      hasMic: null,
    });
  };
  
  const handlePlayerClick = (playerId: string) => {
    // In a real app, navigate to the player's profile
    console.log(`Clicked on player ${playerId}`);
  };

  return (
    <Layout>
      <div className="pb-12">
        <h1 className="text-3xl font-bold mb-6">Find Teammates</h1>
        
        {/* Filters */}
        <div className="valorant-card mb-8 p-6">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Rank filter */}
            <div>
              <label htmlFor="rank-filter" className="block text-sm font-medium mb-2">
                Rank
              </label>
              <select
                id="rank-filter"
                value={filters.rank}
                onChange={(e) => handleFilterChange('rank', e.target.value)}
                className="w-full rounded-md border bg-card px-4 py-2 focus:border-valorant-red focus:outline-none focus:ring-1 focus:ring-valorant-red"
              >
                <option value="">Any Rank</option>
                {ranks.map((rank) => (
                  <option key={rank} value={rank}>
                    {rank}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Role filter */}
            <div>
              <label htmlFor="role-filter" className="block text-sm font-medium mb-2">
                Role
              </label>
              <select
                id="role-filter"
                value={filters.role}
                onChange={(e) => handleFilterChange('role', e.target.value)}
                className="w-full rounded-md border bg-card px-4 py-2 focus:border-valorant-red focus:outline-none focus:ring-1 focus:ring-valorant-red"
              >
                <option value="">Any Role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Mic filter */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Mic Preference
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleFilterChange('hasMic', true)}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-md transition-colors ${
                    filters.hasMic === true
                      ? 'border-valorant-red bg-valorant-red/10 text-valorant-red'
                      : 'border-valorant-blue/20 hover:bg-valorant-blue/10'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  Has Mic
                </button>
                <button
                  onClick={() => handleFilterChange('hasMic', false)}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-md transition-colors ${
                    filters.hasMic === false
                      ? 'border-valorant-red bg-valorant-red/10 text-valorant-red'
                      : 'border-valorant-blue/20 hover:bg-valorant-blue/10'
                  }`}
                >
                  <MicOff className="w-4 h-4" />
                  No Mic
                </button>
                <button
                  onClick={() => handleFilterChange('hasMic', null)}
                  className={`px-4 py-2 border rounded-md transition-colors ${
                    filters.hasMic === null
                      ? 'border-valorant-red bg-valorant-red/10 text-valorant-red'
                      : 'border-valorant-blue/20 hover:bg-valorant-blue/10'
                  }`}
                >
                  Any
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={clearFilters}
              className="valorant-button-outline"
            >
              Clear Filters
            </button>
          </div>
        </div>
        
        {/* Player grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-valorant-red"></div>
          </div>
        ) : filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlayers.map((player) => (
              <PlayerCard 
                key={player.id} 
                player={player} 
                onClick={() => handlePlayerClick(player.id)}
              />
            ))}
          </div>
        ) : (
          <div className="valorant-card p-6 text-center">
            <h3 className="text-lg font-medium">No players match your filters</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters to see more players</p>
            <button
              onClick={clearFilters}
              className="valorant-button mt-4"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
