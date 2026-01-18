import React from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface CategoryTab {
  id: 'girls' | 'anime' | 'guys';
  label: string;
  icon: string;
}

const categories: CategoryTab[] = [
  { id: 'girls', label: 'Girls', icon: '♀' },
  { id: 'anime', label: 'Anime', icon: '🐱' },
  { id: 'guys', label: 'Guys', icon: '♂' },
];

const Header: React.FC = () => {
  const { 
    isAuthenticated, 
    setShowSignIn, 
    setShowSignUp, 
    activeCategory, 
    setActiveCategory,
    toggleSidebar,
    signOut,
    user,
    currentSection
  } = useApp();

  const showCategoryTabs = currentSection === 'home' || currentSection === 'discover';

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Mobile menu */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-card transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Center - Category Tabs */}
        {showCategoryTabs && (
          <div className="hidden sm:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Right side - Auth buttons */}
        <div className="flex items-center gap-3 ml-auto">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={signOut}
                className="border-border hover:bg-card"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Button
                onClick={() => setShowSignUp(true)}
                className="btn-gradient px-6 py-2 text-sm"
              >
                Create Free Account
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSignIn(true)}
                className="border-primary text-primary hover:bg-primary/10"
              >
                Login
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Category Tabs */}
      {showCategoryTabs && (
        <div className="flex sm:hidden items-center justify-center gap-4 px-4 pb-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
