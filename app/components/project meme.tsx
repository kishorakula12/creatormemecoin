'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Star, Grid3X3, Users, LogIn } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Simulate user login state - in real app, get from auth context
    const savedUser = localStorage.getItem('memeUser');
    if (savedUser) {
      setUserName(savedUser);
    }
  }, []);

  const handleLogin = () => {
    const name = prompt('Enter your name:');
    if (name) {
      setUserName(name);
      localStorage.setItem('memeUser', name);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#templates" className="text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center space-x-1">
              <Grid3X3 className="w-4 h-4" />
              <span>Templates</span>
            </a>
            <a href="#trending" className="text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>Top Memes</span>
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>About us</span>
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>Connect</span>
            </a>
            {userName ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Welcome back, {userName}!</span>
                <button 
                  onClick={() => {
                    setUserName(null);
                    localStorage.removeItem('memeUser');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <a href="#templates" className="text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center space-x-2">
                <Grid3X3 className="w-4 h-4" />
                <span>Templates</span>
              </a>
              <a href="#trending" className="text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span>Top Memes</span>
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>About us</span>
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Connect</span>
              </a>
              {userName ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Welcome back, {userName}!</span>
                  <button 
                    onClick={() => {
                      setUserName(null);
                      localStorage.removeItem('memeUser');
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleLogin}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}