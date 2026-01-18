import React from 'react';
import { AppProvider, useApp } from '@/context/AppContext';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import AuthModal from '@/components/AuthModal';
import HomePage from '@/pages/HomePage';
import DiscoverPage from '@/pages/DiscoverPage';
import ChatPage from '@/pages/ChatPage';
import CollectionPage from '@/pages/CollectionPage';
import GenerateImagePage from '@/pages/GenerateImagePage';
import CreateCharacterPage from '@/pages/CreateCharacterPage';
import MyAIPage from '@/pages/MyAIPage';
import PremiumPage from '@/pages/PremiumPage';

const AppContent: React.FC = () => {
  const { currentSection } = useApp();

  const renderSection = () => {
    switch (currentSection) {
      case 'home': return <HomePage />;
      case 'discover': return <DiscoverPage />;
      case 'chat': return <ChatPage />;
      case 'collection': return <CollectionPage />;
      case 'generate': return <GenerateImagePage />;
      case 'create': return <CreateCharacterPage />;
      case 'myai': return <MyAIPage />;
      case 'premium': return <PremiumPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderSection()}
        </main>
      </div>
      <AuthModal />
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default Index;
