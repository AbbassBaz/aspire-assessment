import React from 'react';
import { Calendar, Clock, MapPin, Edit2, Trash2 } from 'lucide-react';
import { Event } from '../types/event';
import { format, parseISO } from 'date-fns';

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const statusStyles = {
  upcoming: 'bg-blue-100 text-blue-800',
  attending: 'bg-green-100 text-green-800',
  maybe: 'bg-yellow-100 text-yellow-800',
  declined: 'bg-red-100 text-red-800',
};

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  const eventDate = parseISO(event.date);
  const formattedDate = format(eventDate, 'MMM dd, yyyy');
  const formattedTime = format(parseISO(`2000-01-01T${event.time}`), 'h:mm a');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
            statusStyles[event.status]
          }`}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(event)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit event"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(event.id!)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete event"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{formattedTime}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{event.location}</span>
        </div>
      </div>

      {event.description && (
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
          {event.description}
        </p>
      )}
    </div>
  );
}