import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { User } from '../types/user';

export async function createUserDocument(uid: string, email: string, invitedBy?: string) {
  const userData: User = {
    uid,
    email,
    createdAt: new Date().toISOString(),
    ...(invitedBy && { invitedBy })
  };

  await setDoc(doc(db, 'users', uid), userData);
  return userData;
}

export async function getUserDocument(uid: string): Promise<User | null> {
  const userDoc = await getDoc(doc(db, 'users', uid));
  return userDoc.exists() ? userDoc.data() as User : null;
}