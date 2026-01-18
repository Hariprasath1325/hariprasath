import React from 'react';
import { 
  Home, 
  Compass, 
  MessageCircle, 
  Image, 
  Sparkles, 
  UserPlus, 
  Heart, 
  Crown,
  Menu,
  HelpCircle,
  Mail,
  ExternalLink
} from 'lucide-react';
import { useApp, Section } from '@/context/AppContext';
import { cn } from '@/lib/utils';

interface NavItem {
  id: Section;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

const mainNavItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
  { id: 'discover', label: 'Discover', icon: <Compass className="w-5 h-5" /> },
  { id: 'chat', label: 'Chat', icon: <MessageCircle className="w-5 h-5" /> },
  { id: 'collection', label: 'Collection', icon: <Image className="w-5 h-5" /> },
  { id: 'generate', label: 'Generate Image', icon: <Sparkles className="w-5 h-5" /> },
  { id: 'create', label: 'Create Character', icon: <UserPlus className="w-5 h-5" /> },
  { id: 'myai', label: 'My AI', icon: <Heart className="w-5 h-5" /> },
];

const Sidebar: React.FC = () => {
  const { currentSection, navigate, sidebarOpen, toggleSidebar } = useApp();

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card hover:bg-card-hover transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen bg-sidebar border-r border-sidebar-border z-40 transition-transform duration-300 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "w-56"
        )}
      >
        {/* Logo */}
        <div className="p-4 flex items-center gap-2">
          <span className="text-xl font-bold">
            candy<span className="text-primary">.ai</span>
          </span>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {mainNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.id);
                if (window.innerWidth < 1024) toggleSidebar();
              }}
              className={cn(
                "nav-item w-full",
                currentSection === item.id && "active"
              )}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}

          {/* Premium Button */}
          <button
            onClick={() => {
              navigate('premium');
              if (window.innerWidth < 1024) toggleSidebar();
            }}
            className={cn(
              "nav-item w-full mt-2",
              "bg-gradient-to-r from-amber-600/20 to-yellow-500/20 hover:from-amber-600/30 hover:to-yellow-500/30",
              currentSection === 'premium' && "ring-1 ring-premium"
            )}
          >
            <Crown className="w-5 h-5 text-premium" />
            <span className="text-sm text-premium font-medium">Premium</span>
            <span className="premium-badge ml-auto text-[10px]">70% OFF</span>
          </button>
        </nav>

        {/* Bottom Links */}
        <div className="p-3 border-t border-sidebar-border space-y-1">
          <button className="nav-item w-full">
            <span className="text-lg">🇺🇸</span>
            <span className="text-sm">English</span>
          </button>
          <button className="nav-item w-full">
            <ExternalLink className="w-5 h-5" />
            <span className="text-sm">Discord</span>
          </button>
          <button className="nav-item w-full">
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm">Help Center</span>
          </button>
          <button className="nav-item w-full">
            <Mail className="w-5 h-5" />
            <span className="text-sm">Contact Us</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
