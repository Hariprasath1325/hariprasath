import React from 'react';
import { Plus, Trash2, Edit, Heart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import CharacterCard from '@/components/CharacterCard';

const MyAIPage: React.FC = () => {
  const { customCharacters, deleteCharacter, navigate, isAuthenticated, setShowSignIn } = useApp();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-full animate-fade-in">
        <div className="text-center">
          <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">My AI</h2>
          <p className="text-muted-foreground mb-6">Sign in to create and manage your AI companions</p>
          <button
            onClick={() => setShowSignIn(true)}
            className="btn-gradient px-8 py-3"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 animate-fade-in">
      <h1 className="text-2xl lg:text-3xl font-bold mb-8">
        My <span className="text-primary">AI</span>
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Create New Card */}
        <button
          onClick={() => navigate('create')}
          className="aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-primary/80 to-primary flex flex-col items-center justify-center gap-4 hover:scale-[1.02] transition-transform"
        >
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <span className="text-lg font-semibold text-white">Create new AI</span>
        </button>

        {/* Custom Characters */}
        {customCharacters.map((character) => (
          <div key={character.id} className="relative group">
            <CharacterCard character={character} showLikes={false} />
            
            {/* Action buttons */}
            <div className="absolute top-2 right-2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => navigate('create')}
                className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteCharacter(character.id)}
                className="p-2 bg-black/50 hover:bg-destructive rounded-full transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {customCharacters.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            You haven't created any AI companions yet. Click "Create new AI" to get started!
          </p>
        </div>
      )}
    </div>
  );
};

export default MyAIPage;
