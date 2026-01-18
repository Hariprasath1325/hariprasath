import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { characters, heroBannerImage } from '@/data/characters';
import { useApp } from '@/context/AppContext';
import CharacterCard from '@/components/CharacterCard';

const heroSlides = [
  {
    id: 1,
    title: 'IMAGE GENERATOR',
    subtitle: 'Create the perfect image in seconds',
    description: 'Choose your setting, poses, and actions',
    cta: 'GENERATE NOW',
    image: heroBannerImage,
  },
  {
    id: 2,
    title: 'AI COMPANIONS',
    subtitle: 'Meet your perfect match',
    description: 'Intelligent, caring, and always there for you',
    cta: 'EXPLORE NOW',
    image: heroBannerImage,
  },
  {
    id: 3,
    title: 'CREATE YOUR AI',
    subtitle: 'Design your dream companion',
    description: 'Customize personality, appearance, and more',
    cta: 'CREATE NOW',
    image: heroBannerImage,
  },
];

const HomePage: React.FC = () => {
  const { activeCategory, navigate } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const filteredCharacters = characters.filter(c => c.category === activeCategory);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case 'girls': return 'AI Girlfriend';
      case 'guys': return 'AI Boyfriend';
      case 'anime': return 'Anime';
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-8 animate-fade-in">
      {/* Hero Carousel */}
      <div className="relative hero-slide group">
        {/* Background image */}
        <img
          src={heroSlides[currentSlide].image}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-between px-6 lg:px-12">
          <div className="max-w-lg">
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 italic">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-2">
              {heroSlides[currentSlide].subtitle}
            </p>
            <p className="text-white/70 mb-6">
              {heroSlides[currentSlide].description}
            </p>
            <button
              onClick={() => navigate('generate')}
              className="btn-gradient px-8 py-3 text-lg font-bold flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              {heroSlides[currentSlide].cta}
            </button>
          </div>

          {/* Right side - Character circle */}
          <div className="hidden lg:block">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <img
                src={filteredCharacters[0]?.image || characters[0].image}
                alt="Featured"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentSlide ? 'w-6 bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Character Section */}
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold mb-6">
          <span className="text-primary">{getCategoryTitle()}</span>{' '}
          Characters
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
