import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Users, Gift, Star } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { PrizeDraw } from '../types';

const PrizeDraws = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const prizeDraws: PrizeDraw[] = [
    {
      id: '1',
      title: 'Weekly Gaming Setup Giveaway',
      description: 'Win a complete gaming setup including RGB keyboard, gaming mouse, and headset!',
      prize: 'Gaming Setup Bundle',
      prizeValue: 500,
      entries: 1247,
      maxEntries: 2000,
      endsAt: new Date(Date.now() + 86400000 * 3), // 3 days from now
      isActive: true,
    },
    {
      id: '2',
      title: 'Monthly Cash Prize',
      description: 'Enter for a chance to win $1000 cash prize!',
      prize: '$1000 Cash',
      prizeValue: 1000,
      entries: 856,
      maxEntries: 1500,
      endsAt: new Date(Date.now() + 86400000 * 7), // 7 days from now
      isActive: true,
    },
    {
      id: '3',
      title: 'Premium Subscription Bundle',
      description: 'Win 6 months of premium subscription plus exclusive badges!',
      prize: '6 Month Premium + Badges',
      prizeValue: 120,
      entries: 432,
      maxEntries: 1000,
      endsAt: new Date(Date.now() + 86400000 * 14), // 14 days from now
      isActive: true,
    },
    {
      id: '4',
      title: 'Last Week\'s Gaming Mouse',
      description: 'High-end gaming mouse with RGB lighting',
      prize: 'Gaming Mouse Pro',
      prizeValue: 150,
      entries: 1500,
      maxEntries: 1500,
      endsAt: new Date(Date.now() - 86400000), // 1 day ago
      winner: {
        username: 'GamerPro2024',
        timestamp: new Date(Date.now() - 86400000),
      },
      isActive: false,
    },
    {
      id: '5',
      title: 'Previous Month Cash Prize',
      description: 'Monthly $500 cash giveaway',
      prize: '$500 Cash',
      prizeValue: 500,
      entries: 2000,
      maxEntries: 2000,
      endsAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
      winner: {
        username: 'LuckyWinner123',
        timestamp: new Date(Date.now() - 86400000 * 7),
      },
      isActive: false,
    },
  ];

  const activeDraws = prizeDraws.filter(draw => draw.isActive);
  const completedDraws = prizeDraws.filter(draw => !draw.isActive);

  const formatTimeLeft = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h`;
    } else {
      return `${hours}h`;
    }
  };

  const getProgressPercentage = (entries: number, maxEntries: number) => {
    return Math.min(100, (entries / maxEntries) * 100);
  };

  const handleEnterDraw = (drawId: string) => {
    // Simulate entering draw
    console.log('Entering draw:', drawId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Prize Draws</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Enter exciting prize draws and win amazing rewards! 
          Participate in voting and complete challenges to earn entries.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">{activeDraws.length}</h3>
          <p className="text-gray-600">Active Draws</p>
        </Card>
        
        <Card className="text-center">
          <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">
            {activeDraws.reduce((sum, draw) => sum + draw.entries, 0).toLocaleString()}
          </h3>
          <p className="text-gray-600">Total Entries</p>
        </Card>
        
        <Card className="text-center">
          <Gift className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">
            ${activeDraws.reduce((sum, draw) => sum + draw.prizeValue, 0).toLocaleString()}
          </h3>
          <p className="text-gray-600">Total Prize Value</p>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit mx-auto">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'active'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Active Draws ({activeDraws.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'completed'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Completed ({completedDraws.length})
        </button>
      </div>

      {/* Prize Draws Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(activeTab === 'active' ? activeDraws : completedDraws).map((draw, index) => (
          <motion.div
            key={draw.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col">
              {/* Prize Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className="badge badge-success">${draw.prizeValue} Value</span>
                {draw.isActive && (
                  <div className="flex items-center text-green-600 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1" />
                    Active
                  </div>
                )}
              </div>

              {/* Title and Description */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{draw.title}</h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">{draw.description}</p>

              {/* Prize */}
              <div className="flex items-center mb-4 p-3 bg-yellow-50 rounded-lg">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="font-medium text-gray-900">{draw.prize}</span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{draw.entries.toLocaleString()} entries</span>
                  <span>{draw.maxEntries.toLocaleString()} max</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-primary-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${getProgressPercentage(draw.entries, draw.maxEntries)}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>

              {/* Time/Winner Info */}
              <div className="flex items-center justify-between mb-4">
                {draw.isActive ? (
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{formatTimeLeft(draw.endsAt)} left</span>
                  </div>
                ) : draw.winner ? (
                  <div className="text-sm">
                    <span className="text-gray-600">Winner: </span>
                    <span className="font-medium text-gray-900">{draw.winner.username}</span>
                  </div>
                ) : null}
              </div>

              {/* Action Button */}
              {draw.isActive ? (
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => handleEnterDraw(draw.id)}
                  disabled={draw.entries >= draw.maxEntries}
                >
                  {draw.entries >= draw.maxEntries ? 'Draw Full' : 'Enter Draw'}
                </Button>
              ) : (
                <div className="text-center py-2 text-gray-500 text-sm">
                  Draw Completed
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* How to Enter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12"
      >
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How to Earn Entries
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Vote in Polls</h3>
              <p className="text-gray-600 text-sm">
                Participate in active voting polls to earn 1 entry per vote
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Complete Challenges</h3>
              <p className="text-gray-600 text-sm">
                Finish daily and weekly challenges for bonus entries
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Premium Benefits</h3>
              <p className="text-gray-600 text-sm">
                Premium subscribers get 2x entries and exclusive draws
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PrizeDraws;