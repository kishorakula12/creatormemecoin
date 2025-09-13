'use client';

import { Heart, Github, Twitter, Instagram, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">MemeFactory</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              The ultimate meme generator that makes creating and sharing memes as easy as clicking a button. 
              Create viral content with our AI-powered suggestions and professional tools.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#templates" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                  <ExternalLink className="w-3 h-3" />
                  <span>Templates</span>
                </a>
              </li>
              <li>
                <a href="#trending" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                  <ExternalLink className="w-3 h-3" />
                  <span>Trending Memes</span>
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                  <ExternalLink className="w-3 h-3" />
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a href="#help" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                  <ExternalLink className="w-3 h-3" />
                  <span>Help Center</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#cookies" className="text-gray-300 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#dmca" className="text-gray-300 hover:text-white transition-colors">
                  DMCA
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 MemeFactory. All rights reserved. Made with ❤️ for meme lovers everywhere.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Powered by AI</span>
              <span>•</span>
              <span>Built with Next.js</span>
              <span>•</span>
              <span>Hosted on Vercel</span>
            </div>
          </div>
        </div>

        {/* Copyright Tips */}
        <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
          <h4 className="text-sm font-semibold text-blue-300 mb-2">📝 Copyright Tips</h4>
          <p className="text-xs text-blue-200">
            When creating memes, please respect copyright laws. Use your own images or images with proper licensing. 
            Avoid using copyrighted characters or logos without permission. When in doubt, create original content!
          </p>
        </div>
      </div>
    </footer>
  );
}
