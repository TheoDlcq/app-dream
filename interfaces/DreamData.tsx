export type DreamType = 'ordinary' | 'lucid' | 'nightmare' | 'daydream';
export type EmotionalState = 'very_negative' | 'negative' | 'neutral' | 'positive' | 'very_positive';
export type DreamClarity = 'very_clear' | 'clear' | 'moderate' | 'fuzzy' | 'very_fuzzy';
export type SleepQuality = 'excellent' | 'good' | 'fair' | 'poor' | 'very_poor';
export type DreamTone = 'positive' | 'negative' | 'neutral';

// Définition du type pour un rêve
export interface DreamData {
  dreamText: string;
  isLucidDream: boolean;
  dreamDate: string;
  dreamType: DreamType;
  emotionalStateBefore: EmotionalState;
  emotionalStateAfter: EmotionalState;
  characters: string[];
  location: string;
  emotionalIntensity: number; // 1-10
  clarity: DreamClarity;
  tags: string[];
  sleepQuality: SleepQuality;
  personalMeaning: string;
  dreamTone: DreamTone;
  createdAt: string;
}