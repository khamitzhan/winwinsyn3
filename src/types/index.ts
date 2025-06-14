export interface User {
  id: string;
  username: string;
  email: string;
  isSubscribed: boolean;
  isAdmin: boolean;
  subscriptionTier: 'free' | 'basic' | 'premium';
  joinedAt: Date;
  avatar?: string;
}

export interface VoteOption {
  id: string;
  label: string;
  votes: number;
  color?: string;
}

export interface Vote {
  id: string;
  title: string;
  description: string;
  options: VoteOption[];
  category: string;
  isActive: boolean;
  endsAt: Date;
  createdAt: Date;
  createdBy: string;
  totalVotes: number;
  allowMultiple: boolean;
  requiresSubscription: boolean;
}

export interface UserVote {
  voteId: string;
  optionId: string;
  userId: string;
  timestamp: Date;
}

export interface KikMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isCommand: boolean;
  commandType?: 'vote' | 'subscribe' | 'help';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  maxProgress: number;
  completed: boolean;
  expiresAt?: Date;
}

export interface PrizeDraw {
  id: string;
  title: string;
  description: string;
  prize: string;
  prizeValue: number;
  entries: number;
  maxEntries: number;
  endsAt: Date;
  winner?: {
    username: string;
    timestamp: Date;
  };
  isActive: boolean;
}

export interface EducationContent {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'tutorial';
  content: string;
  videoUrl?: string;
  duration?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  publishedAt: Date;
}