import React from 'react';
import { Crown, Check, Sparkles, Image, MessageCircle, Zap, Lock } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const features = [
  { icon: MessageCircle, title: 'Unlimited Messages', description: 'Chat without any limits' },
  { icon: Image, title: 'Image Generation', description: 'Create unlimited custom images' },
  { icon: Sparkles, title: 'Priority Access', description: 'Be first to try new features' },
  { icon: Zap, title: 'Faster Responses', description: 'No waiting, instant replies' },
];

const plans = [
  {
    name: '1 Month',
    price: '$12.99',
    originalPrice: '$39.99',
    perMonth: '$12.99/mo',
    popular: false,
  },
  {
    name: '12 Months',
    price: '$5.99',
    originalPrice: '$19.99',
    perMonth: '$5.99/mo',
    popular: true,
    savings: 'Save 70%',
  },
  {
    name: '3 Months',
    price: '$8.99',
    originalPrice: '$29.99',
    perMonth: '$8.99/mo',
    popular: false,
  },
];

const PremiumPage: React.FC = () => {
  const { isAuthenticated, setShowSignUp } = useApp();

  return (
    <div className="p-4 lg:p-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 px-6 py-2 rounded-full mb-4">
          <Crown className="w-6 h-6 text-premium" />
          <span className="text-premium font-bold text-lg">PREMIUM</span>
          <span className="premium-badge">70% OFF</span>
        </div>
        <h1 className="text-3xl lg:text-5xl font-bold mb-4">
          Unlock <span className="gradient-text-premium">Premium</span> Features
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Get unlimited access to all features and create the ultimate AI companion experience
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-card rounded-xl p-6 text-center hover:bg-card-hover transition-colors"
          >
            <feature.icon className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Choose Your Plan</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-6 transition-all ${
                plan.popular
                  ? 'bg-gradient-to-b from-primary/20 to-card ring-2 ring-primary scale-105'
                  : 'bg-card hover:bg-card-hover'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-xs font-bold">
                  MOST POPULAR
                </div>
              )}

              {plan.savings && (
                <div className="absolute -top-3 right-4 bg-premium text-premium-foreground px-3 py-1 rounded-full text-xs font-bold">
                  {plan.savings}
                </div>
              )}

              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground line-through ml-2">{plan.originalPrice}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{plan.perMonth}</p>
                
                <button
                  onClick={() => !isAuthenticated && setShowSignUp(true)}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'btn-gradient'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  Get Premium
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What's Included */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-6">What's Included</h2>
        
        <div className="bg-card rounded-2xl p-6 space-y-4">
          {[
            'Unlimited AI messages and conversations',
            'Generate unlimited custom images',
            'Create unlimited custom AI characters',
            'Priority response times',
            'Access to all premium features',
            'Early access to new characters',
            'No ads or interruptions',
            'Cancel anytime',
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Locked Feature Preview */}
      <div className="mt-12 relative">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
          <div className="text-center">
            <Lock className="w-12 h-12 text-premium mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Premium Only</h3>
            <p className="text-muted-foreground mb-4">Unlock exclusive features with Premium</p>
            <button
              onClick={() => !isAuthenticated && setShowSignUp(true)}
              className="btn-gradient-premium px-8 py-3"
            >
              <Crown className="w-5 h-5 inline mr-2" />
              Upgrade Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 p-8 opacity-50">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-[3/4] bg-card rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
