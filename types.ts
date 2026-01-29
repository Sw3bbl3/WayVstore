export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  features: string[];
  gradient: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum SectionId {
  HERO = 'hero',
  PRODUCTS = 'products',
  COMMUNITY = 'community',
  ABOUT = 'about',
}