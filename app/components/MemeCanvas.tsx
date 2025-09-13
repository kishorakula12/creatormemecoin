'use client';

import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

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

interface MemeCanvasProps {
  imageUrl: string;
  layers: TextLayer[];
  activeLayerId: string | null;
  onLayerSelect: (layerId: string) => void;
  onLayerUpdate: (layerId: string, updates: Partial<TextLayer>) => void;
  onLayerDelete: (layerId: string) => void;
}

export default function MemeCanvas({
  imageUrl,
  layers,
  activeLayerId,
  onLayerSelect,
  onLayerUpdate,
  onLayerDelete
}: MemeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Fabric.js canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 600,
      height: 400,
      backgroundColor: '#f8f9fa'
    });

    fabricCanvasRef.current = canvas;

    // Load background image
    if (imageUrl) {
      fabric.Image.fromURL(imageUrl).then((img) => {
        if (img) {
          // Scale image to fit canvas while maintaining aspect ratio
          const canvasWidth = canvas.width!;
          const canvasHeight = canvas.height!;
          const imgAspect = img.width! / img.height!;
          const canvasAspect = canvasWidth / canvasHeight;

          let scaleX = canvasWidth / img.width!;
          let scaleY = canvasHeight / img.height!;

          if (imgAspect > canvasAspect) {
            scaleY = scaleX;
          } else {
            scaleX = scaleY;
          }

          img.scale(Math.min(scaleX, scaleY));
          img.set({
            left: (canvasWidth - img.getScaledWidth()) / 2,
            top: (canvasHeight - img.getScaledHeight()) / 2,
            selectable: false,
            evented: false
          });

          canvas.backgroundImage = img;
          canvas.renderAll();
          setIsLoading(false);
        }
      });
    } else {
      setIsLoading(false);
    }

    // Handle object selection
    canvas.on('selection:created', (e) => {
      const activeObject = e.selected?.[0];
      if (activeObject && (activeObject as fabric.Object & { data?: { layerId: string } }).data?.layerId) {
        onLayerSelect((activeObject as fabric.Object & { data: { layerId: string } }).data.layerId);
      }
    });

    canvas.on('selection:updated', (e) => {
      const activeObject = e.selected?.[0];
      if (activeObject && (activeObject as fabric.Object & { data?: { layerId: string } }).data?.layerId) {
        onLayerSelect((activeObject as fabric.Object & { data: { layerId: string } }).data.layerId);
      }
    });

    canvas.on('selection:cleared', () => {
      onLayerSelect('');
    });

    // Handle object modification
    canvas.on('object:modified', (e) => {
      const activeObject = e.target;
      if (activeObject && (activeObject as fabric.Object & { data?: { layerId: string } }).data?.layerId) {
        const updates: Partial<TextLayer> = {
          x: activeObject.left || 0,
          y: activeObject.top || 0,
          rotation: activeObject.angle || 0,
          fontSize: (activeObject as fabric.Text).fontSize || 20
        };
        onLayerUpdate((activeObject as fabric.Object & { data: { layerId: string } }).data.layerId, updates);
      }
    });

    return () => {
      canvas.dispose();
    };
  }, [imageUrl, onLayerSelect, onLayerUpdate]);

  // Update text layers when layers change
  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    const existingTexts = canvas.getObjects().filter(obj => obj.type === 'text');
    
    // Remove existing text objects
    existingTexts.forEach(obj => canvas.remove(obj));

    // Add new text layers
    layers.forEach((layer) => {
      if (layer.text.trim()) {
        const text = new fabric.Text(layer.text, {
          left: layer.x,
          top: layer.y,
          fontSize: layer.fontSize,
          fontFamily: layer.fontFamily,
          fill: layer.color,
          stroke: layer.strokeColor,
          strokeWidth: layer.strokeWidth,
          fontWeight: layer.fontWeight,
          fontStyle: layer.fontStyle,
          textDecoration: layer.textDecoration === 'underline' ? 'underline' : '',
          angle: layer.rotation,
          data: { layerId: layer.id }
        });

        canvas.add(text);
      }
    });

    canvas.renderAll();
  }, [layers]);

  // Update active layer selection
  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    const objects = canvas.getObjects();
    
    objects.forEach(obj => {
      if ((obj as fabric.Object & { data?: { layerId: string } }).data?.layerId === activeLayerId) {
        canvas.setActiveObject(obj);
        canvas.renderAll();
      }
    });
  }, [activeLayerId]);

  const downloadMeme = () => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2 // High resolution for download
    });

    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = dataURL;
    link.click();
  };

  const shareMeme = () => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 0.8,
      multiplier: 1
    });

    // In a real app, upload to server and get shareable URL
    navigator.clipboard.writeText(dataURL);
    alert('Meme copied to clipboard!');
  };

  return (
    <div className="space-y-4">
      {/* Canvas Container */}
      <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center min-h-[400px]">
        {isLoading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading canvas...</p>
          </div>
        ) : (
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="border border-gray-300 rounded-lg shadow-lg max-w-full max-h-[400px]"
            />
            {!imageUrl && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center text-gray-500">
                  <p className="text-lg font-medium mb-2">No image selected</p>
                  <p className="text-sm">Upload an image or choose a template to start creating</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Canvas Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={downloadMeme}
          disabled={!imageUrl || layers.length === 0}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download</span>
        </button>
        
        <button
          onClick={shareMeme}
          disabled={!imageUrl || layers.length === 0}
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          <span>Share</span>
        </button>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-gray-600">
        <p>Click and drag text to move • Drag corners to resize • Use mouse wheel to rotate</p>
      </div>
    </div>
  );
}
