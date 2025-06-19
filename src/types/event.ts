export interface Event {
  id?: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'upcoming' | 'attending' | 'maybe' | 'declined';
  userId: string;
  createdAt: string;
}

export interface EventFilters {
  title: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  status: string;
}