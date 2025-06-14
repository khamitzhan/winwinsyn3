import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Vote, VoteOption, UserVote } from '../types';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

interface VotingContextType {
  votes: Vote[];
  userVotes: UserVote[];
  activeVote: Vote | null;
  createVote: (vote: Omit<Vote, 'id' | 'createdAt' | 'totalVotes'>) => void;
  castVote: (voteId: string, optionId: string) => boolean;
  closeVote: (voteId: string) => void;
  deleteVote: (voteId: string) => void;
  getVoteResults: (voteId: string) => VoteOption[];
  hasUserVoted: (voteId: string) => boolean;
}

const VotingContext = createContext<VotingContextType | undefined>(undefined);

export const VotingProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [votes, setVotes] = useState<Vote[]>([]);
  const [userVotes, setUserVotes] = useState<UserVote[]>([]);
  const [activeVote, setActiveVote] = useState<Vote | null>(null);

  // Initialize with sample votes
  useEffect(() => {
    const sampleVotes: Vote[] = [
      {
        id: '1',
        title: 'Choose Your Mystery Box',
        description: 'Select which mystery box you want to open for a chance to win amazing prizes!',
        options: [
          { id: 'box1', label: 'Golden Box', votes: 45, color: '#ffd700' },
          { id: 'box2', label: 'Silver Box', votes: 32, color: '#c0c0c0' },
          { id: 'box3', label: 'Bronze Box', votes: 28, color: '#cd7f32' },
          { id: 'skip', label: 'Skip This Round', votes: 15, color: '#6b7280' },
        ],
        category: 'Mystery Box',
        isActive: true,
        endsAt: new Date(Date.now() + 30000), // 30 seconds from now
        createdAt: new Date(),
        createdBy: 'admin',
        totalVotes: 120,
        allowMultiple: false,
        requiresSubscription: true,
      },
      {
        id: '2',
        title: 'Next Game Mode',
        description: 'Vote for the next game mode we should play!',
        options: [
          { id: 'battle', label: 'Battle Royale', votes: 67, color: '#ef4444' },
          { id: 'puzzle', label: 'Puzzle Challenge', votes: 43, color: '#8b5cf6' },
          { id: 'speed', label: 'Speed Run', votes: 38, color: '#06b6d4' },
        ],
        category: 'Game Mode',
        isActive: false,
        endsAt: new Date(Date.now() - 60000),
        createdAt: new Date(Date.now() - 120000),
        createdBy: 'admin',
        totalVotes: 148,
        allowMultiple: false,
        requiresSubscription: false,
      },
    ];

    setVotes(sampleVotes);
    setActiveVote(sampleVotes.find(v => v.isActive) || null);
  }, []);

  // Auto-close expired votes
  useEffect(() => {
    const interval = setInterval(() => {
      setVotes(prevVotes => 
        prevVotes.map(vote => {
          if (vote.isActive && new Date() > vote.endsAt) {
            toast.info(`Voting for "${vote.title}" has ended!`);
            return { ...vote, isActive: false };
          }
          return vote;
        })
      );
      
      setActiveVote(prevActive => {
        if (prevActive && new Date() > prevActive.endsAt) {
          return null;
        }
        return prevActive;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const createVote = (voteData: Omit<Vote, 'id' | 'createdAt' | 'totalVotes'>) => {
    const newVote: Vote = {
      ...voteData,
      id: uuidv4(),
      createdAt: new Date(),
      totalVotes: 0,
      options: voteData.options.map(option => ({ ...option, votes: 0 })),
    };

    setVotes(prev => [newVote, ...prev]);
    
    if (newVote.isActive) {
      setActiveVote(newVote);
    }
    
    toast.success('Vote created successfully!');
  };

  const castVote = (voteId: string, optionId: string): boolean => {
    if (!user) {
      toast.error('Please log in to vote');
      return false;
    }

    const vote = votes.find(v => v.id === voteId);
    if (!vote) {
      toast.error('Vote not found');
      return false;
    }

    if (!vote.isActive) {
      toast.error('This vote is no longer active');
      return false;
    }

    if (vote.requiresSubscription && !user.isSubscribed) {
      toast.error('Subscription required to vote');
      return false;
    }

    if (hasUserVoted(voteId) && !vote.allowMultiple) {
      toast.error('You have already voted');
      return false;
    }

    const userVote: UserVote = {
      voteId,
      optionId,
      userId: user.id,
      timestamp: new Date(),
    };

    setUserVotes(prev => [...prev, userVote]);
    
    setVotes(prev => prev.map(v => {
      if (v.id === voteId) {
        return {
          ...v,
          options: v.options.map(option => 
            option.id === optionId 
              ? { ...option, votes: option.votes + 1 }
              : option
          ),
          totalVotes: v.totalVotes + 1,
        };
      }
      return v;
    }));

    if (activeVote?.id === voteId) {
      setActiveVote(prev => prev ? {
        ...prev,
        options: prev.options.map(option => 
          option.id === optionId 
            ? { ...option, votes: option.votes + 1 }
            : option
        ),
        totalVotes: prev.totalVotes + 1,
      } : null);
    }

    toast.success('Vote cast successfully!');
    return true;
  };

  const closeVote = (voteId: string) => {
    setVotes(prev => prev.map(vote => 
      vote.id === voteId ? { ...vote, isActive: false } : vote
    ));
    
    if (activeVote?.id === voteId) {
      setActiveVote(null);
    }
    
    toast.info('Vote closed');
  };

  const deleteVote = (voteId: string) => {
    setVotes(prev => prev.filter(vote => vote.id !== voteId));
    setUserVotes(prev => prev.filter(userVote => userVote.voteId !== voteId));
    
    if (activeVote?.id === voteId) {
      setActiveVote(null);
    }
    
    toast.success('Vote deleted');
  };

  const getVoteResults = (voteId: string): VoteOption[] => {
    const vote = votes.find(v => v.id === voteId);
    return vote?.options || [];
  };

  const hasUserVoted = (voteId: string): boolean => {
    return userVotes.some(userVote => 
      userVote.voteId === voteId && userVote.userId === user?.id
    );
  };

  const value = {
    votes,
    userVotes,
    activeVote,
    createVote,
    castVote,
    closeVote,
    deleteVote,
    getVoteResults,
    hasUserVoted,
  };

  return <VotingContext.Provider value={value}>{children}</VotingContext.Provider>;
};

export const useVoting = () => {
  const context = useContext(VotingContext);
  if (context === undefined) {
    throw new Error('useVoting must be used within a VotingProvider');
  }
  return context;
};