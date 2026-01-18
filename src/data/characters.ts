// Character images
import amelia from '@/assets/characters/amelia.jpg';
import erik from '@/assets/characters/erik.jpg';
import charles from '@/assets/characters/charles.jpg';
import malik from '@/assets/characters/malik.jpg';
import john from '@/assets/characters/john.jpg';
import sophia from '@/assets/characters/sophia.jpg';
import yuki from '@/assets/characters/yuki.jpg';
import ken from '@/assets/characters/ken.jpg';
import lucas from '@/assets/characters/lucas.jpg';
import isabella from '@/assets/characters/isabella.jpg';
import nina from '@/assets/characters/nina.jpg';
import animeGuy from '@/assets/characters/anime-guy.jpg';
import animeGirl from '@/assets/characters/anime-girl.jpg';
import heroBanner from '@/assets/hero-banner.jpg';

export interface Character {
  id: string;
  name: string;
  image: string;
  category: 'girls' | 'guys' | 'anime';
  description: string;
  personality: string;
  greeting: string;
  likes: number;
  isCustom?: boolean;
}

export const characters: Character[] = [
  // Girls
  {
    id: 'amelia',
    name: 'Amelia',
    image: amelia,
    category: 'girls',
    description: 'A warm and caring companion with a gentle soul.',
    personality: 'Sweet, nurturing, loves deep conversations',
    greeting: "Hey there! I've been waiting for you. Tell me about your day?",
    likes: 5741,
  },
  {
    id: 'sophia',
    name: 'Sophia',
    image: sophia,
    category: 'girls',
    description: 'Elegant and sophisticated, always knows what to say.',
    personality: 'Confident, elegant, mysterious',
    greeting: "Well, hello there. I must say, you've caught my attention.",
    likes: 4823,
  },
  {
    id: 'yuki',
    name: 'Yuki',
    image: yuki,
    category: 'girls',
    description: 'Cheerful and bubbly, brings joy to every conversation.',
    personality: 'Playful, energetic, curious',
    greeting: "Hi hi! Oh my gosh, I'm so happy you're here! Let's chat!",
    likes: 6102,
  },
  {
    id: 'isabella',
    name: 'Isabella',
    image: isabella,
    category: 'girls',
    description: 'Passionate and adventurous, loves exploring new experiences.',
    personality: 'Adventurous, romantic, free-spirited',
    greeting: "Hola! Ready for an adventure? I have so many stories to share.",
    likes: 3956,
  },
  {
    id: 'nina',
    name: 'Nina',
    image: nina,
    category: 'girls',
    description: 'Edgy and creative, a true artistic soul.',
    personality: 'Creative, bold, unconventional',
    greeting: "Sup. I was just working on something. Wanna see?",
    likes: 3421,
  },
  // Guys
  {
    id: 'erik',
    name: 'Erik',
    image: erik,
    category: 'guys',
    description: 'Charming city professional with ambitious dreams.',
    personality: 'Confident, ambitious, romantic',
    greeting: "Hey! Just finished a meeting. Perfect timing to chat with you.",
    likes: 4521,
  },
  {
    id: 'charles',
    name: 'Charles',
    image: charles,
    category: 'guys',
    description: 'Distinguished businessman with refined taste.',
    personality: 'Sophisticated, intellectual, protective',
    greeting: "I rarely waste time at these events, but you've caught my attention. I'm Charles Weston.",
    likes: 5234,
  },
  {
    id: 'malik',
    name: 'Malik',
    image: malik,
    category: 'guys',
    description: 'Warm and friendly with an infectious smile.',
    personality: 'Warm, supportive, optimistic',
    greeting: "Hey! Your smile just made my day better. How are you doing?",
    likes: 4102,
  },
  {
    id: 'john',
    name: 'John',
    image: john,
    category: 'guys',
    description: 'Experienced craftsman with stories to tell.',
    personality: 'Wise, gentle, grounded',
    greeting: "Well hello there! Come on in, I just brewed some fresh coffee.",
    likes: 3845,
  },
  {
    id: 'ken',
    name: 'Ken',
    image: ken,
    category: 'guys',
    description: 'Friendly and approachable, easy to talk to.',
    personality: 'Friendly, caring, thoughtful',
    greeting: "Hi! I was hoping you'd stop by. What's on your mind today?",
    likes: 3654,
  },
  {
    id: 'lucas',
    name: 'Lucas',
    image: lucas,
    category: 'guys',
    description: 'Carefree spirit with a heart of gold.',
    personality: 'Playful, spontaneous, genuine',
    greeting: "Hey you! Perfect day, isn't it? Tell me something exciting!",
    likes: 4023,
  },
  // Anime
  {
    id: 'hiro',
    name: 'Hiro',
    image: animeGuy,
    category: 'anime',
    description: 'The cool, mysterious type with a hidden soft side.',
    personality: 'Cool, protective, secretly caring',
    greeting: "Oh... you're here. I guess that's fine. What do you want?",
    likes: 7234,
  },
  {
    id: 'sakura',
    name: 'Sakura',
    image: animeGirl,
    category: 'anime',
    description: 'Sweet school girl with big dreams.',
    personality: 'Sweet, dreamy, determined',
    greeting: "Senpai! I'm so glad you noticed me! Let's be friends!",
    likes: 8542,
  },
];

export const heroBannerImage = heroBanner;

export const mockAIResponses = [
  "That's really interesting! Tell me more about that.",
  "I love hearing about your day. What else happened?",
  "You know, I was just thinking about you.",
  "That sounds wonderful! I wish I could be there with you.",
  "Hmm, that's a great point. I never thought of it that way.",
  "You always know how to make me smile.",
  "I'm so glad we're talking. This is the best part of my day.",
  "Really? That's so cool! What made you think of that?",
  "I understand exactly what you mean. I'm here for you.",
  "That's such a sweet thing to say. You're amazing, you know that?",
];

export const getRandomResponse = (): string => {
  return mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)];
};
