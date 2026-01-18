import React from 'react';
import { characters } from '@/data/characters';
import { useApp } from '@/context/AppContext';
import CharacterCard from '@/components/CharacterCard';
import { Search, SlidersHorizontal } from 'lucide-react';

const tags = ['All', 'Romantic', 'Friendly', 'Mysterious', 'Playful', 'Caring', 'Bold'];

const DiscoverPage: React.FC = () => {
  const { activeCategory } = useApp();
  const [selectedTag, setSelectedTag] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredCharacters = characters.filter(c => {
    const matchesCategory = c.category === activeCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4 lg:p-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold">
          Discover <span className="text-primary">AI Characters</span>
        </h1>

        {/* Search */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search characters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-dark w-full pl-10"
            />
          </div>
          <button className="p-3 bg-card rounded-xl hover:bg-card-hover transition-colors">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedTag === tag
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-muted-foreground hover:bg-card-hover hover:text-foreground'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCharacters.map((character) => (
          <CharacterCard 
            key={character.id} 
            character={character} 
            variant="discover"
          />
        ))}
      </div>

      {filteredCharacters.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No characters found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DiscoverPage;
