import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, Crown, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { toast } from 'react-toastify';

const Deposit = () => {
  const { user, upgradeSubscription } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      id: 'basic' as const,
      name: 'Basic',
      price: 9.99,
      features: [
        'Vote on all polls',
        'Basic chat features',
        'Monthly prize draws',
        'Email support',
      ],
      color: 'border-blue-200 bg-blue-50',
      buttonColor: 'btn-primary',
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      price: 19.99,
      features: [
        'All Basic features',
        'Priority voting',
        'Exclusive premium polls',
        'Advanced chat features',
        'Weekly prize draws',
        'Priority support',
        'Custom profile badges',
      ],
      color: 'border-yellow-200 bg-yellow-50',
      buttonColor: 'btn-primary',
      popular: true,
    },
  ];

  const handleUpgrade = async (tier: 'basic' | 'premium') => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    upgradeSubscription(tier);
    setIsProcessing(false);
    setSelectedPlan(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Upgrade Your Experience
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Unlock premium features and get access to exclusive voting opportunities, 
          enhanced chat features, and priority support.
        </p>
      </div>

      {/* Current Status */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="text-center">
            <div className="flex items-center justify-center mb-4">
              {user.isSubscribed ? (
                <Crown className="w-8 h-8 text-yellow-500" />
              ) : (
                <Wallet className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Current Plan: {user.isSubscribed ? user.subscriptionTier : 'Free'}
            </h3>
            <p className="text-gray-600">
              {user.isSubscribed 
                ? 'You have access to premium features!' 
                : 'Upgrade to unlock premium features and voting privileges.'
              }
            </p>
          </Card>
        </motion.div>
      )}

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="relative"
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <Card className={`h-full ${plan.color} border-2 ${plan.popular ? 'border-primary-300' : ''}`}>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="primary"
                className="w-full"
                onClick={() => setSelectedPlan(plan.id)}
                disabled={user?.subscriptionTier === plan.id}
              >
                {user?.subscriptionTier === plan.id ? 'Current Plan' : `Upgrade to ${plan.name}`}
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Payment Modal Simulation */}
      {selectedPlan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <div className="text-center mb-6">
              <CreditCard className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Confirm Upgrade
              </h3>
              <p className="text-gray-600">
                Upgrade to {selectedPlan} plan for ${plans.find(p => p.id === selectedPlan)?.price}/month
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="input"
                  disabled={isProcessing}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="input"
                    disabled={isProcessing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="input"
                    disabled={isProcessing}
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setSelectedPlan(null)}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => handleUpgrade(selectedPlan)}
                loading={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Confirm Payment'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Features Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Upgrade?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Exclusive Access</h3>
              <p className="text-gray-600 text-sm">
                Get access to premium-only votes and exclusive content
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Priority Features</h3>
              <p className="text-gray-600 text-sm">
                Your votes count more and get priority in chat
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Better Rewards</h3>
              <p className="text-gray-600 text-sm">
                Higher chances in prize draws and exclusive rewards
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Deposit;