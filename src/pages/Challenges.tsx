import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, Trophy, CheckCircle, Star, Gift } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Challenge } from '../types';

const Challenges = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'completed'>('daily');

  const challenges: Challenge[] = [
    // Daily Challenges
    {
      id: '1',
      title: 'Vote Master',
      description: 'Cast 5 votes in different polls today',
      reward: 10,
      progress: 3,
      maxProgress: 5,
      completed: false,
      expiresAt: new Date(Date.now() + 86400000), // 24 hours
    },
    {
      id: '2',
      title: 'Chat Participant',
      description: 'Send 10 messages in chat',
      reward: 5,
      progress: 7,
      maxProgress: 10,
      completed: false,
      expiresAt: new Date(Date.now() + 86400000),
    },
    {
      id: '3',
      title: 'Early Bird',
      description: 'Vote within the first 5 minutes of a new poll',
      reward: 15,
      progress: 1,
      maxProgress: 1,
      completed: true,
    },
    
    // Weekly Challenges
    {
      id: '4',
      title: 'Voting Streak',
      description: 'Vote every day for 7 consecutive days',
      reward: 50,
      progress: 4,
      maxProgress: 7,
      completed: false,
      expiresAt: new Date(Date.now() + 86400000 * 3), // 3 days left
    },
    {
      id: '5',
      title: 'Community Leader',
      description: 'Get 100 total votes across all polls this week',
      reward: 75,
      progress: 67,
      maxProgress: 100,
      completed: false,
      expiresAt: new Date(Date.now() + 86400000 * 2), // 2 days left
    },
    {
      id: '6',
      title: 'Social Butterfly',
      description: 'Refer 3 new users this week',
      reward: 100,
      progress: 1,
      maxProgress: 3,
      completed: false,
      expiresAt: new Date(Date.now() + 86400000 * 5), // 5 days left
    },

    // Completed Challenges
    {
      id: '7',
      title: 'First Vote',
      description: 'Cast your first vote on the platform',
      reward: 20,
      progress: 1,
      maxProgress: 1,
      completed: true,
    },
    {
      id: '8',
      title: 'Chat Newcomer',
      description: 'Send your first message in chat',
      reward: 10,
      progress: 1,
      maxProgress: 1,
      completed: true,
    },
  ];

  const dailyChallenges = challenges.filter(c => c.expiresAt && 
    c.expiresAt.getTime() - Date.now() <= 86400000 && !c.completed);
  const weeklyChallenges = challenges.filter(c => c.expiresAt && 
    c.expiresAt.getTime() - Date.now() > 86400000 && !c.completed);
  const completedChallenges = challenges.filter(c => c.completed);

  const getTimeLeft = (expiresAt?: Date) => {
    if (!expiresAt) return '';
    
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days}d ${hours % 24}h left`;
    } else {
      return `${hours}h left`;
    }
  };

  const getProgressPercentage = (progress: number, maxProgress: number) => {
    return Math.min(100, (progress / maxProgress) * 100);
  };

  const handleClaimReward = (challengeId: string) => {
    console.log('Claiming reward for challenge:', challengeId);
    // Simulate claiming reward
  };

  const getCurrentChallenges = () => {
    switch (activeTab) {
      case 'daily':
        return dailyChallenges;
      case 'weekly':
        return weeklyChallenges;
      case 'completed':
        return completedChallenges;
      default:
        return [];
    }
  };

  const totalRewardsEarned = completedChallenges.reduce((sum, challenge) => sum + challenge.reward, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Challenges</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Complete daily and weekly challenges to earn rewards, unlock achievements, 
          and boost your standing in the community.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">{dailyChallenges.length}</h3>
          <p className="text-gray-600">Daily Challenges</p>
        </Card>
        
        <Card className="text-center">
          <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">{weeklyChallenges.length}</h3>
          <p className="text-gray-600">Weekly Challenges</p>
        </Card>
        
        <Card className="text-center">
          <CheckCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">{completedChallenges.length}</h3>
          <p className="text-gray-600">Completed</p>
        </Card>
        
        <Card className="text-center">
          <Gift className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">{totalRewardsEarned}</h3>
          <p className="text-gray-600">Total Rewards</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit mx-auto">
        <button
          onClick={() => setActiveTab('daily')}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'daily'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Daily ({dailyChallenges.length})
        </button>
        <button
          onClick={() => setActiveTab('weekly')}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'weekly'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Weekly ({weeklyChallenges.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'completed'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Completed ({completedChallenges.length})
        </button>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {getCurrentChallenges().map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  {challenge.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <Target className="w-5 h-5 text-blue-500 mr-2" />
                  )}
                  <span className="badge badge-info">
                    {challenge.reward} pts
                  </span>
                </div>
                {challenge.expiresAt && !challenge.completed && (
                  <span className="text-xs text-gray-500">
                    {getTimeLeft(challenge.expiresAt)}
                  </span>
                )}
              </div>

              {/* Title and Description */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{challenge.title}</h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">{challenge.description}</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{challenge.progress}/{challenge.maxProgress}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${
                      challenge.completed ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${getProgressPercentage(challenge.progress, challenge.maxProgress)}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>

              {/* Action Button */}
              {challenge.completed ? (
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => handleClaimReward(challenge.id)}
                  icon={<Trophy className="w-4 h-4" />}
                >
                  Claim Reward
                </Button>
              ) : (
                <div className="text-center py-2 text-gray-500 text-sm">
                  {challenge.progress === challenge.maxProgress ? 'Ready to claim!' : 'In Progress'}
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Challenge Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Challenge Tips
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Check Daily</h3>
              <p className="text-gray-600 text-sm">
                New daily challenges refresh every 24 hours. Don't miss out!
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Streak Bonuses</h3>
              <p className="text-gray-600 text-sm">
                Complete challenges consecutively for bonus rewards
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Premium Perks</h3>
              <p className="text-gray-600 text-sm">
                Premium users get exclusive challenges with higher rewards
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Challenges;