'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  image: string;
  tags: string[];
  trending: boolean;
  createdAt: string;
  likes: number;
}

interface DynamicTemplatesProps {
  onTemplateSelect: (template: Template) => void;
}

export default function DynamicTemplates({ onTemplateSelect }: DynamicTemplatesProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Mock API call - replace with your actual API endpoint
  const fetchTemplates = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with actual API call
      const mockTemplates: Template[] = [
        {
          id: '1',
          name: 'Cosmic Portal',
          category: 'Fantasy & Magic',
          thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&crop=center',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
          tags: ['fantasy', 'magic', 'portal', 'cosmic'],
          trending: true,
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          likes: Math.floor(Math.random() * 1000) + 100
        },
        {
          id: '2',
          name: 'Reaching for Stars',
          category: 'Aspiration & Goals',
          thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=200&fit=crop&crop=center',
          image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop&crop=center',
          tags: ['goals', 'aspiration', 'stars', 'motivation'],
          trending: true,
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          likes: Math.floor(Math.random() * 800) + 50
        },
        {
          id: '3',
          name: 'Just Create',
          category: 'Motivation & Action',
          thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop&crop=center',
          image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop&crop=center',
          tags: ['create', 'motivation', 'action', 'inspiration'],
          trending: false,
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          likes: Math.floor(Math.random() * 600) + 30
        },
        {
          id: '4',
          name: 'Sparkle Effect',
          category: 'Highlight & Shine',
          thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop&crop=center',
          image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center',
          tags: ['sparkle', 'shine', 'highlight', 'effect'],
          trending: false,
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          likes: Math.floor(Math.random() * 400) + 20
        },
        {
          id: '5',
          name: 'AI Generated Art #1',
          category: 'AI Generated',
          thumbnail: '/templates/ai-art-1-thumb.jpg',
          image: '/templates/ai-art-1.jpg',
          tags: ['ai', 'generated', 'art', 'new'],
          trending: true,
          createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
          likes: Math.floor(Math.random() * 200) + 10
        },
        {
          id: '6',
          name: 'Community Creation',
          category: 'Community',
          thumbnail: '/templates/community-thumb.jpg',
          image: '/templates/community.jpg',
          tags: ['community', 'user', 'generated', 'popular'],
          trending: true,
          createdAt: new Date(Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000).toISOString(),
          likes: Math.floor(Math.random() * 1500) + 200
        }
      ];

      // Sort by trending status and likes
      const sortedTemplates = mockTemplates.sort((a, b) => {
        if (a.trending && !b.trending) return -1;
        if (!a.trending && b.trending) return 1;
        return b.likes - a.likes;
      });

      setTemplates(sortedTemplates);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch templates on component mount
  useEffect(() => {
    fetchTemplates();
  }, []);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTemplates();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchTemplates();
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Popular Templates</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Updating...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {loading && templates.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg p-4 animate-pulse">
              <div className="w-full h-32 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-1"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => onTemplateSelect(template)}
              className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="relative">
                <div className="w-full h-32 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded mb-2 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <div className="text-white text-4xl">✨</div>
                </div>
                {template.trending && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Trending</span>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-sm font-medium">{template.name}</p>
              <p className="text-xs text-gray-500">{template.category}</p>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                <span>{template.likes} likes</span>
                <span>{formatTimeAgo(template.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Templates are automatically updated every 5 minutes with fresh content
        </p>
      </div>
    </div>
  );
}
