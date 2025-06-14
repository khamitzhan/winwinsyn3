import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import { useDraw } from '../../context/DrawContext';
import CountdownTimer from '../../components/common/CountdownTimer';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import RecentWinners from './RecentWinners';
import LivePlayerCount from './LivePlayerCount';
import { ChevronRight, TrendingUp, Award, Target, Users, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { balance, tickets, level, experience, achievements } = useUser();
  const { currentDraw, livePlayerCount } = useDraw();
  
  // Calculate next level requirements (dummy calculation)
  const nextLevelExp = 1000;
  const currentLevelExp = 450;
  const expPercentage = (experience / nextLevelExp) * 100;
  
  // Calculate completed achievements
  const completedAchievements = achievements.filter(a => a.completed).length;
  const totalAchievements = achievements.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-primary mb-2">
                Welcome to Win-Win Syndicate
              </h1>
              <p className="text-text-muted">
                Join over {(livePlayerCount + 2500).toLocaleString()} players in the next draw
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/deposit">
                <Button variant="primary" size="lg" icon={<Wallet size={20} />}>
                  Deposit Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - User stats and next draw */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="flex flex-col items-center text-center p-4">
                  <Wallet className="h-8 w-8 text-primary mb-2" />
                  <span className="text-text-muted text-sm">Balance</span>
                  <span className="text-2xl font-serif text-primary">${balance}</span>
                </Card>
                
                <Card className="flex flex-col items-center text-center p-4">
                  <Award className="h-8 w-8 text-primary mb-2" />
                  <span className="text-text-muted text-sm">Tickets</span>
                  <span className="text-2xl font-serif text-primary">{tickets}</span>
                </Card>
                
                <Card className="flex flex-col items-center text-center p-4">
                  <TrendingUp className="h-8 w-8 text-primary mb-2" />
                  <span className="text-text-muted text-sm">Level</span>
                  <span className="text-2xl font-serif text-primary">{level}</span>
                  <div className="w-full mt-2 bg-background-navy rounded-full h-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full"
                      style={{ width: `${expPercentage}%` }}
                    ></div>
                  </div>
                </Card>
                
                <Card className="flex flex-col items-center text-center p-4">
                  <Target className="h-8 w-8 text-primary mb-2" />
                  <span className="text-text-muted text-sm">Achievements</span>
                  <span className="text-2xl font-serif text-primary">
                    {completedAchievements}/{totalAchievements}
                  </span>
                </Card>
              </div>
              
              {/* Next draw */}
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-serif text-primary mb-4">Next Prize Draw</h2>
                  
                  <div className="flex flex-col md:flex-row justify-between mb-6">
                    <div>
                      <span className="text-text-muted block mb-1">Prize Pool</span>
                      <span className="text-4xl font-serif text-primary">
                        ${currentDraw.prizePool.toLocaleString()}
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-text-muted block mb-1">Ends in</span>
                      <CountdownTimer endTime={currentDraw.endTime} size="md" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
                    <div className="text-center sm:text-left">
                      <span className="text-text-muted">
                        {currentDraw.ticketsEntered.toLocaleString()} tickets entered
                      </span>
                      <div className="w-full sm:w-64 mt-2 bg-background-navy rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${Math.min(100, (currentDraw.ticketsEntered / 1000) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <Link to="/draws">
                      <Button
                        variant="primary"
                        icon={<ChevronRight size={18} />}
                        iconPosition="right"
                      >
                        View Draw
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
              
              {/* Recent winners carousel */}
              <RecentWinners />
            </div>
            
            {/* Right column - Live data and challenges */}
            <div className="space-y-6">
              {/* Live player count */}
              <LivePlayerCount count={livePlayerCount} />
              
              {/* Quick challenges */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-serif text-text">Daily Challenges</h3>
                  <Link to="/challenges" className="text-primary text-sm flex items-center">
                    View All
                    <ChevronRight size={16} />
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {achievements.slice(0, 3).map(achievement => (
                    <div key={achievement.id} className="border-b border-background-navy pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{achievement.title}</span>
                        <span className="text-sm text-text-muted">
                          {achievement.completed ? (
                            <span className="text-success">Completed</span>
                          ) : (
                            <span>
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          )}
                        </span>
                      </div>
                      <p className="text-text-muted text-sm mb-2">{achievement.description}</p>
                      <div className="w-full bg-background-navy rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            achievement.completed ? 'bg-success' : 'bg-primary'
                          }`}
                          style={{
                            width: `${Math.min(
                              100,
                              (achievement.progress / achievement.maxProgress) * 100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Link to="/challenges">
                    <Button variant="outline" size="sm">
                      View All Challenges
                    </Button>
                  </Link>
                </div>
              </Card>
              
              {/* Referral quick access */}
              <Card className="bg-gradient-to-br from-background-light to-background-navy border-none">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-primary mr-2" />
                  <h3 className="text-xl font-serif text-text">Refer & Earn</h3>
                </div>
                
                <p className="text-text-muted mb-4">
                  Invite friends to Win-Win Syndicate and earn 10% of their deposits as bonus tickets!
                </p>
                
                <Link to="/referral">
                  <Button variant="primary" fullWidth>
                    Start Referring
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default Dashboard;