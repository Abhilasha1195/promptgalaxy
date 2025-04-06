'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Tool = {
  name: string;
  slug: string;
  description: string;
};

const toolStore: Tool[] = [
  { name: 'ChatGPT', slug: 'chatgpt', description: 'AI chatbot developed by OpenAI for conversation and productivity.' },
  { name: 'MidJourney', slug: 'midjourney', description: 'AI image generation tool that turns text prompts into art.' },
  { name: 'Jasper AI', slug: 'jasper-ai', description: 'AI writing assistant for marketing copy, emails, and more.' },
  { name: 'Runway ML', slug: 'runway-ml', description: 'Creative suite of AI tools for video, image, and audio editing.' },
  { name: 'Synthesia', slug: 'synthesia', description: 'AI video creation platform using avatars and voiceovers.' }
];

export default function Home() {
  const [search, setSearch] = useState('');

  const filteredTools = toolStore.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">🌌 PromptGalaxy</h1>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg text-black"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4">
        {filteredTools.map((tool) => (
          <Link key={tool.slug} href={`/tools/${tool.slug}`} passHref>
            <div className="bg-white bg-opacity-10 hover:bg-opacity-20 p-6 rounded-2xl shadow-md cursor-pointer transition">
              <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
              <p className="text-gray-300 text-sm">{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-gray-500">
        <Link href="/submit" className="underline hover:text-white">
          Submit a new tool
        </Link>
      </div>
    </main>
  );
}
