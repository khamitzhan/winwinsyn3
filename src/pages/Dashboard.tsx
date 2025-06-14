import { motion } from 'framer-motion';
import { TrendingUp, Users, Trophy, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useVoting } from '../contexts/VotingContext';
import VotePanel from '../components/voting/VotePanel';
import Card from '../components/common/Card';

const Dashboard = () => {
  const { user } = useAuth();
  const { votes, activeVote } = useVoting();

  const stats = [
    {
      label: 'Active Votes',
      value: votes.filter(v => v.isActive).length,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Total Participants',
      value: '1,234',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Prizes Won',
      value: '42',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      label: 'Time Online',
      value: '2h 15m',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back{user ? `, ${user.username}` : ''}!
        </h1>
        <p className="text-gray-600">
          Participate in live voting, complete challenges, and win amazing prizes.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center">
                <div className={`inline-flex p-3 rounded-full ${stat.bgColor} mb-4`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Active Vote Section */}
      {activeVote ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Vote</h2>
          <VotePanel vote={activeVote} />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Votes</h3>
            <p className="text-gray-600">
              Check back soon for new voting opportunities!
            </p>
          </Card>
        </motion.div>
      )}

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Votes */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Votes</h3>
            <div className="space-y-3">
              {votes.slice(0, 3).map((vote) => (
                <div key={vote.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{vote.title}</h4>
                    <p className="text-sm text-gray-600">{vote.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{vote.totalVotes} votes</p>
                    <p className={`text-xs ${vote.isActive ? 'text-green-600' : 'text-gray-500'}`}>
                      {vote.isActive ? 'Active' : 'Closed'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
                <h4 className="font-medium text-primary-700">Join Prize Draw</h4>
                <p className="text-sm text-primary-600">Enter to win amazing prizes</p>
              </button>
              <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <h4 className="font-medium text-green-700">Complete Challenge</h4>
                <p className="text-sm text-green-600">Earn rewards and badges</p>
              </button>
              <button className="w-full p-3 text-left bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
                <h4 className="font-medium text-yellow-700">Refer Friends</h4>
                <p className="text-sm text-yellow-600">Get bonus rewards</p>
              </button>
            </div>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;