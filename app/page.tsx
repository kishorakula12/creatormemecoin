'use client';

import { useState, useRef } from 'react';
import DynamicTemplates from './components/DynamicTemplates';
import DynamicTrending from './components/DynamicTrending';

export default function Home() {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [fontSize, setFontSize] = useState(32);
  const [textColor, setTextColor] = useState("#ffffff");
  const [selectedImage, setSelectedImage] = useState("");
  const [textLayers, setTextLayers] = useState([
    { id: 1, text: "", x: 50, y: 50, fontSize: 32, color: "#ffffff", isActive: true }
  ]);
  const [activeLayerId, setActiveLayerId] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTemplateSelect = (template: { image: string }) => {
    setSelectedImage(template.image);
  };

  const handleTrendingMemeSelect = (meme: { image: string }) => {
    setSelectedImage(meme.image);
  };

  const addTextLayer = () => {
    const newId = Math.max(...textLayers.map(layer => layer.id)) + 1;
    setTextLayers([...textLayers, { 
      id: newId, 
      text: "", 
      x: 50, 
      y: 50, 
      fontSize: 32, 
      color: "#ffffff", 
      isActive: false 
    }]);
    setActiveLayerId(newId);
  };

  const removeTextLayer = (id: number) => {
    if (textLayers.length > 1) {
      const newLayers = textLayers.filter(layer => layer.id !== id);
      setTextLayers(newLayers);
      if (activeLayerId === id) {
        setActiveLayerId(newLayers[0].id);
      }
    }
  };

  const updateTextLayer = (id: number, updates: Partial<{ text: string; x: number; y: number; fontSize: number; color: string; isActive: boolean }>) => {
    setTextLayers(textLayers.map(layer => 
      layer.id === id ? { ...layer, ...updates } : layer
    ));
  };

  const setActiveLayer = (id: number) => {
    setActiveLayerId(id);
    setTextLayers(textLayers.map(layer => 
      ({ ...layer, isActive: layer.id === id })
    ));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadMeme = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new window.Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        
        // Draw all text layers
        textLayers.forEach((layer) => {
          if (layer.text.trim()) {
            ctx.fillStyle = layer.color;
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 4;
            ctx.font = `bold ${layer.fontSize}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            const x = (layer.x / 100) * canvas.width;
            const y = (layer.y / 100) * canvas.height;
            
            ctx.strokeText(layer.text, x, y);
            ctx.fillText(layer.text, x, y);
          }
        });
        
        // Download
        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = canvas.toDataURL();
        link.click();
      }
    };
    
    img.src = selectedImage;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="white"/>
                <path d="M12 6L11.5 8.5L9 9L11.5 9.5L12 12L12.5 9.5L15 9L12.5 8.5L12 6Z" fill="black"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">CreatorCoinMeme</span>
              <span className="text-xs text-gray-500 -mt-1">creatorcoinmeme.com</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#templates" className="text-gray-600 hover:text-gray-900 font-medium">Templates</a>
            <a href="#trending" className="text-gray-600 hover:text-gray-900 font-medium">Top Memes</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium">About us</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 font-medium">Connect</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dynamic Templates Section */}
        <section id="templates">
          <DynamicTemplates onTemplateSelect={handleTemplateSelect} />
        </section>

        {/* Dynamic Trending Section */}
        <section id="trending">
          <DynamicTrending onMemeSelect={handleTrendingMemeSelect} />
        </section>

        {/* About Section */}
        <section id="about" className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">About CreatorCoinMeme</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-6">
              CreatorCoinMeme is the ultimate meme generator that makes creating and sharing memes as easy as clicking a button. 
              Our powerful tools and AI-powered suggestions help you create viral content that resonates with your audience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-gray-600">Create memes in seconds with our intuitive interface</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Powered</h3>
                <p className="text-gray-600">Smart suggestions and auto-generated captions</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
                <p className="text-gray-600">Share instantly across all social media platforms</p>
              </div>
            </div>
          </div>
        </section>

        {/* Links Section */}
        <section id="contact" className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Connect With Us</h2>
          <div className="max-w-6xl mx-auto bg-gray-50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Twitter</h3>
                <p className="text-gray-600 mb-4">Follow us for updates and community</p>
                <a 
                  href="https://x.com/CreatorDevSol?t=IIpLGAEYC5HyT31pfTR0cA&s=09" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Follow @CreatorDevSol
                </a>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">DEX Screener</h3>
                <p className="text-gray-600 mb-4">Track $CREATOR token performance</p>
                <a 
                  href="https://dexscreener.com/solana/CvQ5ghETwdqcuxpx9xryU517qXrKVFKm8KqWkaNK7opg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  View on DEX Screener
                </a>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Official Website</h3>
                <p className="text-gray-600 mb-4">Visit our main platform</p>
                <a 
                  href="https://t.co/SKgjvTpSHf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Visit Website
                </a>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-gray-600 mb-4">Join our Twitter community</p>
                <a 
                  href="https://twitter.com/i/communities/1963782808356221318" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Join Community
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Meme Generator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">CREATE A MEME!</h2>
              
              {/* Upload Image Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium mb-4 flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>Upload Image</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {/* Browse Templates and Stickers Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <a
                  href="https://creatorcommunity.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-orange-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span>Browse Templates</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                
                <a
                  href="https://emoji.gg/stickers/meme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-500 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-purple-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Get Stickers</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              
              {/* Text Layers Management */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Text Layers</h3>
                  <button
                    onClick={addTextLayer}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Text</span>
                  </button>
                </div>

                {/* Text Layer List */}
                <div className="space-y-2">
                  {textLayers.map((layer) => (
                    <div key={layer.id} className={`p-3 border rounded-lg ${layer.isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Text Layer {layer.id}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setActiveLayer(layer.id)}
                            className={`px-2 py-1 text-xs rounded ${layer.isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                          >
                            {layer.isActive ? 'Active' : 'Select'}
                          </button>
                          {textLayers.length > 1 && (
                            <button
                              onClick={() => removeTextLayer(layer.id)}
                              className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                      <input
                        type="text"
                        value={layer.text}
                        onChange={(e) => updateTextLayer(layer.id, { text: e.target.value })}
                        placeholder={`Enter text for layer ${layer.id}...`}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Style</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Impact</option>
                    <option>Arial</option>
                    <option>Helvetica</option>
                    <option>Comic Sans MS</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size: {textLayers.find(l => l.id === activeLayerId)?.fontSize || fontSize}px
                  </label>
                  <input
                    type="range"
                    min="16"
                    max="64"
                    value={textLayers.find(l => l.id === activeLayerId)?.fontSize || fontSize}
                    onChange={(e) => {
                      const newSize = Number(e.target.value);
                      setFontSize(newSize);
                      updateTextLayer(activeLayerId, { fontSize: newSize });
                    }}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <input
                    type="color"
                    value={textLayers.find(l => l.id === activeLayerId)?.color || textColor}
                    onChange={(e) => {
                      const newColor = e.target.value;
                      setTextColor(newColor);
                      updateTextLayer(activeLayerId, { color: newColor });
                    }}
                    className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Center Panel - Meme Preview */}
          <div className="lg:col-span-6">
            <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center min-h-[500px]">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Meme"
                  className="max-w-full max-h-[400px] rounded-lg"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='200' y='150' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='16'%3EUpload an image to create your meme%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0">
                  {textLayers.map((layer) => (
                    <div
                      key={layer.id}
                      className={`absolute cursor-move ${layer.isActive ? 'ring-2 ring-blue-500' : ''}`}
                      style={{
                        left: `${layer.x}%`,
                        top: `${layer.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setActiveLayer(layer.id);
                        
                        const startX = e.clientX;
                        const startY = e.clientY;
                        const startLayerX = layer.x;
                        const startLayerY = layer.y;
                        
                        const handleMouseMove = (e: MouseEvent) => {
                          const deltaX = e.clientX - startX;
                          const deltaY = e.clientY - startY;
                          
                          const container = (e.currentTarget as HTMLElement)?.parentElement;
                          if (container) {
                            const rect = container.getBoundingClientRect();
                            const newX = Math.max(0, Math.min(100, startLayerX + (deltaX / rect.width) * 100));
                            const newY = Math.max(0, Math.min(100, startLayerY + (deltaY / rect.height) * 100));
                            
                            updateTextLayer(layer.id, { x: newX, y: newY });
                          }
                        };
                        
                        const handleMouseUp = () => {
                          document.removeEventListener('mousemove', handleMouseMove);
                          document.removeEventListener('mouseup', handleMouseUp);
                        };
                        
                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                      }}
                    >
                      <span 
                        className="text-white font-bold drop-shadow-lg select-none"
                        style={{ 
                          fontSize: `${layer.fontSize}px`,
                          color: layer.color,
                          textShadow: '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000'
                        }}
                      >
                        {layer.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Download/Share */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Meme</h3>
              
              {/* Small Preview */}
              <div className="mb-6">
                <div className="relative bg-gray-200 rounded-lg p-2">
                  <img
                    src={selectedImage}
                    alt="Meme Preview"
                    className="w-full h-32 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='128' viewBox='0 0 200 128'%3E%3Crect width='200' height='128' fill='%23f3f4f6'/%3E%3Ctext x='100' y='64' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='12'%3EPreview%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute inset-0">
                    {textLayers.map((layer) => (
                      <div
                        key={layer.id}
                        className="absolute"
                        style={{
                          left: `${layer.x}%`,
                          top: `${layer.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <span 
                          className="text-white font-bold text-xs drop-shadow-lg"
                          style={{ 
                            fontSize: `${Math.max(8, layer.fontSize / 4)}px`,
                            color: layer.color,
                            textShadow: '1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000'
                          }}
                        >
                          {layer.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Download Button */}
              <button
                onClick={downloadMeme}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium mb-4 flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Meme</span>
              </button>
              
              {/* Share Button */}
              <button className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg font-medium mb-6 hover:bg-gray-600 transition-colors">
                Share
              </button>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4 justify-center">
                <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
