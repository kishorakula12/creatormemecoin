// API Configuration for Creator Factory
// Replace these with your actual API endpoints

export const API_CONFIG = {
  // Base URLs
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.creatorfactory.com',
  
  // Endpoints
  ENDPOINTS: {
    TEMPLATES: '/api/templates',
    TRENDING_MEMES: '/api/trending',
    UPLOAD_IMAGE: '/api/upload',
    GENERATE_MEME: '/api/generate',
    AI_SUGGESTIONS: '/api/ai/suggestions',
    USER_MEMES: '/api/user/memes',
    ANALYTICS: '/api/analytics'
  },
  
  // Refresh intervals (in milliseconds)
  REFRESH_INTERVALS: {
    TEMPLATES: 5 * 60 * 1000, // 5 minutes
    TRENDING: 3 * 60 * 1000,  // 3 minutes
    ANALYTICS: 10 * 60 * 1000 // 10 minutes
  },
  
  // API Keys (store in environment variables)
  API_KEYS: {
    OPENAI: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    UPLOAD: process.env.NEXT_PUBLIC_UPLOAD_API_KEY,
    ANALYTICS: process.env.NEXT_PUBLIC_ANALYTICS_API_KEY
  }
};

// Helper function to build API URLs
export const buildApiUrl = (endpoint: string, params?: Record<string, string>) => {
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  
  return url.toString();
};

// API call helper
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = buildApiUrl(endpoint);
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };
  
  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

// Specific API functions
export const api = {
  // Templates
  getTemplates: async (params?: { category?: string; trending?: boolean; limit?: number }) => {
    return apiCall(API_CONFIG.ENDPOINTS.TEMPLATES, {
      method: 'GET',
      body: params ? JSON.stringify(params) : undefined,
    });
  },
  
  // Trending Memes
  getTrendingMemes: async (params?: { limit?: number; timeframe?: string }) => {
    return apiCall(API_CONFIG.ENDPOINTS.TRENDING_MEMES, {
      method: 'GET',
      body: params ? JSON.stringify(params) : undefined,
    });
  },
  
  // AI Suggestions
  getAISuggestions: async (imageUrl: string, context?: string) => {
    return apiCall(API_CONFIG.ENDPOINTS.AI_SUGGESTIONS, {
      method: 'POST',
      body: JSON.stringify({ imageUrl, context }),
    });
  },
  
  // Upload Image
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    return apiCall(API_CONFIG.ENDPOINTS.UPLOAD_IMAGE, {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it
      },
    });
  },
  
  // Generate Meme
  generateMeme: async (templateId: string, text: string, options?: Record<string, unknown>) => {
    return apiCall(API_CONFIG.ENDPOINTS.GENERATE_MEME, {
      method: 'POST',
      body: JSON.stringify({ templateId, text, options }),
    });
  }
};
