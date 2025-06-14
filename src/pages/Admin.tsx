import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, BarChart3, Users, Settings } from 'lucide-react';
import { useVoting } from '../contexts/VotingContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Modal from '../components/common/Modal';
import VotePanel from '../components/voting/VotePanel';
import { Vote, VoteOption } from '../types';
import { v4 as uuidv4 } from 'uuid';

const Admin = () => {
  const { votes, createVote, closeVote, deleteVote } = useVoting();
  const { user } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedVote, setSelectedVote] = useState<Vote | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const [newVote, setNewVote] = useState({
    title: '',
    description: '',
    category: '',
    options: [
      { label: '', color: '#6366f1' },
      { label: '', color: '#f59e0b' },
    ],
    duration: 30,
    requiresSubscription: false,
    allowMultiple: false,
  });

  const handleCreateVote = () => {
    if (!newVote.title || !newVote.description || newVote.options.some(opt => !opt.label)) {
      return;
    }

    const voteOptions: VoteOption[] = newVote.options.map(opt => ({
      id: uuidv4(),
      label: opt.label,
      votes: 0,
      color: opt.color,
    }));

    const vote: Omit<Vote, 'id' | 'createdAt' | 'totalVotes'> = {
      title: newVote.title,
      description: newVote.description,
      category: newVote.category || 'General',
      options: voteOptions,
      isActive: true,
      endsAt: new Date(Date.now() + newVote.duration * 1000),
      createdBy: user?.id || '',
      allowMultiple: newVote.allowMultiple,
      requiresSubscription: newVote.requiresSubscription,
    };

    createVote(vote);
    setIsCreateModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewVote({
      title: '',
      description: '',
      category: '',
      options: [
        { label: '', color: '#6366f1' },
        { label: '', color: '#f59e0b' },
      ],
      duration: 30,
      requiresSubscription: false,
      allowMultiple: false,
    });
  };

  const addOption = () => {
    if (newVote.options.length < 4) {
      const colors = ['#6366f1', '#f59e0b', '#10b981', '#ef4444'];
      setNewVote({
        ...newVote,
        options: [
          ...newVote.options,
          { label: '', color: colors[newVote.options.length] },
        ],
      });
    }
  };

  const removeOption = (index: number) => {
    if (newVote.options.length > 2) {
      setNewVote({
        ...newVote,
        options: newVote.options.filter((_, i) => i !== index),
      });
    }
  };

  const updateOption = (index: number, field: 'label' | 'color', value: string) => {
    const updatedOptions = [...newVote.options];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    setNewVote({ ...newVote, options: updatedOptions });
  };

  const previewVote = (vote: Vote) => {
    setSelectedVote(vote);
    setIsPreviewModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600">Manage votes, users, and platform settings</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsCreateModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Create Vote
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{votes.length}</h3>
              <p className="text-gray-600">Total Votes</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">1,234</h3>
              <p className="text-gray-600">Active Users</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full mr-4">
              <Settings className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{votes.filter(v => v.isActive).length}</h3>
              <p className="text-gray-600">Active Votes</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Votes Management */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Manage Votes</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Title</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Votes</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {votes.map((vote) => (
                <tr key={vote.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{vote.title}</h4>
                      <p className="text-sm text-gray-600 truncate max-w-xs">{vote.description}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="badge badge-info">{vote.category}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`badge ${vote.isActive ? 'badge-success' : 'badge-error'}`}>
                      {vote.isActive ? 'Active' : 'Closed'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium">{vote.totalVotes}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => previewVote(vote)}
                        icon={<Edit className="w-3 h-3" />}
                      />
                      {vote.isActive && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => closeVote(vote.id)}
                        >
                          Close
                        </Button>
                      )}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteVote(vote.id)}
                        icon={<Trash2 className="w-3 h-3" />}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Vote Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          resetForm();
        }}
        title="Create New Vote"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={newVote.title}
                onChange={(e) => setNewVote({ ...newVote, title: e.target.value })}
                className="input"
                placeholder="Enter vote title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                value={newVote.category}
                onChange={(e) => setNewVote({ ...newVote, category: e.target.value })}
                className="input"
                placeholder="e.g., Mystery Box, Game Mode"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={newVote.description}
              onChange={(e) => setNewVote({ ...newVote, description: e.target.value })}
              className="input"
              rows={3}
              placeholder="Describe what users are voting for"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Vote Options
              </label>
              {newVote.options.length < 4 && (
                <Button variant="outline" size="sm" onClick={addOption}>
                  Add Option
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {newVote.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={option.label}
                    onChange={(e) => updateOption(index, 'label', e.target.value)}
                    className="input flex-1"
                    placeholder={`Option ${index + 1}`}
                  />
                  <input
                    type="color"
                    value={option.color}
                    onChange={(e) => updateOption(index, 'color', e.target.value)}
                    className="w-12 h-10 rounded border border-gray-300"
                  />
                  {newVote.options.length > 2 && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeOption(index)}
                      icon={<Trash2 className="w-3 h-3" />}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (seconds)
              </label>
              <input
                type="number"
                value={newVote.duration}
                onChange={(e) => setNewVote({ ...newVote, duration: parseInt(e.target.value) })}
                className="input"
                min="10"
                max="3600"
              />
            </div>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newVote.requiresSubscription}
                  onChange={(e) => setNewVote({ ...newVote, requiresSubscription: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Requires subscription</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newVote.allowMultiple}
                  onChange={(e) => setNewVote({ ...newVote, allowMultiple: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Allow multiple votes</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsCreateModalOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateVote}>
              Create Vote
            </Button>
          </div>
        </div>
      </Modal>

      {/* Preview Vote Modal */}
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        title="Vote Preview"
        size="lg"
      >
        {selectedVote && (
          <VotePanel vote={selectedVote} showResults={true} />
        )}
      </Modal>
    </motion.div>
  );
};

export default Admin;