import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Winner {
  id: string;
  username: string;
  prize: number;
  ticketNumber: string;
  timestamp: number;
}

interface Draw {
  id: string;
  endTime: number;
  prizePool: number;
  ticketsEntered: number;
  winner: Winner | null;
  status: 'active' | 'completed';
}

interface DrawContextType {
  currentDraw: Draw;
  pastDraws: Draw[];
  livePlayerCount: number;
  addToPrizePool: (amount: number) => void;
  completeDraw: () => void;
}

const DrawContext = createContext<DrawContextType | undefined>(undefined);

export const DrawProvider = ({ children }: { children: ReactNode }) => {
  // Current draw state
  const [currentDraw, setCurrentDraw] = useState<Draw>({
    id: uuidv4(),
    endTime: Date.now() + 3600000, // 1 hour from now
    prizePool: 2500,
    ticketsEntered: 850,
    winner: null,
    status: 'active',
  });

  // Past draws state
  const [pastDraws, setPastDraws] = useState<Draw[]>([
    {
      id: uuidv4(),
      endTime: Date.now() - 3600000, // 1 hour ago
      prizePool: 2200,
      ticketsEntered: 820,
      winner: {
        id: uuidv4(),
        username: 'CryptoKing',
        prize: 2200,
        ticketNumber: '8472',
        timestamp: Date.now() - 3600000,
      },
      status: 'completed',
    },
    {
      id: uuidv4(),
      endTime: Date.now() - 7200000, // 2 hours ago
      prizePool: 1900,
      ticketsEntered: 780,
      winner: {
        id: uuidv4(),
        username: 'LuckyDraw',
        prize: 1900,
        ticketNumber: '3156',
        timestamp: Date.now() - 7200000,
      },
      status: 'completed',
    },
    {
      id: uuidv4(),
      endTime: Date.now() - 10800000, // 3 hours ago
      prizePool: 2100,
      ticketsEntered: 810,
      winner: {
        id: uuidv4(),
        username: 'Player1337',
        prize: 2100,
        ticketNumber: '6290',
        timestamp: Date.now() - 10800000,
      },
      status: 'completed',
    },
  ]);

  // Random fluctuating player count for realism
  const [livePlayerCount, setLivePlayerCount] = useState(
    Math.floor(Math.random() * 300) + 1200
  );

  // Update live player count periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
      setLivePlayerCount(prev => {
        const newCount = prev + change;
        return newCount < 1000 ? 1000 : Math.min(newCount, 2000);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Update prize pool periodically to simulate active deposits
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIncrease = Math.floor(Math.random() * 50) + 1;
      addToPrizePool(randomIncrease);
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Check if draw should complete
  useEffect(() => {
    const checkDrawEnd = setInterval(() => {
      if (currentDraw.endTime <= Date.now() && currentDraw.status === 'active') {
        completeDraw();
      }
    }, 1000);

    return () => clearInterval(checkDrawEnd);
  }, [currentDraw]);

  const addToPrizePool = (amount: number) => {
    setCurrentDraw(prev => ({
      ...prev,
      prizePool: prev.prizePool + amount,
      ticketsEntered: prev.ticketsEntered + amount,
    }));
  };

  const completeDraw = () => {
    // Create a winner
    const winner: Winner = {
      id: uuidv4(),
      username: getRandomUsername(),
      prize: currentDraw.prizePool,
      ticketNumber: Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
      timestamp: Date.now(),
    };

    // Update current draw as completed
    const completedDraw: Draw = {
      ...currentDraw,
      winner,
      status: 'completed',
    };

    // Add to past draws
    setPastDraws(prev => [completedDraw, ...prev]);

    // Create new current draw
    setCurrentDraw({
      id: uuidv4(),
      endTime: Date.now() + 3600000, // 1 hour from now
      prizePool: Math.floor(completedDraw.prizePool * 0.1), // 10% of previous prize pool starts new one
      ticketsEntered: Math.floor(completedDraw.ticketsEntered * 0.2), // 20% of previous entries
      winner: null,
      status: 'active',
    });
  };

  // Helper function to generate random usernames
  const getRandomUsername = () => {
    const prefixes = ['Crypto', 'Lucky', 'Winner', 'Gold', 'Diamond', 'Emerald', 'Royal'];
    const suffixes = ['Player', 'Master', 'King', 'Queen', 'Pro', 'Champion', 'Star'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const number = Math.floor(Math.random() * 1000);
    return `${prefix}${suffix}${number}`;
  };

  const value = {
    currentDraw,
    pastDraws,
    livePlayerCount,
    addToPrizePool,
    completeDraw,
  };

  return <DrawContext.Provider value={value}>{children}</DrawContext.Provider>;
};

export const useDraw = () => {
  const context = useContext(DrawContext);
  if (context === undefined) {
    throw new Error('useDraw must be used within a DrawProvider');
  }
  return context;
};