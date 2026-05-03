import { db } from './firebase';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, orderBy, onSnapshot, updateDoc } from 'firebase/firestore';

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

export const addMessageToDb = async (conversationId: string, message: any) => {
  try {
    await addDoc(collection(db, 'conversations', conversationId, 'messages'), {
      ...message,
      createdAt: Date.now()
    });
  } catch (e) {
    console.error("Error adding message to DB:", e);
  }
};

export const fetchMessagesForConversation = async (conversationId: string) => {
  try {
    const q = query(
      collection(db, 'conversations', conversationId, 'messages'),
      orderBy('createdAt', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error fetching messages:", e);
    return [];
  }
};

export const subscribeToConversations = (userId: string, callback: (convs: Conversation[]) => void) => {
  const q = query(
    collection(db, 'conversations'),
    where('userId', '==', userId),
    orderBy('updatedAt', 'desc')
  );
  return onSnapshot(q, (snapshot) => {
    const convs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Conversation));
    callback(convs);
  });
};

export const updateConversationTimestamp = async (conversationId: string) => {
  try {
    await updateDoc(doc(db, 'conversations', conversationId), {
      updatedAt: Date.now()
    });
  } catch (e) {
    console.error("Error updating timestamp:", e);
  }
};

export const renameConversation = async (conversationId: string, newTitle: string) => {
  try {
    await updateDoc(doc(db, 'conversations', conversationId), {
      title: newTitle,
      updatedAt: Date.now()
    });
  } catch (e) {
    console.error("Error renaming conversation:", e);
  }
};

import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface Attachment {
  name: string;
  url: string;
  type: string;
}

export const uploadFile = async (userId: string, file: File): Promise<Attachment | null> => {
  try {
    const storageRef = ref(storage, `users/${userId}/attachments/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return {
      name: file.name,
      url,
      type: file.type
    };
  } catch (e) {
    console.error("Error uploading file:", e);
    return null;
  }
};
