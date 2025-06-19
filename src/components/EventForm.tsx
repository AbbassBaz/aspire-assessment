import React, { useState, useEffect } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { Event } from '../types/event';
import { summarizeText } from '../lib/openai';
import { format } from 'date-fns';

interface EventFormProps {
  event?: Event;
  onSubmit: (eventData: Omit<Event, 'id'>) => Promise<void>;
  onClose: () => void;
  userId: string;
}

const statusOptions = [
  { value: 'upcoming', label: 'Upcoming', color: 'bg-blue-100 text-blue-800' },
  { value: 'attending', label: 'Attending', color: 'bg-green-100 text-green-800' },
  { value: 'maybe', label: 'Maybe', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'declined', label: 'Declined', color: 'bg-red-100 text-red-800' },
];

export function EventForm({ event, onSubmit, onClose, userId }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    date: event?.date || format(new Date(), 'yyyy-MM-dd'),
    time: event?.time || '09:00',
    location: event?.location || '',
    description: event?.description || '',
    status: event?.status || 'upcoming' as const,
  });
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        userId,
        createdAt: event?.createdAt || new Date().toISOString(),
      });
      onClose();
    } catch (error) {
      console.error('Error saving event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAISummarize = async () => {
    if (!formData.description.trim()) return;
    
    setAiLoading(true);
    try {
      const summarized = await summarizeText(formData.description);
      setFormData(prev => ({ ...prev, description: summarized }));
    } catch (error) {
      console.error('AI summarization failed:', error);
      alert('Failed to summarize with AI. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {event ? 'Edit Event' : 'Create New Event'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Event Title *
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter event title"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.date ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                Time *
              </label>
              <input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.time ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.location ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter event location"
              />
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <button
                  type="button"
                  onClick={handleAISummarize}
                  disabled={!formData.description.trim() || aiLoading}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white rounded-lg transition-colors"
                >
                  {aiLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {aiLoading ? 'Summarizing...' : 'Summarize with AI'}
                </button>
              </div>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter event description"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Status
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {statusOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.status === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={option.value}
                      checked={formData.status === option.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                      className="sr-only"
                    />
                    <span className={`text-xs font-medium px-2 py-1 rounded ${option.color}`}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
            >
              {loading ? 'Saving...' : (event ? 'Update Event' : 'Create Event')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}