import React, { useState, useMemo } from 'react';
import { User } from 'firebase/auth';
import { useEvents } from '../hooks/useEvents';
import { Header } from './Header';
import { EventFilters } from './EventFilters';
import { EventCard } from './EventCard';
import { EventForm } from './EventForm';
import { LoadingSpinner } from './LoadingSpinner';
import { Event, EventFilters as EventFiltersType } from '../types/event';
import { CalendarX } from 'lucide-react';

interface DashboardProps {
  user: User;
}

export function Dashboard({ user }: DashboardProps) {
  const { events, loading, addEvent, updateEvent, deleteEvent } = useEvents(user.uid);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [filters, setFilters] = useState<EventFiltersType>({
    title: '',
    location: '',
    dateFrom: '',
    dateTo: '',
    status: '',
  });

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      if (filters.title && !event.title.toLowerCase().includes(filters.title.toLowerCase())) {
        return false;
      }
      if (filters.location && !event.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      if (filters.status && event.status !== filters.status) {
        return false;
      }
      if (filters.dateFrom && event.date < filters.dateFrom) {
        return false;
      }
      if (filters.dateTo && event.date > filters.dateTo) {
        return false;
      }
      return true;
    });
  }, [events, filters]);

  const handleCreateEvent = () => {
    setEditingEvent(null);
    setShowEventForm(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setShowEventForm(true);
  };

  const handleSubmitEvent = async (eventData: Omit<Event, 'id'>) => {
    if (editingEvent) {
      await updateEvent(editingEvent.id!, eventData);
    } else {
      await addEvent(eventData);
    }
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await deleteEvent(id);
    }
  };

  const clearFilters = () => {
    setFilters({
      title: '',
      location: '',
      dateFrom: '',
      dateTo: '',
      status: '',
    });
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading your events..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        userEmail={user.email!}
        userId={user.uid}
        onCreateEvent={handleCreateEvent}
        eventCount={events.length}
      />

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <EventFilters
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={clearFilters}
        />

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <CalendarX className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {events.length === 0 ? 'No events yet' : 'No events match your filters'}
            </h3>
            <p className="text-gray-600 mb-6">
              {events.length === 0 
                ? 'Create your first event to get started organizing your schedule.'
                : 'Try adjusting your filters or clear them to see more events.'
              }
            </p>
            {events.length === 0 && (
              <button
                onClick={handleCreateEvent}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Create Your First Event
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
              />
            ))}
          </div>
        )}
      </div>

      {showEventForm && (
        <EventForm
          event={editingEvent || undefined}
          onSubmit={handleSubmitEvent}
          onClose={() => {
            setShowEventForm(false);
            setEditingEvent(null);
          }}
          userId={user.uid}
        />
      )}
    </div>
  );
}