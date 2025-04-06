export type Category = 'Nature' | 'Abstract' | 'Animals' | 'Space' | 'All';

export interface Wallpaper {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: Exclude<Category, 'All'>;
  size: {
    width: number;
    height: number;
  };
}

export const categories: Category[] = ['All', 'Nature', 'Abstract', 'Animals', 'Space'];

export const wallpapers: Wallpaper[] = [
  // Nature wallpapers
  {
    id: 'nature-1',
    title: 'Mountain Lake',
    description: 'Serene mountain lake with reflections at sunset',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    category: 'Nature',
    size: { width: 1920, height: 1080 },
  },
  {
    id: 'nature-2',
    title: 'Forest Path',
    description: 'Sunlight through a misty forest path',
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969',
    category: 'Nature',
    size: { width: 1920, height: 1080 },
  },
  {
    id: 'nature-3',
    title: 'Autumn Colors',
    description: 'Vibrant autumn forest with golden leaves',
    imageUrl: 'https://images.unsplash.com/photo-1507783548227-544c3b8fc065',
    category: 'Nature',
    size: { width: 1920, height: 1080 },
  },
  {
    id: 'nature-4',
    title: 'Coastal Sunset',
    description: 'Dramatic coastal sunset with waves crashing on rocks',
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
    category: 'Nature',
    size: { width: 1920, height: 1080 },
  },

  // Abstract wallpapers
  {
    id: 'abstract-1',
    title: 'Color Burst',
    description: 'Vibrant explosion of colors in an abstract pattern',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab',
    category: 'Abstract',
    size: { width: 1920, height: 1080 },
  },
  {
    id: 'abstract-2',
    title: 'Fluid Waves',
    description: 'Smooth flowing abstract waves in pastel colors',
    imageUrl: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3',
    category: 'Abstract',
    size: { width: 1920, height: 1080 },
  },
  {
    id: 'abstract-3',
    title: 'Geometric Shapes',
    description: 'Modern geometric abstract pattern with bold colors',
    imageUrl: 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7',
    category: 'Abstract',
    size: { width: 1920, height: 1080 },
  },
  {
    id: 'abstract-4',
    title: 'Digital Brushstrokes',
    description: 'Abstract digital art resembling brush strokes on canvas',
    imageUrl: 'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6',
    category: 'Abstract',
    size: { width: 1920, height: 1080 },
  },

  // Animals wallpapers
  {
    id: 'animals-1',
    title: 'Lion King',
    description: 'Majestic lion portrait in the Savannah',
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d',
    category: 'Animals',
    size: { width: 1920, height: 1080 },
  },
  {
    id: 'animals-2',
    title: 'Ocean Life',
    description: 'Colorful tropical fish in a coral reef',
    imageUrl: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00',
    category: 'Animals',
    size: { width: 1920, height: 1080 },
  },
  {
    id: 'animals-3',
    title: 'Bird of Paradise',
    description: 'Exotic colorful bird perched on a branch',
    imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b86797',
    category: 'Animals',
    size: { width: 1920, height: 1080 },
  },
  {
    id: 'animals-4',
    title: 'Wolf in Snow',
    description: 'Lone wolf walking through a snowy landscape',
    imageUrl: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352',
    category: 'Animals',
    size: { width: 1920, height: 1080 },
  },

  // Space wallpapers
  {
    id: 'space-1',
    title: 'Galaxy Clusters',
    description: 'Stunning view of distant galaxy clusters',
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564',
    category: 'Space',
    size: { width: 1920, height: 1080 },
  },
  {
    id: 'space-2',
    title: 'Nebula Cloud',
    description: 'Colorful nebula cloud formation in deep space',
    imageUrl: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3',
    category: 'Space',
    size: { width: 1920, height: 1080 },
  },
  {
    id: 'space-3',
    title: 'Milky Way',
    description: 'The Milky Way galaxy as seen from Earth',
    imageUrl: 'https://images.unsplash.com/photo-1539593395743-7da5ee10ff07',
    category: 'Space',
    size: { width: 1920, height: 1080 },
  },
  {
    id: 'space-4',
    title: 'Planets Aligned',
    description: 'Artistic representation of planets in our solar system',
    imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5',
    category: 'Space',
    size: { width: 1920, height: 1080 },
  },
]; 