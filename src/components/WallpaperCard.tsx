"use client";

import React from "react";
import Image from "next/image";
import type { Wallpaper } from "@/data/wallpapers";

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  onClick: () => void;
}

const WallpaperCard = ({ wallpaper, onClick }: WallpaperCardProps) => {
  return (
    <div 
      className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="relative h-64 w-full">
        <Image
          src={`${wallpaper.imageUrl}?auto=format&fit=crop&w=600&q=60`}
          alt={wallpaper.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <h3 className="text-lg font-semibold">{wallpaper.title}</h3>
        <p className="text-sm opacity-90">{wallpaper.category}</p>
      </div>
    </div>
  );
};

export default WallpaperCard; 