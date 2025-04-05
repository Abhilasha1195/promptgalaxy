'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const toolData = [
  { name: 'ChatGPT', slug: 'chatgpt', description: 'AI chatbot developed by OpenAI for conversation and productivity.' },
  { name: 'MidJourney', slug: 'midjourney', description: 'AI image generation tool that turns text prompts into art.' },
  { name: 'Jasper AI', slug: 'jasper-ai', description: 'AI writing assistant for marketing copy, emails, and more.' },
  { name: 'Runway ML', slug: 'runway-ml', description: 'Creative suite of AI tools for video, image, and audio editing.' },
  { name: 'Synthesia', slug: 'synthesia', description: 'AI video creation platform using avatars and voiceovers.' }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [year] = useState<number>(new Date().getFullYear());

  const filteredTools = toolData.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-100 via-blue-100 to-white text-gray-900 px-6 py-12">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-teal-800">PromptGalaxy 🚀</h1>
        <nav className="space-x-6 text-teal-700 font-medium">
          <Link href="/tools" className="hover:underline">All Tools</Link>
          <Link href="/categories" className="hover:underline">Categories</Link>
          <Link href="/submit" className="hover:underline">Submit a Tool</Link>
        </nav>
      </header>

      <section className="text-center mb-16">
        <h2 className="text-4xl font-extrabold mb-4 text-teal-800">Discover the Best AI Tools in the Universe</h2>
        <p className="text-lg text-gray-600 mb-6">Explore curated tools for writing, design, productivity, and more.</p>
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search tools..."
            className="w-full p-3 rounded-xl bg-white text-gray-800 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-teal-700">All AI Tools</h3>
        {filteredTools.length === 0 ? (
          <p className="text-gray-500">No tools found for &quot;{searchTerm}&quot;</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <div key={tool.slug} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <h4 className="text-xl font-bold text-teal-800 mb-2">{tool.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="inline-block px-4 py-2 border border-teal-700 text-teal-700 rounded-full hover:bg-teal-700 hover:text-white transition"
                >
                  Explore
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="text-center text-sm text-gray-400 mt-24">
        © {year} PromptGalaxy. Built to flip 🚀
      </footer>
    </main>
  );
}
