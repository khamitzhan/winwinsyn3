import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showLabel?: boolean;
  labelFormat?: 'percentage' | 'fraction' | 'value';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  height?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

const ProgressBar = ({
  value,
  max,
  className = '',
  showLabel = true,
  labelFormat = 'percentage',
  color = 'primary',
  height = 'md',
  animate = true,
}: ProgressBarProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    if (animate) {
      // Start from current display value and animate to new value
      const duration = 1000; // 1 second
      const increment = (value - displayValue) / (duration / 16); // 60fps approx
      const start = displayValue;
      const startTime = Date.now();
      
      const animateValue = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        
        if (elapsed < duration) {
          setDisplayValue(start + increment * elapsed);
          requestAnimationFrame(animateValue);
        } else {
          setDisplayValue(value);
        }
      };
      
      requestAnimationFrame(animateValue);
    } else {
      setDisplayValue(value);
    }
  }, [value, animate, displayValue]);
  
  const percentage = Math.min(100, Math.max(0, (displayValue / max) * 100));
  
  const heightClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  };
  
  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
  };
  
  const getLabel = () => {
    switch (labelFormat) {
      case 'percentage':
        return `${Math.round(percentage)}%`;
      case 'fraction':
        return `${value}/${max}`;
      case 'value':
        return `${value}`;
      default:
        return `${Math.round(percentage)}%`;
    }
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-1">
        {showLabel && (
          <span className="text-sm text-text-muted">{getLabel()}</span>
        )}
      </div>
      <div className={`w-full ${heightClasses[height]} bg-background-navy rounded-full overflow-hidden`}>
        <motion.div
          className={`${heightClasses[height]} ${colorClasses[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animate ? 0.8 : 0, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;