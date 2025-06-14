import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import Card from '../../components/common/Card';
import { useDraw } from '../../context/DrawContext';

const RecentWinners = () => {
  const { pastDraws } = useDraw();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  // Auto rotate winners every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex(prevIndex => (prevIndex + 1) % pastDraws.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [pastDraws.length]);
  
  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex(prevIndex => (prevIndex - 1 + pastDraws.length) % pastDraws.length);
  };
  
  const goToNext = () => {
    setDirection(1);
    setCurrentIndex(prevIndex => (prevIndex + 1) % pastDraws.length);
  };
  
  // Format timestamp to readable date/time
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // No winners to display
  if (pastDraws.length === 0) {
    return null;
  }
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -200 : 200,
      opacity: 0,
    }),
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-serif text-primary flex items-center">
          <Trophy className="mr-2 h-5 w-5" />
          Recent Winners
        </h3>
        
        <div className="flex space-x-2">
          <button
            onClick={goToPrevious}
            className="p-1 rounded-full bg-background-navy text-text-muted hover:text-primary transition-colors"
            aria-label="Previous winner"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            className="p-1 rounded-full bg-background-navy text-text-muted hover:text-primary transition-colors"
            aria-label="Next winner"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="relative h-32 overflow-hidden">
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {pastDraws[currentIndex]?.winner && (
              <div className="flex flex-col sm:flex-row items-center justify-between h-full p-4 bg-background-navy/30 rounded-lg">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                  <span className="block text-text-muted text-sm">Winner</span>
                  <span className="text-2xl font-serif text-primary">
                    {pastDraws[currentIndex].winner?.username}
                  </span>
                  <span className="block text-text-muted text-sm mt-1">
                    Ticket #{pastDraws[currentIndex].winner?.ticketNumber}
                  </span>
                </div>
                
                <div className="text-center">
                  <span className="block text-text-muted text-sm">Prize Amount</span>
                  <span className="text-2xl font-serif text-primary">
                    ${pastDraws[currentIndex].winner?.prize.toLocaleString()}
                  </span>
                  <span className="block text-text-muted text-sm mt-1">
                    {formatTimestamp(pastDraws[currentIndex].winner?.timestamp || 0)}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="flex justify-center mt-4">
        {pastDraws.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2 w-2 mx-1 rounded-full ${
              index === currentIndex ? 'bg-primary' : 'bg-background-navy'
            }`}
            aria-label={`Go to winner ${index + 1}`}
          />
        ))}
      </div>
    </Card>
  );
};

export default RecentWinners;