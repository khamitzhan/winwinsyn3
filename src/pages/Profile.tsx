import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Crown, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });

  const handleSave = () => {
    if (!editForm.username.trim() || !editForm.email.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    updateProfile({
      username: editForm.username,
      email: editForm.email,
    });
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      username: user?.username || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center py-12">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Please log in</h2>
          <p className="text-gray-600">You need to be logged in to view your profile.</p>
        </Card>
      </div>
    );
  }

  const stats = [
    { label: 'Votes Cast', value: '127' },
    { label: 'Challenges Completed', value: '23' },
    { label: 'Referrals', value: '8' },
    { label: 'Rewards Earned', value: '$245' },
  ];

  const achievements = [
    { title: 'First Vote', description: 'Cast your first vote', completed: true },
    { title: 'Chat Master', description: 'Send 100 messages', completed: true },
    { title: 'Referral Pro', description: 'Refer 10 friends', completed: false },
    { title: 'Challenge Champion', description: 'Complete 50 challenges', completed: false },
  ];

  const activityHistory = [
    { action: 'Voted in "Mystery Box Selection"', timestamp: new Date('2024-02-20T10:30:00') },
    { action: 'Completed "Daily Voter" challenge', timestamp: new Date('2024-02-20T09:15:00') },
    { action: 'Referred new user "NewFriend123"', timestamp: new Date('2024-02-19T16:45:00') },
    { action: 'Won prize draw "Gaming Mouse"', timestamp: new Date('2024-02-18T14:20:00') },
    { action: 'Upgraded to Premium subscription', timestamp: new Date('2024-02-15T11:00:00') },
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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Profile</h1>
        <p className="text-lg text-gray-600">
          Manage your account settings and view your activity
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <Card>
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              
              {user.isSubscribed && (
                <div className="flex items-center justify-center mb-2">
                  <Crown className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="badge badge-warning capitalize">
                    {user.subscriptionTier}
                  </span>
                </div>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    className="input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="input"
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSave}
                    icon={<Save className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleCancel}
                    icon={<X className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Username</p>
                    <p className="font-medium text-gray-900">{user.username}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="font-medium text-gray-900">
                      {user.joinedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  icon={<Edit className="w-4 h-4" />}
                  className="w-full"
                >
                  Edit Profile
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Stats and Activity */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Achievements */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-2 ${
                    achievement.completed
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      achievement.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {achievement.completed ? (
                        <span className="text-white text-sm">✓</span>
                      ) : (
                        <span className="text-white text-sm">?</span>
                      )}
                    </div>
                    <h3 className={`font-medium ${
                      achievement.completed ? 'text-green-700' : 'text-gray-700'
                    }`}>
                      {achievement.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 ml-11">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Activity History */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {activityHistory.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-gray-900">{activity.action}</span>
                  <span className="text-sm text-gray-500">
                    {activity.timestamp.toLocaleDateString()} {activity.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;