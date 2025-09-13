'use client';

import { useState } from 'react';
import { Type, Move, RotateCcw, RotateCw, Bold, Italic, Underline } from 'lucide-react';

interface TextLayer {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  strokeColor: string;
  strokeWidth: number;
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  textDecoration: 'none' | 'underline';
  rotation: number;
}

interface TextControlsProps {
  layers: TextLayer[];
  activeLayerId: string | null;
  onUpdateLayer: (layerId: string, updates: Partial<TextLayer>) => void;
  onAddLayer: () => void;
  onDeleteLayer: (layerId: string) => void;
  onMoveLayer: (layerId: string, direction: 'up' | 'down') => void;
}

const fontOptions = [
  { value: 'Impact', label: 'Impact' },
  { value: 'Arial Black', label: 'Arial Black' },
  { value: 'Comic Sans MS', label: 'Comic Sans MS' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Verdana', label: 'Verdana' }
];

const colorPresets = [
  '#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
  '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB', '#A52A2A'
];

export default function TextControls({
  layers,
  activeLayerId,
  onUpdateLayer,
  onAddLayer,
  onDeleteLayer,
  onMoveLayer
}: TextControlsProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const activeLayer = layers.find(layer => layer.id === activeLayerId);

  const generateAISuggestions = () => {
    // Mock AI suggestions - in real app, call AI API
    const suggestions = [
      "ME WHEN I SEE A NEW MEME SITE",
      "AND IT'S FINALLY EASY TO USE",
      "WHEN SOMEONE ASKS FOR MY OPINION",
      "AND I HAVE NO IDEA WHAT THEY'RE TALKING ABOUT",
      "WHEN I TRY TO BE PRODUCTIVE",
      "BUT END UP MAKING MEMES INSTEAD"
    ];
    setAiSuggestions(suggestions);
    setShowSuggestions(true);
  };

  const applySuggestion = (suggestion: string) => {
    if (activeLayer) {
      onUpdateLayer(activeLayer.id, { text: suggestion });
    }
    setShowSuggestions(false);
  };

  if (!activeLayer) {
    return (
      <div className="space-y-4">
        <div className="text-center py-8">
          <Type className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">No text selected</p>
          <button
            onClick={onAddLayer}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Text Layer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Layer Management */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-900">Text Layers</h3>
          <button
            onClick={onAddLayer}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            + Add Layer
          </button>
        </div>
        
        <div className="space-y-2">
          {layers.map((layer, index) => (
            <div
              key={layer.id}
              className={`flex items-center justify-between p-2 rounded-lg border ${
                activeLayerId === layer.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Move className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium">
                  Layer {index + 1}: {layer.text || 'Empty text'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => onMoveLayer(layer.id, 'up')}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onMoveLayer(layer.id, 'down')}
                  disabled={index === layers.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  <RotateCw className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onDeleteLayer(layer.id)}
                  className="p-1 text-red-400 hover:text-red-600"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Text Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Content
        </label>
        <div className="space-y-2">
          <textarea
            value={activeLayer.text}
            onChange={(e) => onUpdateLayer(activeLayer.id, { text: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="Enter your text here..."
          />
          <button
            onClick={generateAISuggestions}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            🤖 AI Caption Suggestions
          </button>
          
          {showSuggestions && (
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">AI Suggestions:</span>
                <button
                  onClick={() => setShowSuggestions(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => applySuggestion(suggestion)}
                  className="block w-full text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-white p-2 rounded border border-transparent hover:border-gray-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Font Controls */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Family
          </label>
          <select
            value={activeLayer.fontFamily}
            onChange={(e) => onUpdateLayer(activeLayer.id, { fontFamily: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Size: {activeLayer.fontSize}px
          </label>
          <input
            type="range"
            min="12"
            max="120"
            value={activeLayer.fontSize}
            onChange={(e) => onUpdateLayer(activeLayer.id, { fontSize: Number(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>

      {/* Font Style */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Style
        </label>
        <div className="flex space-x-2">
          <button
            onClick={() => onUpdateLayer(activeLayer.id, { 
              fontWeight: activeLayer.fontWeight === 'bold' ? 'normal' : 'bold' 
            })}
            className={`p-2 rounded border ${
              activeLayer.fontWeight === 'bold'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => onUpdateLayer(activeLayer.id, { 
              fontStyle: activeLayer.fontStyle === 'italic' ? 'normal' : 'italic' 
            })}
            className={`p-2 rounded border ${
              activeLayer.fontStyle === 'italic'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => onUpdateLayer(activeLayer.id, { 
              textDecoration: activeLayer.textDecoration === 'underline' ? 'none' : 'underline' 
            })}
            className={`p-2 rounded border ${
              activeLayer.textDecoration === 'underline'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Underline className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Color Controls */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Color
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={activeLayer.color}
              onChange={(e) => onUpdateLayer(activeLayer.id, { color: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={activeLayer.color}
              onChange={(e) => onUpdateLayer(activeLayer.id, { color: e.target.value })}
              className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
          <div className="grid grid-cols-6 gap-1">
            {colorPresets.map((color) => (
              <button
                key={color}
                onClick={() => onUpdateLayer(activeLayer.id, { color })}
                className="w-6 h-6 rounded border border-gray-300 hover:border-gray-400"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stroke/Outline Controls */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Outline
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={activeLayer.strokeColor}
              onChange={(e) => onUpdateLayer(activeLayer.id, { strokeColor: e.target.value })}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <span className="text-sm text-gray-600">Outline Color</span>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Outline Width: {activeLayer.strokeWidth}px
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={activeLayer.strokeWidth}
              onChange={(e) => onUpdateLayer(activeLayer.id, { strokeWidth: Number(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Advanced Controls Toggle */}
      <div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Controls
        </button>
        
        {showAdvanced && (
          <div className="mt-2 space-y-4 p-3 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rotation: {activeLayer.rotation}°
              </label>
              <input
                type="range"
                min="-180"
                max="180"
                value={activeLayer.rotation}
                onChange={(e) => onUpdateLayer(activeLayer.id, { rotation: Number(e.target.value) })}
                className="w-full"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  X Position: {activeLayer.x}
                </label>
                <input
                  type="range"
                  min="0"
                  max="800"
                  value={activeLayer.x}
                  onChange={(e) => onUpdateLayer(activeLayer.id, { x: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Y Position: {activeLayer.y}
                </label>
                <input
                  type="range"
                  min="0"
                  max="600"
                  value={activeLayer.y}
                  onChange={(e) => onUpdateLayer(activeLayer.id, { y: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
