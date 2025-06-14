import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { Vote, VoteOption } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useVoting } from '../../contexts/VotingContext';
import Button from '../common/Button';
import Card from '../common/Card';

interface VotePanelProps {
  vote: Vote;
  showResults?: boolean;
}

const VotePanel = ({ vote, showResults = false }: VotePanelProps) => {
  const { user } = useAuth();
  const { castVote, hasUserVoted } = useVoting();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isVoting, setIsVoting] = useState(false);

  const userHasVoted = hasUserVoted(vote.id);
  const canVote = user && vote.isActive && !userHasVoted && 
                 (!vote.requiresSubscription || user.isSubscribed);

  // Calculate time remaining
  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date().getTime();
      const end = vote.endsAt.getTime();
      const remaining = Math.max(0, end - now);
      setTimeLeft(remaining);
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [vote.endsAt]);

  const formatTimeLeft = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const handleVote = async () => {
    if (!selectedOption || !canVote) return;
    
    setIsVoting(true);
    const success = castVote(vote.id, selectedOption);
    
    if (success) {
      setSelectedOption('');
    }
    
    setIsVoting(false);
  };

  const getOptionPercentage = (option: VoteOption) => {
    if (vote.totalVotes === 0) return 0;
    return Math.round((option.votes / vote.totalVotes) * 100);
  };

  const getOptionColor = (option: VoteOption, index: number) => {
    if (option.color) return option.color;
    
    const colors = ['#6366f1', '#f59e0b', '#10b981', '#ef4444'];
    return colors[index % colors.length];
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="badge badge-info">{vote.category}</span>
            {vote.requiresSubscription && (
              <span className="badge badge-warning">Subscribers Only</span>
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{vote.title}</h2>
          <p className="text-gray-600">{vote.description}</p>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>{vote.totalVotes} votes</span>
            </div>
            
            {vote.isActive && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{formatTimeLeft(timeLeft)}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {vote.isActive ? (
              <span className="flex items-center gap-1 text-sm text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Active
              </span>
            ) : (
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <div className="w-2 h-2 bg-gray-400 rounded-full" />
                Closed
              </span>
            )}
          </div>
        </div>

        {/* Voting Options */}
        <div className="space-y-3">
          {vote.options.map((option, index) => {
            const percentage = getOptionPercentage(option);
            const color = getOptionColor(option, index);
            const isSelected = selectedOption === option.id;
            
            return (
              <motion.div
                key={option.id}
                className={`relative overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                  canVote && !showResults
                    ? `cursor-pointer hover:border-primary-300 ${
                        isSelected ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                      }`
                    : 'border-gray-200'
                }`}
                onClick={() => {
                  if (canVote && !showResults) {
                    setSelectedOption(option.id);
                  }
                }}
                whileHover={canVote && !showResults ? { scale: 1.02 } : {}}
                whileTap={canVote && !showResults ? { scale: 0.98 } : {}}
              >
                {/* Progress Bar Background */}
                {(showResults || !vote.isActive) && (
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                )}
                
                <div className="relative p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {canVote && !showResults && (
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        isSelected 
                          ? 'border-primary-500 bg-primary-500' 
                          : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <motion.div
                            className="w-full h-full rounded-full bg-white"
                            initial={{ scale: 0 }}
                            animate={{ scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </div>
                    )}
                    
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </div>
                  
                  {(showResults || !vote.isActive) && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{option.votes}</span>
                      <span className="font-semibold text-gray-900">{percentage}%</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {canVote && !showResults && (
            <Button
              variant="primary"
              size="lg"
              onClick={handleVote}
              disabled={!selectedOption || isVoting}
              loading={isVoting}
              className="w-full"
            >
              Cast Vote
            </Button>
          )}
          
          {/* Status Messages */}
          <AnimatePresence>
            {!user && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg"
              >
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Please log in to participate in voting</span>
              </motion.div>
            )}
            
            {user && vote.requiresSubscription && !user.isSubscribed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 p-3 bg-yellow-50 text-yellow-700 rounded-lg"
              >
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Subscription required to vote on this poll</span>
              </motion.div>
            )}
            
            {userHasVoted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg"
              >
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Thank you for voting!</span>
              </motion.div>
            )}
            
            {!vote.isActive && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2 p-3 bg-gray-50 text-gray-700 rounded-lg"
              >
                <Clock className="w-4 h-4" />
                <span className="text-sm">This vote has ended</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
};

export default VotePanel;