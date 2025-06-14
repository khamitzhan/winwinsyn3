import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Copy, Share2, Gift, TrendingUp, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';

const Referral = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  // Mock referral data
  const referralCode = 'VOTE2024XYZ';
  const referralLink = `https://votestream.app/join/${referralCode}`;
  const referralStats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 240,
    thisMonthEarnings: 85,
  };

  const recentReferrals = [
    {
      id: '1',
      username: 'NewUser123',
      joinedAt: new Date('2024-02-15'),
      status: 'active',
      earnings: 25,
    },
    {
      id: '2',
      username: 'VoterPro',
      joinedAt: new Date('2024-02-10'),
      status: 'active',
      earnings: 30,
    },
    {
      id: '3',
      username: 'ChatMaster',
      joinedAt: new Date('2024-02-05'),
      status: 'inactive',
      earnings: 15,
    },
    {
      id: '4',
      username: 'PollFan',
      joinedAt: new Date('2024-01-28'),
      status: 'active',
      earnings: 40,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success('Referral link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join VoteStream',
          text: 'Join me on VoteStream for interactive voting and amazing prizes!',
          url: referralLink,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopyLink();
    }
  };

  const rewards = [
    {
      tier: 'Bronze',
      referrals: 5,
      bonus: 50,
      achieved: referralStats.totalReferrals >= 5,
    },
    {
      tier: 'Silver',
      referrals: 15,
      bonus: 150,
      achieved: referralStats.totalReferrals >= 15,
    },
    {
      tier: 'Gold',
      referrals: 30,
      bonus: 300,
      achieved: referralStats.totalReferrals >= 30,
    },
    {
      tier: 'Platinum',
      referrals: 50,
      bonus: 500,
      achieved: referralStats.totalReferrals >= 50,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Referral Program</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Invite friends to VoteStream and earn rewards for every successful referral. 
          The more friends you bring, the more you earn!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">{referralStats.totalReferrals}</h3>
          <p className="text-gray-600">Total Referrals</p>
        </Card>
        
        <Card className="text-center">
          <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">{referralStats.activeReferrals}</h3>
          <p className="text-gray-600">Active Referrals</p>
        </Card>
        
        <Card className="text-center">
          <Gift className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">${referralStats.totalEarnings}</h3>
          <p className="text-gray-600">Total Earnings</p>
        </Card>
        
        <Card className="text-center">
          <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">${referralStats.thisMonthEarnings}</h3>
          <p className="text-gray-600">This Month</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Referral Link */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Referral Link</h2>
          <p className="text-gray-600 mb-4">
            Share this link with friends to earn rewards when they join and become active users.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Referral Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={referralCode}
                  readOnly
                  className="input flex-1 rounded-r-none"
                />
                <Button
                  variant="outline"
                  onClick={handleCopyLink}
                  className="rounded-l-none border-l-0"
                  icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Referral Link
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="input flex-1 rounded-r-none text-sm"
                />
                <Button
                  variant="primary"
                  onClick={handleShare}
                  className="rounded-l-none border-l-0"
                  icon={<Share2 className="w-4 h-4" />}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* How It Works */}
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-blue-600 font-semibold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Share Your Link</h3>
                <p className="text-gray-600 text-sm">Send your referral link to friends via social media, email, or chat.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-green-600 font-semibold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Friend Joins</h3>
                <p className="text-gray-600 text-sm">Your friend signs up using your link and creates an account.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <span className="text-yellow-600 font-semibold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Earn Rewards</h3>
                <p className="text-gray-600 text-sm">Get $5 when they join, plus 10% of their subscription fees.</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Reward Tiers */}
      <Card className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Reward Tiers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rewards.map((reward, index) => (
            <motion.div
              key={reward.tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-2 text-center ${
                reward.achieved
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                reward.achieved ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {reward.achieved ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <Gift className="w-6 h-6 text-white" />
                )}
              </div>
              <h3 className={`font-semibold mb-1 ${
                reward.achieved ? 'text-green-700' : 'text-gray-700'
              }`}>
                {reward.tier}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {reward.referrals} referrals
              </p>
              <p className={`font-bold ${
                reward.achieved ? 'text-green-600' : 'text-gray-600'
              }`}>
                ${reward.bonus} bonus
              </p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (referralStats.totalReferrals / 50) * 100)}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {referralStats.totalReferrals} / 50 referrals to Platinum tier
          </p>
        </div>
      </Card>

      {/* Recent Referrals */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Referrals</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Joined</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {recentReferrals.map((referral) => (
                <tr key={referral.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">{referral.username}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-600">
                      {referral.joinedAt.toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`badge ${
                      referral.status === 'active' ? 'badge-success' : 'badge-error'
                    }`}>
                      {referral.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-green-600">
                      ${referral.earnings}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {recentReferrals.length === 0 && (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No referrals yet</h3>
            <p className="text-gray-600">
              Start sharing your referral link to see your referrals here!
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default Referral;