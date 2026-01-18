import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { Character } from '@/data/characters';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

interface CharacterCardProps {
  character: Character;
  variant?: 'default' | 'large' | 'discover';
  showLikes?: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ 
  character, 
  variant = 'default',
  showLikes = true 
}) => {
  const { openChat, toggleFavorite, isFavorite } = useApp();
  const favorite = isFavorite(character.id);

  return (
    <div
      className={cn(
        "card-character group",
        variant === 'large' && "aspect-[3/4]",
        variant === 'discover' && "aspect-[3/4]",
        variant === 'default' && "aspect-[3/4]"
      )}
    >
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-full object-cover"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-4">
        {/* Character info */}
        <div className="flex items-center gap-2 mb-2">
          <img
            src={character.image}
            alt={character.name}
            className="w-8 h-8 rounded-full object-cover border-2 border-white/20"
          />
          <span className="font-semibold text-white">{character.name}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openChat(character);
            }}
            className="ml-auto bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors flex items-center gap-1"
          >
            <MessageCircle className="w-3 h-3" />
            Chat Now
          </button>
        </div>

        {/* Likes */}
        {showLikes && (
          <div className="absolute top-4 right-4 flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(character.id);
              }}
              className="text-white/80 hover:text-primary transition-colors"
            >
              <Heart className={cn("w-5 h-5", favorite && "fill-primary text-primary")} />
            </button>
            <span className="text-white/80 text-sm">
              {character.likes + (favorite ? 1 : 0)}
            </span>
          </div>
        )}
      </div>

      {/* Click handler for whole card */}
      <button
        onClick={() => openChat(character)}
        className="absolute inset-0 z-0"
        aria-label={`Chat with ${character.name}`}
      />
    </div>
  );
};

export default CharacterCard;
