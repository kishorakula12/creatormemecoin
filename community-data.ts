// API configuration for creatorcommunity.xyz integration
export const COMMUNITY_API = {
  BASE_URL: 'https://creatorcommunity.xyz',
  ENDPOINTS: {
    TEMPLATES: '/api/templates',
    TRENDING: '/api/trending',
    NEW_MEME: '/api/memes'
  }
};

// Function to fetch community data
export const fetchCommunityData = async (endpoint: string) => {
  try {
    const response = await fetch(`${COMMUNITY_API.BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'CreatorCoinMeme/1.0'
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`API Error: ${response.status}`);
    }
  } catch (error) {
    console.error('Community API Error:', error);
    return null;
  }
};

// Function to get specific data types
export const getCommunityData = async (type: 'templates' | 'memes') => {
  try {
    const endpoint = type === 'templates' ? COMMUNITY_API.ENDPOINTS.TEMPLATES : COMMUNITY_API.ENDPOINTS.TRENDING;
    const response = await fetch(`${COMMUNITY_API.BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'CreatorCoinMeme/1.0'
      },
    });

    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Community Data Error:', error);
    return null;
  }
};

// Real-time WebSocket connections
export const setupRealtimeUpdates = (onNewMeme: (meme: any) => void, onNewTemplate: (template: any) => void) => {
  const memeWS = new WebSocket('wss://creatorcommunity.xyz/ws/trending');
  const templateWS = new WebSocket('wss://creatorcommunity.xyz/ws/templates');

  memeWS.onmessage = (event) => {
    try {
      const newMeme = JSON.parse(event.data);
      onNewMeme(newMeme);
    } catch (error) {
      console.error('Meme WebSocket error:', error);
    }
  };

  templateWS.onmessage = (event) => {
    try {
      const newTemplate = JSON.parse(event.data);
      onNewTemplate(newTemplate);
    } catch (error) {
      console.error('Template WebSocket error:', error);
    }
  };

  return () => {
    memeWS.close();
    templateWS.close();
  };
};
