import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Lock } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { characters } from '@/data/characters';
import { cn } from '@/lib/utils';

type Step = 'character' | 'style' | 'options' | 'result';

const GenerateImagePage: React.FC = () => {
  const { activeCategory, isAuthenticated, setShowSignIn, user } = useApp();
  const [currentStep, setCurrentStep] = useState<Step>('character');
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<'realistic' | 'anime'>('realistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  const filteredCharacters = characters.filter(c => c.category === activeCategory);

  const handleGenerate = () => {
    if (!isAuthenticated) {
      setShowSignIn(true);
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const selected = characters.find(c => c.id === selectedCharacter);
      if (selected) {
        setGeneratedImages([selected.image, selected.image, selected.image]);
      }
      setIsGenerating(false);
      setCurrentStep('result');
    }, 2000);
  };

  const goBack = () => {
    if (currentStep === 'style') setCurrentStep('character');
    else if (currentStep === 'options') setCurrentStep('style');
    else if (currentStep === 'result') setCurrentStep('options');
  };

  const renderCharacterSelection = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2">
          <button className="text-sm text-muted-foreground hover:text-foreground">← Back</button>
        </div>
        
        {/* Category tabs */}
        <div className="flex items-center gap-2 bg-card rounded-full px-2 py-1">
          {['girls', 'anime', 'guys'].map((cat) => (
            <button
              key={cat}
              className={cn(
                "px-4 py-2 rounded-full text-sm capitalize transition-colors",
                activeCategory === cat ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
            >
              {cat === 'girls' ? '♀ Girls' : cat === 'anime' ? '🐱 Anime' : '♂ Guys'}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-semibold">Generate Image</span>
          <span className="text-muted-foreground">Choose character</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCharacters.map((character) => (
          <button
            key={character.id}
            onClick={() => {
              setSelectedCharacter(character.id);
              setCurrentStep('style');
            }}
            className={cn(
              "relative aspect-[3/4] rounded-xl overflow-hidden transition-all",
              selectedCharacter === character.id && "ring-2 ring-primary"
            )}
          >
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-1 rounded-full text-sm">
              {character.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStyleSelection = () => (
    <div className="max-w-4xl mx-auto bg-card rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-center mb-8">Choose Style*</h2>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <button
          onClick={() => setSelectedStyle('realistic')}
          className={cn(
            "relative aspect-[3/4] rounded-xl overflow-hidden transition-all",
            selectedStyle === 'realistic' && "ring-2 ring-primary"
          )}
        >
          <img
            src={characters.find(c => c.category === 'guys' && c.id !== 'hiro')?.image || characters[0].image}
            alt="Realistic"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary px-6 py-2 rounded-full font-medium">
            Realistic
          </span>
        </button>

        <button
          onClick={() => setSelectedStyle('anime')}
          className={cn(
            "relative aspect-[3/4] rounded-xl overflow-hidden transition-all",
            selectedStyle === 'anime' && "ring-2 ring-primary"
          )}
        >
          <img
            src={characters.find(c => c.category === 'anime')?.image || characters[0].image}
            alt="Anime"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full font-medium">
            Anime
          </span>
        </button>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setCurrentStep('options')}
          className="btn-gradient px-8 py-3 flex items-center gap-2"
        >
          Next <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const renderOptions = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center mb-8">
        Customize Your <span className="text-primary">Image</span>
      </h2>

      {/* Premium lock overlay for free users */}
      {!user?.isPremium && (
        <div className="relative bg-card rounded-2xl p-8">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
            <div className="text-center">
              <Lock className="w-12 h-12 text-premium mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Premium Feature</h3>
              <p className="text-muted-foreground mb-4">Upgrade to unlock all customization options</p>
              <button className="btn-gradient-premium px-6 py-2">
                Upgrade Now
              </button>
            </div>
          </div>

          <div className="space-y-4 opacity-50">
            <div className="space-y-2">
              <label className="text-sm font-medium">Setting</label>
              <select className="input-dark w-full" disabled>
                <option>Beach</option>
                <option>City</option>
                <option>Nature</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Pose</label>
              <select className="input-dark w-full" disabled>
                <option>Standing</option>
                <option>Sitting</option>
                <option>Walking</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Outfit</label>
              <select className="input-dark w-full" disabled>
                <option>Casual</option>
                <option>Formal</option>
                <option>Athletic</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-4">
        <button onClick={goBack} className="px-6 py-3 bg-card hover:bg-card-hover rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="btn-gradient px-8 py-3 flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <span className="animate-spin">⏳</span>
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate
            </>
          )}
        </button>
      </div>
    </div>
  );

  const renderResult = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center mb-8">
        Your Generated <span className="text-primary">Images</span>
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {generatedImages.map((img, idx) => (
          <div key={idx} className="aspect-[3/4] rounded-xl overflow-hidden">
            <img src={img} alt={`Generated ${idx + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            setCurrentStep('character');
            setGeneratedImages([]);
          }}
          className="px-6 py-3 bg-card hover:bg-card-hover rounded-xl transition-colors"
        >
          Generate More
        </button>
        <button className="btn-gradient px-8 py-3">
          Download All
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 lg:p-6 animate-fade-in">
      {currentStep === 'character' && renderCharacterSelection()}
      {currentStep === 'style' && renderStyleSelection()}
      {currentStep === 'options' && renderOptions()}
      {currentStep === 'result' && renderResult()}
    </div>
  );
};

export default GenerateImagePage;
