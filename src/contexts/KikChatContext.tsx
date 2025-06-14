import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { KikMessage } from '../types';
import { useAuth } from './AuthContext';
import { useVoting } from './VotingContext';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

interface KikChatContextType {
  messages: KikMessage[];
  isConnected: boolean;
  sendMessage: (message: string) => void;
  processCommand: (message: string, username: string) => void;
}

const KikChatContext = createContext<KikChatContextType | undefined>(undefined);

export const KikChatProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { castVote, activeVote } = useVoting();
  const [messages, setMessages] = useState<KikMessage[]>([]);
  const [isConnected, setIsConnected] = useState(true); // Simulated connection

  // Simulate incoming chat messages
  useEffect(() => {
    const simulateMessages = () => {
      const sampleMessages = [
        'Hey everyone! Ready for the next vote?',
        '!vote box1',
        'This is so exciting!',
        '!vote box2',
        'When does voting end?',
        '!help',
        'Love this interactive stream!',
        '!vote skip',
      ];

      const usernames = ['ChatUser1', 'VoterPro', 'StreamFan', 'BoxHunter', 'LuckyPlayer'];

      let messageIndex = 0;
      const interval = setInterval(() => {
        if (messageIndex < sampleMessages.length) {
          const message = sampleMessages[messageIndex];
          const username = usernames[Math.floor(Math.random() * usernames.length)];
          
          const kikMessage: KikMessage = {
            id: uuidv4(),
            username,
            message,
            timestamp: new Date(),
            isCommand: message.startsWith('!'),
            commandType: message.startsWith('!vote') ? 'vote' : 
                        message.startsWith('!help') ? 'help' : 
                        message.startsWith('!subscribe') ? 'subscribe' : undefined,
          };

          setMessages(prev => [...prev, kikMessage]);

          if (kikMessage.isCommand) {
            processCommand(message, username);
          }

          messageIndex++;
        } else {
          clearInterval(interval);
        }
      }, 3000);

      return () => clearInterval(interval);
    };

    const timeout = setTimeout(simulateMessages, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const sendMessage = (message: string) => {
    if (!user) return;

    const kikMessage: KikMessage = {
      id: uuidv4(),
      username: user.username,
      message,
      timestamp: new Date(),
      isCommand: message.startsWith('!'),
      commandType: message.startsWith('!vote') ? 'vote' : 
                  message.startsWith('!help') ? 'help' : 
                  message.startsWith('!subscribe') ? 'subscribe' : undefined,
    };

    setMessages(prev => [...prev, kikMessage]);

    if (kikMessage.isCommand) {
      processCommand(message, user.username);
    }
  };

  const processCommand = (message: string, username: string) => {
    const command = message.toLowerCase().trim();

    if (command.startsWith('!vote ')) {
      const option = command.replace('!vote ', '');
      
      if (!activeVote) {
        toast.error('No active vote available');
        return;
      }

      // Find matching option
      const voteOption = activeVote.options.find(opt => 
        opt.label.toLowerCase().includes(option) || 
        opt.id.toLowerCase() === option
      );

      if (voteOption) {
        const success = castVote(activeVote.id, voteOption.id);
        if (success) {
          const responseMessage: KikMessage = {
            id: uuidv4(),
            username: 'VoteBot',
            message: `✅ ${username} voted for ${voteOption.label}!`,
            timestamp: new Date(),
            isCommand: false,
          };
          setMessages(prev => [...prev, responseMessage]);
        }
      } else {
        toast.error('Invalid vote option');
      }
    } else if (command === '!help') {
      const helpMessage: KikMessage = {
        id: uuidv4(),
        username: 'VoteBot',
        message: `Available commands: !vote [option], !subscribe, !help. Current vote: ${activeVote?.title || 'None active'}`,
        timestamp: new Date(),
        isCommand: false,
      };
      setMessages(prev => [...prev, helpMessage]);
    } else if (command === '!subscribe') {
      const subMessage: KikMessage = {
        id: uuidv4(),
        username: 'VoteBot',
        message: `${username}, visit our website to subscribe and unlock voting privileges!`,
        timestamp: new Date(),
        isCommand: false,
      };
      setMessages(prev => [...prev, subMessage]);
    }
  };

  const value = {
    messages,
    isConnected,
    sendMessage,
    processCommand,
  };

  return <KikChatContext.Provider value={value}>{children}</KikChatContext.Provider>;
};

export const useKikChat = () => {
  const context = useContext(KikChatContext);
  if (context === undefined) {
    throw new Error('useKikChat must be used within a KikChatProvider');
  }
  return context;
};