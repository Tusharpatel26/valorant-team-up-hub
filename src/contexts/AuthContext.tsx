
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the User type
export type User = {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  riotId?: string;
  rank?: string;
  role?: string;
  hasMic?: boolean;
};

// Define the AuthContextType
type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Create a hook for easy access to the auth context
export const useAuth = () => useContext(AuthContext);

// Define the AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check localStorage for a saved user (this is just for demo purposes)
        const savedUser = localStorage.getItem('fiveQ_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function (mock implementation for now)
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // For demo purposes, we'll just create a mock user
      // In a real app, you'd call your authentication API here
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substring(2, 11),
        email,
        displayName: email.split('@')[0],
        avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=' + email,
        rank: 'Gold 2',
        role: 'Duelist',
        hasMic: true,
      };
      
      // Save to localStorage for persistence (demo only, not for production)
      localStorage.setItem('fiveQ_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function (mock implementation)
  const register = async (email: string, password: string, displayName: string) => {
    setLoading(true);
    try {
      // Similar mock implementation as login
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substring(2, 11),
        email,
        displayName,
        avatarUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=' + email,
      };
      
      localStorage.setItem('fiveQ_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('fiveQ_user');
    setUser(null);
  };
  
  // Context value
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
