'use client';

import Link from 'next/link';
import { useState } from 'react';
import tools from '@/data/tools.json';

type Tool = {
  name: string;
  slug: string;
  description: string;
  url: string;
  category: string;
  image?: string;
};

const typedTools: Tool[] = tools.flat();

export default function HomeClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(typedTools.map((tool) => tool.category)))];

  const filteredTools: Tool[] = typedTools.filter((tool: Tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main
      style={{
        fontFamily: 'Inter, sans-serif',
        color: '#333',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
      }}
    >
      {/* Add back your hero, search bar, category filters, and tool grid here */}
      {/* I can paste them again if needed */}
    </main>
  );
}
