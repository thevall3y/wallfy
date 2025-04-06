"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { wallpapers } from "@/data/wallpapers";
import WallpaperCard from "./WallpaperCard";
import WallpaperModal from "./WallpaperModal";
import type { Wallpaper } from "@/data/wallpapers";

const WallpaperGrid = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "All";
  
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);

  const filteredWallpapers = category === "All" 
    ? wallpapers 
    : wallpapers.filter(wallpaper => wallpaper.category === category);

  return (
    <div className="flex-1 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredWallpapers.map((wallpaper) => (
          <WallpaperCard 
            key={wallpaper.id} 
            wallpaper={wallpaper}
            onClick={() => setSelectedWallpaper(wallpaper)}
          />
        ))}
      </div>
      
      <WallpaperModal 
        wallpaper={selectedWallpaper}
        isOpen={!!selectedWallpaper}
        onClose={() => setSelectedWallpaper(null)}
      />
    </div>
  );
};

export default WallpaperGrid; 