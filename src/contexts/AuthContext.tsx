import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { toast } from 'react-toastify';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  upgradeSubscription: (tier: 'basic' | 'premium') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate loading user from localStorage
    const savedUser = localStorage.getItem('votestream_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Demo user for development
      const demoUser: User = {
        id: '1',
        username: 'DemoUser',
        email: 'demo@example.com',
        isSubscribed: true,
        isAdmin: false,
        subscriptionTier: 'premium',
        joinedAt: new Date(),
      };
      setUser(demoUser);
      localStorage.setItem('votestream_user', JSON.stringify(demoUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@example.com' && password === 'admin') {
      const adminUser: User = {
        id: '2',
        username: 'Admin',
        email: 'admin@example.com',
        isSubscribed: true,
        isAdmin: true,
        subscriptionTier: 'premium',
        joinedAt: new Date(),
      };
      setUser(adminUser);
      localStorage.setItem('votestream_user', JSON.stringify(adminUser));
      toast.success('Welcome back, Admin!');
      return true;
    }
    
    if (email === 'demo@example.com' && password === 'demo') {
      const demoUser: User = {
        id: '1',
        username: 'DemoUser',
        email: 'demo@example.com',
        isSubscribed: true,
        isAdmin: false,
        subscriptionTier: 'premium',
        joinedAt: new Date(),
      };
      setUser(demoUser);
      localStorage.setItem('votestream_user', JSON.stringify(demoUser));
      toast.success('Welcome back!');
      return true;
    }
    
    toast.error('Invalid credentials');
    return false;
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      isSubscribed: false,
      isAdmin: false,
      subscriptionTier: 'free',
      joinedAt: new Date(),
    };
    
    setUser(newUser);
    localStorage.setItem('votestream_user', JSON.stringify(newUser));
    toast.success('Account created successfully!');
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('votestream_user');
    toast.info('Logged out successfully');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('votestream_user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
    }
  };

  const upgradeSubscription = (tier: 'basic' | 'premium') => {
    if (user) {
      const updatedUser = { 
        ...user, 
        subscriptionTier: tier, 
        isSubscribed: true 
      };
      setUser(updatedUser);
      localStorage.setItem('votestream_user', JSON.stringify(updatedUser));
      toast.success(`Upgraded to ${tier} subscription!`);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    upgradeSubscription,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};