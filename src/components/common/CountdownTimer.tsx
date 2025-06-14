import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  endTime: number;
  onComplete?: () => void;
  className?: string;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const CountdownTimer = ({
  endTime,
  onComplete,
  className = '',
  showLabels = true,
  size = 'md',
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime - Date.now();
      
      if (difference <= 0) {
        setIsCompleted(true);
        if (onComplete) {
          onComplete();
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onComplete]);

  const sizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  const containerSizes = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
  };

  const labelSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const padNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className={`flex items-center justify-center gap-2 md:gap-4 ${className}`}>
      <div className="flex flex-col items-center">
        <motion.div
          className={`
            ${containerSizes[size]} 
            flex items-center justify-center 
            bg-background-navy rounded-lg
          `}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ 
            repeat: Infinity, 
            repeatDelay: 59,
            duration: 1,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        >
          <span className={`font-serif ${sizes[size]} text-primary`}>
            {padNumber(timeLeft.hours)}
          </span>
        </motion.div>
        {showLabels && <span className={`mt-1 text-text-muted ${labelSizes[size]}`}>Hours</span>}
      </div>

      <span className={`${sizes[size]} text-primary`}>:</span>

      <div className="flex flex-col items-center">
        <motion.div
          className={`
            ${containerSizes[size]} 
            flex items-center justify-center 
            bg-background-navy rounded-lg
          `}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ 
            repeat: Infinity, 
            repeatDelay: 59,
            duration: 1,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        >
          <span className={`font-serif ${sizes[size]} text-primary`}>
            {padNumber(timeLeft.minutes)}
          </span>
        </motion.div>
        {showLabels && <span className={`mt-1 text-text-muted ${labelSizes[size]}`}>Minutes</span>}
      </div>

      <span className={`${sizes[size]} text-primary`}>:</span>

      <div className="flex flex-col items-center">
        <motion.div
          className={`
            ${containerSizes[size]} 
            flex items-center justify-center 
            bg-background-navy rounded-lg
          `}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        >
          <span className={`font-serif ${sizes[size]} text-primary`}>
            {padNumber(timeLeft.seconds)}
          </span>
        </motion.div>
        {showLabels && <span className={`mt-1 text-text-muted ${labelSizes[size]}`}>Seconds</span>}
      </div>
    </div>
  );
};

export default CountdownTimer;