import { db } from './firebase';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, orderBy } from 'firebase/firestore';

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  updatedAt: number;
}

export const createConversation = async (userId: string, title: string) => {
  try {
    const docRef = await addDoc(collection(db, 'conversations'), {
      userId,
      title,
      updatedAt: Date.now()
    });
    return docRef.id;
  } catch (e) {
    console.error("Error creating conversation:", e);
    return null;
  }
};

export const deleteConversation = async (conversationId: string) => {
  try {
    await deleteDoc(doc(db, 'conversations', conversationId));
  } catch (e) {
    console.error("Error deleting conversation:", e);
  }
};

export const fetchConversations = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'conversations'), 
      where('userId', '==', userId), 
      orderBy('updatedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Conversation));
  } catch (e) {
    console.error("Error fetching conversations:", e);
    return [];
  }
};
