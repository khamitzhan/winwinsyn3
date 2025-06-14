import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from '../../components/common/Card';
import { Users } from 'lucide-react';

interface LivePlayerCountProps {
  count: number;
}

const LivePlayerCount = ({ count }: LivePlayerCountProps) => {
  const [playerChanges, setPlayerChanges] = useState<Array<{ id: number; value: number }>>([]);
  const [playerId, setPlayerId] = useState(0);
  
  // Add visual player join/leave notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random change between -3 and +5 players
      const randomChange = Math.floor(Math.random() * 9) - 3;
      
      if (randomChange !== 0) {
        const newChange = {
          id: playerId,
          value: randomChange,
        };
        
        setPlayerChanges(prev => [...prev, newChange]);
        setPlayerId(prev => prev + 1);
        
        // Remove change notification after 2 seconds
        setTimeout(() => {
          setPlayerChanges(prev => prev.filter(change => change.id !== newChange.id));
        }, 2000);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [playerId]);
  
  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-center mb-4">
        <Users className="h-6 w-6 text-primary mr-2" />
        <h3 className="text-xl font-serif text-primary">Live Players</h3>
      </div>
      
      <div className="flex items-center justify-center py-6">
        <div className="relative">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-success animate-pulse mr-3"></div>
            <span className="text-3xl font-serif text-primary">
              {count.toLocaleString()}
            </span>
          </div>
          
          {/* Player change indicators */}
          <div className="absolute -right-8 top-0 bottom-0">
            {playerChanges.map(change => (
              <motion.div
                key={change.id}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -20 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className={`text-sm ${
                  change.value > 0 ? 'text-success' : 'text-error'
                }`}
              >
                {change.value > 0 ? `+${change.value}` : change.value}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-text-muted text-center text-sm">
        Players currently online on Win-Win Syndicate
      </div>
      
      <div className="mt-4 pt-4 border-t border-background-navy">
        <div className="flex justify-between text-sm">
          <div>
            <span className="text-text-muted block">Peak Today</span>
            <span className="text-text font-medium">{(count + 350).toLocaleString()}</span>
          </div>
          <div>
            <span className="text-text-muted block">Active Draws</span>
            <span className="text-text font-medium">1</span>
          </div>
          <div>
            <span className="text-text-muted block">Total Today</span>
            <span className="text-text font-medium">{(count + 1500).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LivePlayerCount;