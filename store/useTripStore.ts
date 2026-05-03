import { create } from 'zustand';

export type ViewState = 'chat' | 'form' | 'map' | 'result';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  updatedAt: number;
}

interface TripData {
  destination?: string;
  days?: number;
  budget?: string;
  travelers?: number;
  preferences?: string[];
}

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface TripStore {
  user: User | null;
  setUser: (user: User | null) => void;
  view: ViewState;
  setView: (view: ViewState) => void;
  tripData: TripData;
  setTripData: (data: Partial<TripData>) => void;
  chatHistory: Message[];
  addMessage: (message: Message) => void;
  clearChat: () => void;
  resetState: () => void;
  
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  removeConversation: (id: string) => void;
}

export const useTripStore = create<TripStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  view: 'chat',
  setView: (view) => set({ view }),
  tripData: {},
  setTripData: (data) => set((state) => ({ tripData: { ...state.tripData, ...data } })),
  chatHistory: [],
  addMessage: (message) => set((state) => ({ chatHistory: [...state.chatHistory, message] })),
  clearChat: () => set({ chatHistory: [] }),
  resetState: () => set({ view: 'chat', tripData: {}, chatHistory: [], activeConversationId: null }),
  
  conversations: [],
  setConversations: (conversations) => set({ conversations }),
  activeConversationId: null,
  setActiveConversationId: (activeConversationId) => set({ activeConversationId }),
  removeConversation: (id) => set((state) => ({
    conversations: state.conversations.filter(c => c.id !== id),
    activeConversationId: state.activeConversationId === id ? null : state.activeConversationId,
    chatHistory: state.activeConversationId === id ? [] : state.chatHistory,
  }))
}));
