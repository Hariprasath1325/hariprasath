import React, { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';

const AuthModal: React.FC = () => {
  const { showSignIn, showSignUp, setShowSignIn, setShowSignUp, signIn, signUp } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isOpen = showSignIn || showSignUp;
  const isSignUp = showSignUp;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password.length >= 6) {
      if (isSignUp) {
        signUp(email, password);
      } else {
        signIn(email, password);
      }
      setEmail('');
      setPassword('');
    }
  };

  const handleClose = () => {
    setShowSignIn(false);
    setShowSignUp(false);
    setEmail('');
    setPassword('');
  };

  const switchMode = () => {
    if (isSignUp) {
      setShowSignIn(true);
    } else {
      setShowSignUp(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay animate-fade-in" onClick={handleClose}>
      <div
        className="relative bg-card rounded-2xl overflow-hidden flex w-full max-w-4xl mx-4 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left side - Image */}
        <div className="hidden md:block w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop"
            alt="AI Companion"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-8 z-20">
            <span className="text-3xl font-bold">
              candy<span className="text-primary">.ai</span>
            </span>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-bold mb-8">
            {isSignUp ? 'Create Account' : 'Sign in'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-dark w-full pl-12"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-dark w-full pl-12 pr-12"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {isSignUp && (
              <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
            )}

            {!isSignUp && (
              <button type="button" className="text-sm text-muted-foreground hover:text-primary underline">
                Forgot password?
              </button>
            )}

            {/* Submit button */}
            <Button type="submit" className="btn-gradient w-full py-3 text-base">
              {isSignUp ? 'Create Free Account' : 'Sign in'}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">
              {isSignUp ? 'or continue with' : 'or sign in with'}
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social buttons */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white text-black hover:bg-gray-100 border-0"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>

            <div className="flex gap-3">
              <Button
                type="button"
                className="flex-1 bg-discord hover:bg-discord/90 text-white border-0"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
                Discord
              </Button>

              <Button
                type="button"
                variant="outline"
                className="flex-1 border-border bg-card hover:bg-card-hover"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Button>
            </div>
          </div>

          {/* Terms */}
          {isSignUp && (
            <p className="text-xs text-muted-foreground mt-6 text-center">
              By signing up, you agree to{' '}
              <a href="#" className="text-primary underline">Terms of Service</a>
            </p>
          )}

          {/* Switch mode */}
          <p className="text-sm text-center mt-6">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button onClick={switchMode} className="text-primary font-medium hover:underline">
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account yet?{' '}
                <button onClick={switchMode} className="text-primary font-medium hover:underline">
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
