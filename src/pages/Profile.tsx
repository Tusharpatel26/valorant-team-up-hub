
import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import RankBadge from '../components/RankBadge';
import { useToast } from '../hooks/use-toast';
import { User, Edit, Check, X, ThumbsUp, ThumbsDown } from 'lucide-react';

// Mock user stats
const mockStats = {
  matches: 157,
  wins: 82,
  winRate: 52.2,
  upvotes: 45,
  downvotes: 12,
};

// Mock match history
const mockMatches = [
  { id: 1, date: '2023-04-20', map: 'Ascent', result: 'Win', score: '13-8', kda: '24/14/6', agent: 'Jett' },
  { id: 2, date: '2023-04-19', map: 'Bind', result: 'Loss', score: '5-13', kda: '12/15/3', agent: 'Reyna' },
  { id: 3, date: '2023-04-18', map: 'Haven', result: 'Win', score: '13-11', kda: '18/12/10', agent: 'Chamber' },
  { id: 4, date: '2023-04-17', map: 'Split', result: 'Win', score: '13-7', kda: '21/9/4', agent: 'Jett' },
  { id: 5, date: '2023-04-17', map: 'Lotus', result: 'Loss', score: '9-13', kda: '16/14/7', agent: 'Sova' },
];

// Available roles and ranks for editing
const roles = ['Duelist', 'Controller', 'Sentinel', 'Initiator'];
const ranks = [
  'Iron 1', 'Iron 2', 'Iron 3',
  'Bronze 1', 'Bronze 2', 'Bronze 3',
  'Silver 1', 'Silver 2', 'Silver 3',
  'Gold 1', 'Gold 2', 'Gold 3',
  'Platinum 1', 'Platinum 2', 'Platinum 3',
  'Diamond 1', 'Diamond 2', 'Diamond 3',
  'Ascendant 1', 'Ascendant 2', 'Ascendant 3',
  'Immortal 1', 'Immortal 2', 'Immortal 3',
  'Radiant'
];

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const { toast } = useToast();
  
  if (!user) return null;
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset form
      setEditedUser(user);
    }
    setIsEditing(!isEditing);
  };
  
  const handleSaveProfile = () => {
    // In a real app, send an API request to update the user profile
    // Here we'll just simulate success
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
    setIsEditing(false);
  };
  
  const handleChange = (field: string, value: any) => {
    setEditedUser({
      ...editedUser!,
      [field]: value,
    });
  };

  return (
    <Layout>
      <div className="pb-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Profile</h1>
          <button
            onClick={handleEditToggle}
            className={isEditing ? "valorant-button-outline flex items-center gap-2" : "valorant-button flex items-center gap-2"}
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4" /> 
                Cancel
              </>
            ) : (
              <>
                <Edit className="w-4 h-4" /> 
                Edit Profile
              </>
            )}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile info */}
          <div className="md:col-span-1">
            <div className="valorant-card">
              <div className="p-6">
                <div className="flex flex-col items-center">
                  <div className="h-32 w-32 rounded-full overflow-hidden mb-4 border-4 border-valorant-red">
                    <img 
                      src={user.avatarUrl || 'https://api.dicebear.com/7.x/identicon/svg?seed=' + user.id} 
                      alt={user.displayName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {isEditing ? (
                    <div className="w-full">
                      <div className="mb-4">
                        <label htmlFor="displayName" className="block text-sm font-medium mb-1">
                          Display Name
                        </label>
                        <input
                          id="displayName"
                          type="text"
                          value={editedUser?.displayName || ''}
                          onChange={(e) => handleChange('displayName', e.target.value)}
                          className="w-full rounded-md border bg-card px-4 py-2 focus:border-valorant-red focus:outline-none focus:ring-1 focus:ring-valorant-red"
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="rank" className="block text-sm font-medium mb-1">
                          Current Rank
                        </label>
                        <select
                          id="rank"
                          value={editedUser?.rank || ''}
                          onChange={(e) => handleChange('rank', e.target.value)}
                          className="w-full rounded-md border bg-card px-4 py-2 focus:border-valorant-red focus:outline-none focus:ring-1 focus:ring-valorant-red"
                        >
                          <option value="">Select Rank</option>
                          {ranks.map((rank) => (
                            <option key={rank} value={rank}>
                              {rank}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium mb-1">
                          Main Role
                        </label>
                        <select
                          id="role"
                          value={editedUser?.role || ''}
                          onChange={(e) => handleChange('role', e.target.value)}
                          className="w-full rounded-md border bg-card px-4 py-2 focus:border-valorant-red focus:outline-none focus:ring-1 focus:ring-valorant-red"
                        >
                          <option value="">Select Role</option>
                          {roles.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">
                          Microphone
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              checked={editedUser?.hasMic === true}
                              onChange={() => handleChange('hasMic', true)}
                              className="mr-2 accent-valorant-red"
                            />
                            Has Mic
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              checked={editedUser?.hasMic === false}
                              onChange={() => handleChange('hasMic', false)}
                              className="mr-2 accent-valorant-red"
                            />
                            No Mic
                          </label>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleSaveProfile}
                        className="valorant-button w-full flex items-center justify-center gap-2 mt-2"
                      >
                        <Check className="w-4 h-4" /> Save Changes
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold">{user.displayName}</h2>
                      <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                        {user.rank && <RankBadge rank={user.rank} size="lg" />}
                        {user.role && (
                          <span className="bg-valorant-blue px-3 py-1 text-sm rounded-md">
                            {user.role}
                          </span>
                        )}
                      </div>
                      
                      {user.hasMic !== undefined && (
                        <div className="mt-2 text-center">
                          {user.hasMic ? (
                            <span className="text-green-400 flex items-center justify-center gap-1">
                              <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                              </span>
                              Uses microphone
                            </span>
                          ) : (
                            <span className="text-red-400">No microphone</span>
                          )}
                        </div>
                      )}
                      
                      <div className="mt-6 text-center">
                        <div className="text-sm text-muted-foreground">Member since</div>
                        <div>April 2023</div>
                      </div>
                      
                      <div className="flex items-center mt-6">
                        <div className="flex flex-col items-center mx-4">
                          <div className="text-2xl font-bold flex items-center">
                            <ThumbsUp className="w-4 h-4 mr-1 text-green-400" />
                            {mockStats.upvotes}
                          </div>
                          <div className="text-xs text-muted-foreground">Upvotes</div>
                        </div>
                        <div className="h-10 border-l border-valorant-blue/20"></div>
                        <div className="flex flex-col items-center mx-4">
                          <div className="text-2xl font-bold flex items-center">
                            <ThumbsDown className="w-4 h-4 mr-1 text-red-400" />
                            {mockStats.downvotes}
                          </div>
                          <div className="text-xs text-muted-foreground">Downvotes</div>
                        </div>
                      </div>
                      
                      <div className="mt-6 w-full">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-muted-foreground">
                            79% positive reputation
                          </span>
                        </div>
                        <div className="w-full bg-valorant-blue/20 rounded-full h-2.5">
                          <div className="bg-valorant-red h-2.5 rounded-full" style={{ width: '79%' }}></div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Stats card */}
            <div className="valorant-card mt-6">
              <div className="p-6">
                <h3 className="font-bold mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Stats Overview
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-valorant-blue/20 rounded-md p-4">
                    <div className="text-xs text-muted-foreground">Matches</div>
                    <div className="text-2xl font-bold">{mockStats.matches}</div>
                  </div>
                  <div className="bg-valorant-blue/20 rounded-md p-4">
                    <div className="text-xs text-muted-foreground">Wins</div>
                    <div className="text-2xl font-bold">{mockStats.wins}</div>
                  </div>
                  <div className="col-span-2 bg-valorant-blue/20 rounded-md p-4">
                    <div className="text-xs text-muted-foreground">Win Rate</div>
                    <div className="text-2xl font-bold">{mockStats.winRate}%</div>
                    <div className="w-full bg-valorant-blue/40 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-valorant-red h-1.5 rounded-full" 
                        style={{ width: `${mockStats.winRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Match history */}
          <div className="md:col-span-2">
            <div className="valorant-card">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Recent Matches</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-valorant-blue/20 text-left">
                        <th className="pb-2">Date</th>
                        <th className="pb-2">Map</th>
                        <th className="pb-2">Result</th>
                        <th className="pb-2">Score</th>
                        <th className="pb-2">KDA</th>
                        <th className="pb-2">Agent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockMatches.map((match) => (
                        <tr 
                          key={match.id} 
                          className="border-b border-valorant-blue/20 hover:bg-valorant-blue/10 transition-colors"
                        >
                          <td className="py-3">{match.date}</td>
                          <td className="py-3">{match.map}</td>
                          <td className="py-3">
                            <span className={`
                              px-2 py-0.5 rounded text-sm font-medium
                              ${match.result === 'Win' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                            `}>
                              {match.result}
                            </span>
                          </td>
                          <td className="py-3">{match.score}</td>
                          <td className="py-3">{match.kda}</td>
                          <td className="py-3">{match.agent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 text-center">
                  <button className="valorant-button-outline">
                    Load More Matches
                  </button>
                </div>
              </div>
            </div>
            
            {/* Teammates history - placeholder for future implementation */}
            <div className="valorant-card mt-6">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Recent Teammates</h2>
                <p className="text-muted-foreground text-center py-6">
                  Your recent teammates will be displayed here as you play matches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
