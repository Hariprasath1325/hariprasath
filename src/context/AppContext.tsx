import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Character } from '@/data/characters';

export type Section = 
  | 'home' 
  | 'discover' 
  | 'chat' 
  | 'collection' 
  | 'generate' 
  | 'create' 
  | 'myai' 
  | 'premium';

export interface User {
  email: string;
  isPremium: boolean;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ChatSession {
  characterId: string;
  messages: Message[];
}

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  showSignIn: boolean;
  showSignUp: boolean;
  
  // Navigation
  currentSection: Section;
  
  // Chat
  activeChat: Character | null;
  chatSessions: Record<string, ChatSession>;
  
  // Collections
  favorites: string[];
  
  // Custom characters
  customCharacters: Character[];
  
  // UI
  sidebarOpen: boolean;
  activeCategory: 'girls' | 'anime' | 'guys';
}

interface AppContextType extends AppState {
  // Auth actions
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  signOut: () => void;
  setShowSignIn: (show: boolean) => void;
  setShowSignUp: (show: boolean) => void;
  
  // Navigation actions
  navigate: (section: Section) => void;
  
  // Chat actions
  openChat: (character: Character) => void;
  closeChat: () => void;
  sendMessage: (content: string) => void;
  
  // Collection actions
  toggleFavorite: (characterId: string) => void;
  isFavorite: (characterId: string) => boolean;
  
  // Custom character actions
  createCharacter: (character: Omit<Character, 'id' | 'likes' | 'isCustom'>) => void;
  deleteCharacter: (characterId: string) => void;
  
  // UI actions
  toggleSidebar: () => void;
  setActiveCategory: (category: 'girls' | 'anime' | 'guys') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    user: null,
    isAuthenticated: false,
    showSignIn: false,
    showSignUp: false,
    currentSection: 'home',
    activeChat: null,
    chatSessions: {},
    favorites: [],
    customCharacters: [],
    sidebarOpen: true,
    activeCategory: 'girls',
  });

  // Auth actions
  const signIn = (email: string, _password: string) => {
    setState(prev => ({
      ...prev,
      user: { email, isPremium: false },
      isAuthenticated: true,
      showSignIn: false,
    }));
  };

  const signUp = (email: string, _password: string) => {
    setState(prev => ({
      ...prev,
      user: { email, isPremium: false },
      isAuthenticated: true,
      showSignUp: false,
    }));
  };

  const signOut = () => {
    setState(prev => ({
      ...prev,
      user: null,
      isAuthenticated: false,
      activeChat: null,
    }));
  };

  const setShowSignIn = (show: boolean) => {
    setState(prev => ({ ...prev, showSignIn: show, showSignUp: false }));
  };

  const setShowSignUp = (show: boolean) => {
    setState(prev => ({ ...prev, showSignUp: show, showSignIn: false }));
  };

  // Navigation
  const navigate = (section: Section) => {
    setState(prev => ({ ...prev, currentSection: section }));
  };

  // Chat actions
  const openChat = (character: Character) => {
    // Check if user is authenticated
    if (!state.isAuthenticated) {
      setState(prev => ({ ...prev, showSignIn: true }));
      return;
    }

    // Initialize chat session if doesn't exist
    if (!state.chatSessions[character.id]) {
      const initialMessage: Message = {
        id: Date.now().toString(),
        content: character.greeting,
        sender: 'ai',
        timestamp: new Date(),
      };

      setState(prev => ({
        ...prev,
        activeChat: character,
        currentSection: 'chat',
        chatSessions: {
          ...prev.chatSessions,
          [character.id]: {
            characterId: character.id,
            messages: [initialMessage],
          },
        },
      }));
    } else {
      setState(prev => ({
        ...prev,
        activeChat: character,
        currentSection: 'chat',
      }));
    }
  };

  const closeChat = () => {
    setState(prev => ({ ...prev, activeChat: null }));
  };

  const sendMessage = (content: string) => {
    if (!state.activeChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      chatSessions: {
        ...prev.chatSessions,
        [prev.activeChat!.id]: {
          ...prev.chatSessions[prev.activeChat!.id],
          messages: [...prev.chatSessions[prev.activeChat!.id].messages, userMessage],
        },
      },
    }));

    // Simulate AI response after delay
    setTimeout(() => {
      const { getRandomResponse } = require('@/data/characters');
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getRandomResponse(),
        sender: 'ai',
        timestamp: new Date(),
      };

      setState(prev => ({
        ...prev,
        chatSessions: {
          ...prev.chatSessions,
          [prev.activeChat!.id]: {
            ...prev.chatSessions[prev.activeChat!.id],
            messages: [...prev.chatSessions[prev.activeChat!.id].messages, aiMessage],
          },
        },
      }));
    }, 1000 + Math.random() * 2000);
  };

  // Collection actions
  const toggleFavorite = (characterId: string) => {
    setState(prev => ({
      ...prev,
      favorites: prev.favorites.includes(characterId)
        ? prev.favorites.filter(id => id !== characterId)
        : [...prev.favorites, characterId],
    }));
  };

  const isFavorite = (characterId: string) => {
    return state.favorites.includes(characterId);
  };

  // Custom character actions
  const createCharacter = (character: Omit<Character, 'id' | 'likes' | 'isCustom'>) => {
    const newCharacter: Character = {
      ...character,
      id: `custom-${Date.now()}`,
      likes: 0,
      isCustom: true,
    };

    setState(prev => ({
      ...prev,
      customCharacters: [...prev.customCharacters, newCharacter],
      currentSection: 'myai',
    }));
  };

  const deleteCharacter = (characterId: string) => {
    setState(prev => ({
      ...prev,
      customCharacters: prev.customCharacters.filter(c => c.id !== characterId),
    }));
  };

  // UI actions
  const toggleSidebar = () => {
    setState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  };

  const setActiveCategory = (category: 'girls' | 'anime' | 'guys') => {
    setState(prev => ({ ...prev, activeCategory: category }));
  };

  const value: AppContextType = {
    ...state,
    signIn,
    signUp,
    signOut,
    setShowSignIn,
    setShowSignUp,
    navigate,
    openChat,
    closeChat,
    sendMessage,
    toggleFavorite,
    isFavorite,
    createCharacter,
    deleteCharacter,
    toggleSidebar,
    setActiveCategory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
