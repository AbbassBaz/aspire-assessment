import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot,
  addDoc,
  updateDoc,
  doc,
  getDocs
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { InvitedUser } from '../types/user';

export function useInvitations(userId: string | null) {
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setInvitedUsers([]);
      setLoading(false);
      return;
    }

    const invitationsQuery = query(
      collection(db, 'invitations'),
      where('invitedBy', '==', userId)
    );

    const unsubscribe = onSnapshot(invitationsQuery, (snapshot) => {
      const invitationsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as (InvitedUser & { id: string })[];
      
      setInvitedUsers(invitationsData);
      setLoading(false);
    });

    return unsubscribe;
  }, [userId]);

  const addInvitation = async (email: string, invitedBy: string) => {
    // Check if invitation already exists
    const existingQuery = query(
      collection(db, 'invitations'),
      where('email', '==', email),
      where('invitedBy', '==', invitedBy)
    );
    
    const existingDocs = await getDocs(existingQuery);
    
    if (existingDocs.empty) {
      await addDoc(collection(db, 'invitations'), {
        email,
        invitedBy,
        invitedAt: new Date().toISOString(),
        hasSignedUp: false
      });
    }
  };

  const markAsSignedUp = async (email: string, uid: string) => {
    const invitationQuery = query(
      collection(db, 'invitations'),
      where('email', '==', email)
    );
    
    const snapshot = await getDocs(invitationQuery);
    
    snapshot.forEach(async (docSnapshot) => {
      await updateDoc(doc(db, 'invitations', docSnapshot.id), {
        hasSignedUp: true,
        uid
      });
    });
  };

  return {
    invitedUsers,
    loading,
    addInvitation,
    markAsSignedUp
  };
}