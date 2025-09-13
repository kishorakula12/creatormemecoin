'use client';

import { useState, useEffect } from 'react';
import { Search, Grid3X3, X, Star, TrendingUp } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  image: string;
  tags: string[];
  trending: boolean;
}

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Distracted Boyfriend',
    category: 'Classic',
    thumbnail: '/templates/distracted-boyfriend-thumb.jpg',
    image: '/templates/distracted-boyfriend.jpg',
    tags: ['relationship', 'classic', 'funny'],
    trending: true
  },
  {
    id: '2',
    name: 'Drake Pointing',
    category: 'Classic',
    thumbnail: '/templates/drake-pointing-thumb.jpg',
    image: '/templates/drake-pointing.jpg',
    tags: ['drake', 'pointing', 'approval'],
    trending: true
  },
  {
    id: '3',
    name: 'Woman Yelling at Cat',
    category: 'Classic',
    thumbnail: '/templates/woman-cat-thumb.jpg',
    image: '/templates/woman-cat.jpg',
    tags: ['cat', 'woman', 'argument'],
    trending: false
  },
  {
    id: '4',
    name: 'Surprised Pikachu',
    category: 'Anime',
    thumbnail: '/templates/pikachu-thumb.jpg',
    image: '/templates/pikachu.jpg',
    tags: ['pokemon', 'surprised', 'anime'],
    trending: true
  },
  {
    id: '5',
    name: 'This is Fine',
    category: 'Classic',
    thumbnail: '/templates/this-is-fine-thumb.jpg',
    image: '/templates/this-is-fine.jpg',
    tags: ['dog', 'fire', 'acceptance'],
    trending: false
  },
  {
    id: '6',
    name: 'Woman Cat',
    category: 'Animals',
    thumbnail: '/templates/woman-cat-2-thumb.jpg',
    image: '/templates/woman-cat-2.jpg',
    tags: ['cat', 'woman', 'table'],
    trending: false
  }
];

const categories = ['All', 'Classic', 'Anime', 'Animals', 'Trending'];

interface TemplateGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  onTemplateSelect: (template: Template) => void;
}

export default function TemplateGallery({ isOpen, onClose, onTemplateSelect }: TemplateGalleryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(mockTemplates);

  useEffect(() => {
    let filtered = mockTemplates;

    // Filter by category
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Trending') {
        filtered = filtered.filter(template => template.trending);
      } else {
        filtered = filtered.filter(template => template.category === selectedCategory);
      }
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredTemplates(filtered);
  }, [searchTerm, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Grid3X3 className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Browse Templates</h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search and Filters */}
            <div className="mt-4 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'Trending' && <TrendingUp className="w-3 h-3 inline mr-1" />}
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Template Grid */}
          <div className="px-6 py-4 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => {
                    onTemplateSelect(template);
                    onClose();
                  }}
                  className="group cursor-pointer rounded-lg border border-gray-200 overflow-hidden hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <div className="aspect-square bg-gray-100 relative">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        // Fallback to a placeholder
                        e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='100' y='100' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='12'%3E${template.name}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                    {template.trending && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>Trending</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{template.name}</h4>
                    <p className="text-xs text-gray-500">{template.category}</p>
                  </div>
                </div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-8">
                <Grid3X3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No templates found matching your search.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
