import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Event } from '../types/event';

export function useEvents(userId: string | null) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setEvents([]);
      setLoading(false);
      return;
    }

    const eventsQuery = query(
      collection(db, 'events'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(eventsQuery, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Event[];
      
      setEvents(eventsData);
      setLoading(false);
    });

    return unsubscribe;
  }, [userId]);

  const addEvent = async (eventData: Omit<Event, 'id'>) => {
    await addDoc(collection(db, 'events'), eventData);
  };

  const updateEvent = async (id: string, eventData: Partial<Event>) => {
    await updateDoc(doc(db, 'events', id), eventData);
  };

  const deleteEvent = async (id: string) => {
    await deleteDoc(doc(db, 'events', id));
  };

  return {
    events,
    loading,
    addEvent,
    updateEvent,
    deleteEvent
  };
}