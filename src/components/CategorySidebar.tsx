"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories, Category } from "@/data/wallpapers";

const CategorySidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";

  const handleCategoryChange = (category: Category) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <aside className="w-full md:w-64 p-4 border-r md:min-h-[calc(100vh-4rem)]">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <div className="space-y-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              currentCategory === category
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default CategorySidebar; 