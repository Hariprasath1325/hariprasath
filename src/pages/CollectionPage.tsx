import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { characters } from '@/data/characters';
import CharacterCard from '@/components/CharacterCard';

const CollectionPage: React.FC = () => {
  const { favorites, toggleFavorite, isAuthenticated, setShowSignIn } = useApp();

  const favoriteCharacters = characters.filter(c => favorites.includes(c.id));

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-full animate-fade-in">
        <div className="text-center">
          <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your Collection</h2>
          <p className="text-muted-foreground mb-6">Sign in to save your favorite characters</p>
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
      <h1 className="text-2xl lg:text-3xl font-bold mb-6">
        My <span className="text-primary">Collection</span>
      </h1>

      {favoriteCharacters.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteCharacters.map((character) => (
            <div key={character.id} className="relative group">
              <CharacterCard character={character} />
              <button
                onClick={() => toggleFavorite(character.id)}
                className="absolute top-2 right-2 z-20 p-2 bg-black/50 hover:bg-destructive rounded-full opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
          <p className="text-muted-foreground">
            Browse characters and tap the heart icon to add them to your collection
          </p>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
