/**
 * Pure helper logic for The Gogaldara website
 * Handles search indexing, password strength evaluation,
 * notification state calculations, and settings formatting.
 */

export interface SearchItem {
  title: string;
  category: string;
  url: string;
  snippet: string;
  keywords: string[];
}

export const SITE_DIRECTORY: SearchItem[] = [
  {
    title: 'Chill Point Icicles',
    category: 'Attractions',
    url: 'explore.html#chill-point',
    snippet: 'The famous natural 35-foot icicle formations formed during peak winter in Gogaldara.',
    keywords: ['chill point', 'icicle', 'ice', 'winter', 'snow', 'tangmarg', 'baramulla']
  },
  {
    title: 'Pine Forests & Alpine Meadows',
    category: 'Nature',
    url: 'about.html#geography',
    snippet: 'Dense fir and deodar pine forests and summer wildflower meadows in Tangmarg valley.',
    keywords: ['pine', 'meadow', 'forest', 'nature', 'flora', 'wildflowers', 'trees']
  },
  {
    title: 'History & Pastoral Roots',
    category: 'Culture',
    url: 'about.html#history',
    snippet: 'The traditional Gujjar pastoral heritage and rise as an offbeat sanctuary in Kashmir.',
    keywords: ['history', 'culture', 'gujjar', 'bakrawal', 'tradition', 'shahid mir']
  },
  {
    title: 'Traditional Kashmiri Food & Kahwa',
    category: 'Cuisine',
    url: 'explore.html#food',
    snippet: 'Authentic Kashmiri Wazwan, Rogan Josh, Nadru Yakhni, Makki ki Roti and saffron Kahwa.',
    keywords: ['food', 'kahwa', 'tea', 'wazwan', 'rogan josh', 'dining', 'cuisine', 'dum aloo']
  },
  {
    title: 'Winter Sledging & Summer Treks',
    category: 'Activities',
    url: 'explore.html#activities',
    snippet: 'Snow sledging, photography walks, meadow camping, and tranquil pine forest hiking.',
    keywords: ['activities', 'trekking', 'hiking', 'sledging', 'adventure', 'camping']
  },
  {
    title: 'Photo Gallery & Lightbox',
    category: 'Gallery',
    url: 'gallery.html',
    snippet: 'High-resolution photo collection of Gogaldara throughout all four distinct seasons.',
    keywords: ['gallery', 'photos', 'pictures', 'images', 'lightbox', 'wallpaper']
  },
  {
    title: 'How to Reach Gogaldara',
    category: 'Travel Guide',
    url: 'explore.html#how-to-reach',
    snippet: 'Distance from Srinagar Airport (60 km), Tangmarg (13 km), and Baramulla station.',
    keywords: ['route', 'distance', 'airport', 'taxi', 'travel', 'reach', 'cab', 'transport']
  },
  {
    title: 'Settings & Dark Mode',
    category: 'Preferences',
    url: 'settings.html',
    snippet: 'Customize your visual theme, font size, language preferences, and notifications.',
    keywords: ['settings', 'dark mode', 'theme', 'language', 'font', 'preferences']
  },
  {
    title: 'Help Desk & FAQs',
    category: 'Support',
    url: 'help.html',
    snippet: 'Frequently asked questions regarding permits, winter gear, road conditions, and stay options.',
    keywords: ['faq', 'help', 'contact', 'permit', 'stay', 'hotels', 'homestays']
  },
  {
    title: 'Feedback & Reviews',
    category: 'Community',
    url: 'feedback.html',
    snippet: 'Share your travel memories, rate your Gogaldara trip, and read visitor testimonials.',
    keywords: ['feedback', 'review', 'rating', 'stars', 'comments', 'testimonials']
  }
];

/**
 * Filter items by user query
 */
export function filterSearchItems(query: string, items: SearchItem[] = SITE_DIRECTORY): SearchItem[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  return items.filter(item => {
    return (
      item.title.toLowerCase().includes(clean) ||
      item.snippet.toLowerCase().includes(clean) ||
      item.category.toLowerCase().includes(clean) ||
      item.keywords.some(k => k.toLowerCase().includes(clean))
    );
  });
}

/**
 * Calculate password strength score (0 to 100) and label
 */
export interface PasswordStrength {
  score: number;
  label: 'Too Short' | 'Weak' | 'Medium' | 'Strong' | 'Very Strong';
  color: string;
  hasLength: boolean;
  hasLower: boolean;
  hasUpper: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export function evaluatePasswordStrength(password: string): PasswordStrength {
  const hasLength = password.length >= 8;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  if (password.length === 0) {
    return {
      score: 0,
      label: 'Too Short',
      color: '#94a3b8',
      hasLength: false,
      hasLower: false,
      hasUpper: false,
      hasNumber: false,
      hasSpecial: false
    };
  }

  let points = 0;
  if (password.length >= 6) points += 20;
  if (hasLength) points += 20;
  if (hasLower && hasUpper) points += 20;
  if (hasNumber) points += 20;
  if (hasSpecial) points += 20;

  let label: PasswordStrength['label'] = 'Weak';
  let color = '#ef4444'; // Red

  if (points <= 20) {
    label = 'Weak';
    color = '#ef4444';
  } else if (points <= 40) {
    label = 'Weak';
    color = '#f97316'; // Orange
  } else if (points <= 60) {
    label = 'Medium';
    color = '#eab308'; // Yellow
  } else if (points <= 80) {
    label = 'Strong';
    color = '#22c55e'; // Green
  } else {
    label = 'Very Strong';
    color = '#10b981'; // Emerald
  }

  return {
    score: Math.min(100, points),
    label,
    color,
    hasLength,
    hasLower,
    hasUpper,
    hasNumber,
    hasSpecial
  };
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Notification data format and helpers
 */
export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'weather' | 'update';
}

export function getUnreadCount(notifications: AppNotification[]): number {
  return notifications.filter(n => !n.read).length;
}

export function markNotificationAsRead(notifications: AppNotification[], id: string): AppNotification[] {
  return notifications.map(n => n.id === id ? { ...n, read: true } : n);
}

export function markAllNotificationsAsRead(notifications: AppNotification[]): AppNotification[] {
  return notifications.map(n => ({ ...n, read: true }));
}
