import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const CreateCharacterPage: React.FC = () => {
  const { createCharacter, isAuthenticated, setShowSignIn, navigate } = useApp();
  const [name, setName] = useState('');
  const [personality, setPersonality] = useState('');
  const [description, setDescription] = useState('');
  const [greeting, setGreeting] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState<'girls' | 'guys' | 'anime'>('girls');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setShowSignIn(true);
      return;
    }

    if (!name || !personality || !description || !greeting) {
      return;
    }

    createCharacter({
      name,
      personality,
      description,
      greeting,
      image: imagePreview || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop',
      category,
    });

    // Reset form
    setName('');
    setPersonality('');
    setDescription('');
    setGreeting('');
    setImagePreview(null);
  };

  return (
    <div className="p-4 lg:p-6 animate-fade-in">
      <h1 className="text-2xl lg:text-3xl font-bold mb-8">
        Create <span className="text-primary">Character</span>
      </h1>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="flex justify-center">
            <label className="relative cursor-pointer group">
              <div className="w-48 h-64 rounded-xl overflow-hidden bg-card border-2 border-dashed border-border hover:border-primary transition-colors flex items-center justify-center">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Upload Image</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <div className="flex gap-2">
              {(['girls', 'guys', 'anime'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    category === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card hover:bg-card-hover'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Character Name*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter character name"
              className="input-dark w-full"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description*</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of your character"
              className="input-dark w-full"
              required
            />
          </div>

          {/* Personality */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Personality*</label>
            <textarea
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              placeholder="Describe the personality traits (e.g., friendly, mysterious, caring...)"
              className="input-dark w-full min-h-[100px] resize-none"
              required
            />
          </div>

          {/* Greeting */}
          <div className="space-y-2">
            <label className="text-sm font-medium">First Message*</label>
            <textarea
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              placeholder="What will your character say when you first meet them?"
              className="input-dark w-full min-h-[80px] resize-none"
              required
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn-gradient w-full py-4 text-lg font-semibold">
            Create Character
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCharacterPage;
