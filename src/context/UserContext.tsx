import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Chain = 'TRC-20' | 'ERC-20' | 'SOL';
type Wallet = 'MetaMask' | 'TronLink' | 'Phantom';

interface Deposit {
  id: string;
  amount: number;
  chain: Chain;
  wallet: Wallet;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
}

interface Referral {
  id: string;
  email: string;
  joined: boolean;
  tickets: number;
  commissions: number;
  timestamp: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  progress: number;
  maxProgress: number;
}

interface UserContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;
  balance: number;
  tickets: number;
  referralCode: string;
  level: number;
  experience: number;
  deposits: Deposit[];
  referrals: Referral[];
  achievements: Achievement[];
  connectedWallets: Partial<Record<Wallet, string>>;
  login: () => void;
  logout: () => void;
  toggleAdmin: () => void;
  addTickets: (amount: number) => void;
  addBalance: (amount: number) => void;
  addDeposit: (amount: number, chain: Chain, wallet: Wallet) => void;
  connectWallet: (type: Wallet, address: string) => void;
  disconnectWallet: (type: Wallet) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Demo: Auto logged in
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('Player1337');
  const [balance, setBalance] = useState(100);
  const [tickets, setTickets] = useState(25);
  const [referralCode, setReferralCode] = useState('WIN-' + uuidv4().substring(0, 8));
  const [level, setLevel] = useState(3);
  const [experience, setExperience] = useState(450);

  const [deposits, setDeposits] = useState<Deposit[]>([
    {
      id: uuidv4(),
      amount: 50,
      chain: 'TRC-20',
      wallet: 'TronLink',
      timestamp: Date.now() - 86400000,
      status: 'completed',
    },
    {
      id: uuidv4(),
      amount: 25,
      chain: 'ERC-20',
      wallet: 'MetaMask',
      timestamp: Date.now() - 43200000,
      status: 'completed',
    },
    {
      id: uuidv4(),
      amount: 25,
      chain: 'SOL',
      wallet: 'Phantom',
      timestamp: Date.now() - 21600000,
      status: 'completed',
    },
  ]);

  const [referrals, setReferrals] = useState<Referral[]>([
    {
      id: uuidv4(),
      email: 'friend1@example.com',
      joined: true,
      tickets: 10,
      commissions: 5,
      timestamp: Date.now() - 172800000,
    },
    {
      id: uuidv4(),
      email: 'friend2@example.com',
      joined: true,
      tickets: 5,
      commissions: 2.5,
      timestamp: Date.now() - 86400000,
    },
    {
      id: uuidv4(),
      email: 'friend3@example.com',
      joined: false,
      tickets: 0,
      commissions: 0,
      timestamp: Date.now() - 43200000,
    },
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: uuidv4(),
      title: 'First Deposit',
      description: 'Make your first deposit',
      reward: 5,
      completed: true,
      progress: 1,
      maxProgress: 1,
    },
    {
      id: uuidv4(),
      title: 'Referral Master',
      description: 'Refer 5 friends',
      reward: 20,
      completed: false,
      progress: 2,
      maxProgress: 5,
    },
    {
      id: uuidv4(),
      title: 'High Roller',
      description: 'Deposit 500 USDT in total',
      reward: 50,
      completed: false,
      progress: 100,
      maxProgress: 500,
    },
    {
      id: uuidv4(),
      title: 'Educational Expert',
      description: 'Complete all tutorials',
      reward: 25,
      completed: false,
      progress: 3,
      maxProgress: 8,
    },
  ]);

  const [connectedWallets, setConnectedWallets] = useState<Partial<Record<Wallet, string>>>({
    TronLink: 'T8XJ4jY3Gfas...',
    MetaMask: '0x1a2b3c...',
  });

  // Persist user state in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('winWinUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setIsLoggedIn(userData.isLoggedIn);
      setIsAdmin(userData.isAdmin);
      setUsername(userData.username);
      setBalance(userData.balance);
      setTickets(userData.tickets);
      setReferralCode(userData.referralCode);
      setLevel(userData.level);
      setExperience(userData.experience);
      setDeposits(userData.deposits);
      setReferrals(userData.referrals);
      setAchievements(userData.achievements);
      setConnectedWallets(userData.connectedWallets);
    }
  }, []);

  // Save user state to localStorage
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('winWinUser', JSON.stringify({
        isLoggedIn,
        isAdmin,
        username,
        balance,
        tickets,
        referralCode,
        level,
        experience,
        deposits,
        referrals,
        achievements,
        connectedWallets,
      }));
    }
  }, [
    isLoggedIn, isAdmin, username, balance, tickets, 
    referralCode, level, experience, deposits, 
    referrals, achievements, connectedWallets
  ]);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('winWinUser');
  };

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  const addTickets = (amount: number) => {
    setTickets(prev => prev + amount);
  };

  const addBalance = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  const addDeposit = (amount: number, chain: Chain, wallet: Wallet) => {
    const newDeposit: Deposit = {
      id: uuidv4(),
      amount,
      chain,
      wallet,
      timestamp: Date.now(),
      status: 'completed',
    };
    
    setDeposits(prev => [newDeposit, ...prev]);
    addBalance(amount);
    addTickets(amount);
  };

  const connectWallet = (type: Wallet, address: string) => {
    setConnectedWallets(prev => ({ ...prev, [type]: address }));
  };

  const disconnectWallet = (type: Wallet) => {
    setConnectedWallets(prev => {
      const updated = { ...prev };
      delete updated[type];
      return updated;
    });
  };

  const value = {
    isLoggedIn,
    isAdmin,
    username,
    balance,
    tickets,
    referralCode,
    level,
    experience,
    deposits,
    referrals,
    achievements,
    connectedWallets,
    login,
    logout,
    toggleAdmin,
    addTickets,
    addBalance,
    addDeposit,
    connectWallet,
    disconnectWallet,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};