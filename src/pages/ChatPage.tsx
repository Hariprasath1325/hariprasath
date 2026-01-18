import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Image, Mic, ChevronLeft, ChevronRight, Search, Settings } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { characters } from '@/data/characters';
import { cn } from '@/lib/utils';

const ChatPage: React.FC = () => {
  const { activeChat, chatSessions, sendMessage, openChat, navigate, isAuthenticated, setShowSignIn } = useApp();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const session = activeChat ? chatSessions[activeChat.id] : null;
  const messages = session?.messages || [];

  // Filter characters for chat list
  const chatCharacters = characters.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    sendMessage(inputValue.trim());
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = [
    "Hey! What's your favorite way to relax after a long day?",
    "Tell me something interesting about yourself!",
    "What are you thinking about right now?",
  ];

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-full animate-fade-in">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Sign in to Chat</h2>
          <p className="text-muted-foreground mb-6">Create an account to start chatting with AI companions</p>
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
    <div className="flex h-[calc(100vh-80px)] animate-fade-in">
      {/* Chat List Sidebar */}
      <div className="w-72 border-r border-border flex-shrink-0 flex flex-col bg-card/50 hidden md:flex">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-bold mb-4">Chat</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for a profile..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-dark w-full pl-10 py-2 text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chatCharacters.map((character) => (
            <button
              key={character.id}
              onClick={() => openChat(character)}
              className={cn(
                "w-full flex items-center gap-3 p-4 hover:bg-card-hover transition-colors text-left",
                activeChat?.id === character.id && "bg-card-hover"
              )}
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{character.name}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {character.greeting.substring(0, 30)}...
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {activeChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('home')}
                className="p-2 hover:bg-card rounded-lg transition-colors md:hidden"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <img
                src={activeChat.image}
                alt={activeChat.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold">{activeChat.name}</span>
            </div>
            <button className="p-2 hover:bg-card rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.sender === 'ai' && (
                  <img
                    src={activeChat.image}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover mr-2 flex-shrink-0"
                  />
                )}
                <div
                  className={cn(
                    "chat-bubble",
                    message.sender === 'user' ? "chat-bubble-user" : "chat-bubble-ai"
                  )}
                >
                  <p>{message.content}</p>
                  <span className="text-xs opacity-60 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2">
                <img
                  src={activeChat.image}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="chat-bubble chat-bubble-ai flex gap-1">
                  <span className="typing-dot" style={{ animationDelay: '0ms' }} />
                  <span className="typing-dot" style={{ animationDelay: '150ms' }} />
                  <span className="typing-dot" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto">
            <span className="text-sm text-muted-foreground flex-shrink-0">Suggestion:</span>
            {suggestions.slice(0, 1).map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => setInputValue(suggestion)}
                className="text-sm bg-card hover:bg-card-hover px-3 py-1.5 rounded-full whitespace-nowrap transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Write a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="input-dark flex-1"
              />
              <button className="p-3 hover:bg-card rounded-xl transition-colors">
                <Image className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="p-3 hover:bg-card rounded-xl transition-colors">
                <Mic className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={handleSend}
                className="p-3 bg-accent hover:bg-accent/80 rounded-xl transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Empty state */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Select a character to chat</h3>
              <p className="text-muted-foreground">Choose from the list or discover new companions</p>
            </div>
          </div>
        </div>
      )}

      {/* Character Profile Sidebar */}
      {activeChat && (
        <div className="w-80 border-l border-border flex-shrink-0 hidden lg:flex flex-col">
          {/* Character Images Carousel */}
          <div className="relative aspect-square">
            <img
              src={activeChat.image}
              alt={activeChat.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
              {[0, 1, 2].map((idx) => (
                <span
                  key={idx}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    idx === currentImageIndex % 3 ? "bg-white" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Character Info */}
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{activeChat.name}</h3>
            <p className="text-muted-foreground text-sm">{activeChat.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
