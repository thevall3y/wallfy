"use client";

import React from "react";
import Image from "next/image";
import type { Wallpaper } from "@/data/wallpapers";
import { X, Download, Info } from "lucide-react";

interface WallpaperModalProps {
  wallpaper: Wallpaper | null;
  isOpen: boolean;
  onClose: () => void;
}

const WallpaperModal = ({ wallpaper, isOpen, onClose }: WallpaperModalProps) => {
  if (!isOpen || !wallpaper) return null;
  
  // This function would be used to handle downloads in a real app
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real implementation, this would trigger a download
    console.log(`Downloading ${wallpaper.title}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl max-h-[90vh] m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <div className="relative w-full h-[80vh]">
          <Image
            src={`${wallpaper.imageUrl}?auto=format&q=80`}
            alt={wallpaper.title}
            fill
            className="object-contain"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-black/0 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{wallpaper.title}</h2>
              <p className="text-sm opacity-80">{wallpaper.description}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                onClick={() => {}}
                aria-label="Information"
              >
                <Info size={20} />
              </button>
              <button 
                className="p-2 bg-primary rounded-full hover:bg-primary/80 transition-colors"
                onClick={handleDownload}
                aria-label="Download"
              >
                <Download size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperModal; 