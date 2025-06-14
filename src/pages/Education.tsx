import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Play, Clock, Star, Filter, Search } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { EducationContent } from '../types';

const Education = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'article' | 'video' | 'tutorial'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const educationContent: EducationContent[] = [
    {
      id: '1',
      title: 'Getting Started with VoteStream',
      description: 'Learn the basics of using VoteStream, from creating your account to participating in your first vote.',
      type: 'tutorial',
      content: 'Complete guide to getting started...',
      duration: 10,
      difficulty: 'beginner',
      tags: ['basics', 'getting-started', 'tutorial'],
      publishedAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      title: 'Understanding Voting Mechanics',
      description: 'Deep dive into how voting works, different types of polls, and how results are calculated.',
      type: 'article',
      content: 'Detailed explanation of voting mechanics...',
      difficulty: 'intermediate',
      tags: ['voting', 'mechanics', 'polls'],
      publishedAt: new Date('2024-01-20'),
    },
    {
      id: '3',
      title: 'Chat Commands and Features',
      description: 'Master the chat system with this comprehensive guide to commands and advanced features.',
      type: 'video',
      content: 'Video tutorial on chat features...',
      videoUrl: 'https://example.com/video1',
      duration: 15,
      difficulty: 'intermediate',
      tags: ['chat', 'commands', 'features'],
      publishedAt: new Date('2024-01-25'),
    },
    {
      id: '4',
      title: 'Advanced Voting Strategies',
      description: 'Learn advanced strategies for maximizing your impact in voting and understanding poll dynamics.',
      type: 'article',
      content: 'Advanced strategies for voting...',
      difficulty: 'advanced',
      tags: ['strategy', 'advanced', 'voting'],
      publishedAt: new Date('2024-02-01'),
    },
    {
      id: '5',
      title: 'Prize Draw Optimization',
      description: 'Tips and tricks for maximizing your chances in prize draws and understanding entry mechanics.',
      type: 'tutorial',
      content: 'Guide to prize draw optimization...',
      duration: 20,
      difficulty: 'intermediate',
      tags: ['prizes', 'optimization', 'strategy'],
      publishedAt: new Date('2024-02-05'),
    },
    {
      id: '6',
      title: 'Community Guidelines and Best Practices',
      description: 'Essential reading for all users about community standards and how to be a positive contributor.',
      type: 'article',
      content: 'Community guidelines and best practices...',
      difficulty: 'beginner',
      tags: ['community', 'guidelines', 'best-practices'],
      publishedAt: new Date('2024-02-10'),
    },
    {
      id: '7',
      title: 'Building Your Referral Network',
      description: 'Video guide on effectively using the referral system to grow your network and earn rewards.',
      type: 'video',
      content: 'Video guide on referral system...',
      videoUrl: 'https://example.com/video2',
      duration: 12,
      difficulty: 'beginner',
      tags: ['referrals', 'network', 'rewards'],
      publishedAt: new Date('2024-02-15'),
    },
    {
      id: '8',
      title: 'Platform Analytics and Insights',
      description: 'Advanced tutorial on understanding platform analytics and using data to improve your participation.',
      type: 'tutorial',
      content: 'Advanced analytics tutorial...',
      duration: 25,
      difficulty: 'advanced',
      tags: ['analytics', 'data', 'insights'],
      publishedAt: new Date('2024-02-20'),
    },
  ];

  const filteredContent = educationContent.filter(content => {
    const matchesType = selectedType === 'all' || content.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'all' || content.difficulty === selectedDifficulty;
    const matchesSearch = searchTerm === '' || 
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesType && matchesDifficulty && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'tutorial':
        return <Star className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'badge-success';
      case 'intermediate':
        return 'badge-warning';
      case 'advanced':
        return 'badge-error';
      default:
        return 'badge-info';
    }
  };

  const handleContentClick = (content: EducationContent) => {
    console.log('Opening content:', content.title);
    // In a real app, this would open the content in a modal or navigate to a detail page
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Education Center</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn everything you need to know about VoteStream. From basic tutorials 
          to advanced strategies, we've got you covered.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
        <Card className="text-center">
          <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">
            {educationContent.filter(c => c.type === 'article').length}
          </h3>
          <p className="text-gray-600">Articles</p>
        </Card>
        
        <Card className="text-center">
          <Play className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">
            {educationContent.filter(c => c.type === 'video').length}
          </h3>
          <p className="text-gray-600">Videos</p>
        </Card>
        
        <Card className="text-center">
          <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">
            {educationContent.filter(c => c.type === 'tutorial').length}
          </h3>
          <p className="text-gray-600">Tutorials</p>
        </Card>
        
        <Card className="text-center">
          <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-gray-900">
            {educationContent.reduce((total, content) => total + (content.duration || 5), 0)}
          </h3>
          <p className="text-gray-600">Total Minutes</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="input w-auto"
            >
              <option value="all">All Types</option>
              <option value="article">Articles</option>
              <option value="video">Videos</option>
              <option value="tutorial">Tutorials</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
              className="input w-auto"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((content, index) => (
          <motion.div
            key={content.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="h-full flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleContentClick(content)}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <span className="badge badge-info flex items-center space-x-1">
                    {getTypeIcon(content.type)}
                    <span className="capitalize">{content.type}</span>
                  </span>
                  <span className={`badge ${getDifficultyColor(content.difficulty)}`}>
                    {content.difficulty}
                  </span>
                </div>
                {content.duration && (
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{content.duration}m</span>
                  </div>
                )}
              </div>

              {/* Title and Description */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{content.title}</h3>
              <p className="text-gray-600 text-sm mb-4 flex-grow">{content.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {content.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
                {content.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{content.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{content.publishedAt.toLocaleDateString()}</span>
                <Button variant="outline" size="sm">
                  {content.type === 'video' ? 'Watch' : 'Read'}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredContent.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No content found</h3>
          <p className="text-gray-600">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
        </motion.div>
      )}

      {/* Learning Path Suggestion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="text-center">
            <Star className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Suggested Learning Path
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              New to VoteStream? Follow our recommended learning path to get the most out of the platform.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="badge badge-info">1. Getting Started</span>
              <span className="text-gray-400">→</span>
              <span className="badge badge-info">2. Voting Basics</span>
              <span className="text-gray-400">→</span>
              <span className="badge badge-info">3. Chat Features</span>
              <span className="text-gray-400">→</span>
              <span className="badge badge-info">4. Advanced Strategies</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Education;