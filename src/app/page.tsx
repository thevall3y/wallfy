import Header from "@/components/Header";
import WallpaperGrid from "@/components/WallpaperGrid";
import CategorySidebar from "@/components/CategorySidebar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="flex flex-col md:flex-row">
        <CategorySidebar />
        <WallpaperGrid />
      </div>
    </main>
  );
} 