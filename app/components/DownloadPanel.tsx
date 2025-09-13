'use client';

import { useState } from 'react';
import { Download, Twitter, Instagram, Mail, Copy, Settings, FileImage } from 'lucide-react';

interface DownloadPanelProps {
  onDownload: (format: string, quality: number) => void;
  onShare: (platform: string) => void;
  memeUrl?: string;
}

export default function DownloadPanel({ onDownload, onShare, memeUrl }: DownloadPanelProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('png');
  const [downloadQuality, setDownloadQuality] = useState(100);
  const [shareText, setShareText] = useState('Check out this awesome meme I created! #MemeFactory #MemeGenerator');

  const handleDownload = () => {
    onDownload(downloadFormat, downloadQuality);
  };

  const handleShare = (platform: string) => {
    onShare(platform);
  };

  const copyToClipboard = async () => {
    if (memeUrl) {
      try {
        await navigator.clipboard.writeText(memeUrl);
        alert('Meme URL copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  const generateHashtags = () => {
    const hashtags = [
      '#MemeFactory',
      '#MemeGenerator',
      '#Funny',
      '#Meme',
      '#Viral',
      '#Trending',
      '#Humor',
      '#Comedy'
    ];
    return hashtags.join(' ');
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Download & Share</h3>
      
      {/* Meme Preview */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
        <div className="aspect-square bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
          {memeUrl ? (
            <img
              src={memeUrl}
              alt="Meme preview"
              className="max-w-full max-h-full object-contain rounded"
            />
          ) : (
            <div className="text-center text-gray-500">
              <FileImage className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">No meme to preview</p>
            </div>
          )}
        </div>
      </div>

      {/* Download Settings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-700">Download Options</h4>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>

        {showSettings && (
          <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Format
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="png"
                    checked={downloadFormat === 'png'}
                    onChange={(e) => setDownloadFormat(e.target.value)}
                    className="text-blue-600"
                  />
                  <FileImage className="w-4 h-4" />
                  <span className="text-sm">PNG</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="jpg"
                    checked={downloadFormat === 'jpg'}
                    onChange={(e) => setDownloadFormat(e.target.value)}
                    className="text-blue-600"
                  />
                  <FileImage className="w-4 h-4" />
                  <span className="text-sm">JPG</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality: {downloadQuality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={downloadQuality}
                onChange={(e) => setDownloadQuality(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Smaller file</span>
                <span>Better quality</span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleDownload}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Download className="w-5 h-5" />
          <span>Download Meme</span>
        </button>
      </div>

      {/* Share Options */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Share Your Meme</h4>
        
        {/* Share Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Share Text
          </label>
          <textarea
            value={shareText}
            onChange={(e) => setShareText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
            rows={2}
            placeholder="Enter your share message..."
          />
          <div className="flex justify-between items-center mt-2">
            <button
              onClick={() => setShareText(generateHashtags())}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Generate hashtags
            </button>
            <span className="text-xs text-gray-500">{shareText.length}/280</span>
          </div>
        </div>

        {/* Social Media Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleShare('twitter')}
            className="flex items-center justify-center space-x-2 bg-blue-400 text-white py-2 px-3 rounded-lg hover:bg-blue-500 transition-colors text-sm"
          >
            <Twitter className="w-4 h-4" />
            <span>Twitter</span>
          </button>
          
          <button
            onClick={() => handleShare('instagram')}
            className="flex items-center justify-center space-x-2 bg-pink-500 text-white py-2 px-3 rounded-lg hover:bg-pink-600 transition-colors text-sm"
          >
            <Instagram className="w-4 h-4" />
            <span>Instagram</span>
          </button>
          
          <button
            onClick={() => handleShare('email')}
            className="flex items-center justify-center space-x-2 bg-gray-600 text-white py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors text-sm"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </button>
          
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center space-x-2 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <Copy className="w-4 h-4" />
            <span>Copy Link</span>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <button className="w-full text-left text-sm text-blue-600 hover:text-blue-800 py-1">
            Save to Favorites
          </button>
          <button className="w-full text-left text-sm text-blue-600 hover:text-blue-800 py-1">
            Create Similar Meme
          </button>
          <button className="w-full text-left text-sm text-blue-600 hover:text-blue-800 py-1">
            Print Meme
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-xs text-gray-500 text-center">
        <p>MemeFactory • Create, Share, Laugh</p>
        <p>© 2024 All rights reserved</p>
      </div>
    </div>
  );
}
