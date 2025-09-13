'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Heart, MessageCircle, Share, RefreshCw } from 'lucide-react';

interface TrendingMeme {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  image: string;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  tags: string[];
  trendingScore: number;
}

interface DynamicTrendingProps {
  onMemeSelect: (meme: TrendingMeme) => void;
}

export default function DynamicTrending({ onMemeSelect }: DynamicTrendingProps) {
  const [memes, setMemes] = useState<TrendingMeme[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Mock API call - replace with your actual API endpoint
  const fetchTrendingMemes = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with actual API call
      const mockMemes: TrendingMeme[] = [
        {
          id: '1',
          title: 'When AI Creates Better Memes Than You',
          author: '@CreatorDevSol',
          thumbnail: '/memes/ai-meme-1-thumb.jpg',
          image: '/memes/ai-meme-1.jpg',
          likes: Math.floor(Math.random() * 2000) + 500,
          comments: Math.floor(Math.random() * 200) + 50,
          shares: Math.floor(Math.random() * 100) + 20,
          createdAt: new Date(Date.now() - Math.random() * 2 * 60 * 60 * 1000).toISOString(),
          tags: ['ai', 'humor', 'creator', 'viral'],
          trendingScore: Math.random() * 100
        },
        {
          id: '2',
          title: 'Me Trying to Explain $CREATOR to My Friends',
          author: '@CryptoCreator',
          thumbnail: '/memes/crypto-meme-1-thumb.jpg',
          image: '/memes/crypto-meme-1.jpg',
          likes: Math.floor(Math.random() * 1500) + 300,
          comments: Math.floor(Math.random() * 150) + 30,
          shares: Math.floor(Math.random() * 80) + 15,
          createdAt: new Date(Date.now() - Math.random() * 4 * 60 * 60 * 1000).toISOString(),
          tags: ['crypto', 'creator', 'explanation', 'funny'],
          trendingScore: Math.random() * 100
        },
        {
          id: '3',
          title: 'When Your Meme Goes Viral Overnight',
          author: '@MemeMaster',
          thumbnail: '/memes/viral-meme-1-thumb.jpg',
          image: '/memes/viral-meme-1.jpg',
          likes: Math.floor(Math.random() * 3000) + 800,
          comments: Math.floor(Math.random() * 300) + 100,
          shares: Math.floor(Math.random() * 150) + 50,
          createdAt: new Date(Date.now() - Math.random() * 6 * 60 * 60 * 1000).toISOString(),
          tags: ['viral', 'success', 'overnight', 'popular'],
          trendingScore: Math.random() * 100
        },
        {
          id: '4',
          title: 'Creator Factory vs Other Meme Generators',
          author: '@FactoryUser',
          thumbnail: '/memes/comparison-meme-1-thumb.jpg',
          image: '/memes/comparison-meme-1.jpg',
          likes: Math.floor(Math.random() * 1200) + 200,
          comments: Math.floor(Math.random() * 100) + 25,
          shares: Math.floor(Math.random() * 60) + 10,
          createdAt: new Date(Date.now() - Math.random() * 8 * 60 * 60 * 1000).toISOString(),
          tags: ['comparison', 'factory', 'better', 'tools'],
          trendingScore: Math.random() * 100
        },
        {
          id: '5',
          title: 'When You Discover a New Template',
          author: '@TemplateHunter',
          thumbnail: '/memes/template-meme-1-thumb.jpg',
          image: '/memes/template-meme-1.jpg',
          likes: Math.floor(Math.random() * 800) + 150,
          comments: Math.floor(Math.random() * 80) + 20,
          shares: Math.floor(Math.random() * 40) + 8,
          createdAt: new Date(Date.now() - Math.random() * 12 * 60 * 60 * 1000).toISOString(),
          tags: ['template', 'discovery', 'new', 'excitement'],
          trendingScore: Math.random() * 100
        },
        {
          id: '6',
          title: 'The $CREATOR Community in a Nutshell',
          author: '@CommunityBuilder',
          thumbnail: '/memes/community-meme-1-thumb.jpg',
          image: '/memes/community-meme-1.jpg',
          likes: Math.floor(Math.random() * 2500) + 600,
          comments: Math.floor(Math.random() * 250) + 75,
          shares: Math.floor(Math.random() * 120) + 30,
          createdAt: new Date(Date.now() - Math.random() * 1 * 60 * 60 * 1000).toISOString(),
          tags: ['community', 'creator', 'together', 'strong'],
          trendingScore: Math.random() * 100
        }
      ];

      // Sort by trending score and recency
      const sortedMemes = mockMemes.sort((a, b) => {
        const scoreA = a.trendingScore + (a.likes / 100) + (a.shares * 2);
        const scoreB = b.trendingScore + (b.likes / 100) + (b.shares * 2);
        return scoreB - scoreA;
      });

      setMemes(sortedMemes);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch trending memes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch trending memes on component mount
  useEffect(() => {
    fetchTrendingMemes();
  }, []);

  // Auto-refresh every 3 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchTrendingMemes();
    }, 3 * 60 * 1000); // 3 minutes

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchTrendingMemes();
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Trending Memes</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Updating...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {loading && memes.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {memes.map((meme) => (
            <div
              key={meme.id}
              onClick={() => onMemeSelect(meme)}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <div className="text-white text-6xl">🎭</div>
                </div>
                <div className="absolute top-2 left-2">
                  <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>#{memes.indexOf(meme) + 1}</span>
                  </div>
                </div>
              </div>
              
              <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {meme.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                <span>by {meme.author}</span>
                <span>{formatTimeAgo(meme.createdAt)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{formatNumber(meme.likes)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{formatNumber(meme.comments)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Share className="w-4 h-4" />
                    <span>{formatNumber(meme.shares)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-3">
                {meme.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Trending memes are updated every 3 minutes based on engagement and recency
        </p>
      </div>
    </div>
  );
}
