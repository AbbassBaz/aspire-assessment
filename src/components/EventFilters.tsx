import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { EventFilters as EventFiltersType } from '../types/event';

interface EventFiltersProps {
  filters: EventFiltersType;
  onFiltersChange: (filters: EventFiltersType) => void;
  onClearFilters: () => void;
}

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'attending', label: 'Attending' },
  { value: 'maybe', label: 'Maybe' },
  { value: 'declined', label: 'Declined' },
];

export function EventFilters({ filters, onFiltersChange, onClearFilters }: EventFiltersProps) {
  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  const handleFilterChange = (key: keyof EventFiltersType, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="ml-auto flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <X className="h-4 w-4" />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title..."
            value={filters.title}
            onChange={(e) => handleFilterChange('title', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="text"
          placeholder="Filter by location..."
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          placeholder="From date"
          value={filters.dateFrom}
          onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          placeholder="To date"
          value={filters.dateTo}
          onChange={(e) => handleFilterChange('dateTo', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}