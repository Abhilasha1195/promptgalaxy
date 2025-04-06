'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

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

const ToolCard = ({ tool }: { tool: Tool }) => (
  <Link key={tool.slug} href={`/tools/${tool.slug}`} passHref>
    <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] hover:from-[#334155] hover:to-[#1e293b] p-6 rounded-2xl shadow-lg cursor-pointer transition duration-300 border border-white/10">
      <h2 className="text-xl font-semibold mb-2 text-white">{tool.name}</h2>
      <p className="text-gray-400 text-sm">{tool.description}</p>
    </div>
  </Link>
);

export default function Home() {
  const [search, setSearch] = useState('');

  const filteredTools = toolStore.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>PromptGalaxy - Discover AI Tools</title>
        <meta name="description" content="Search and discover AI tools on PromptGalaxy." />
        <meta property="og:title" content="PromptGalaxy - Discover AI Tools" />
        <meta property="og:description" content="Search and discover AI tools on PromptGalaxy." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://promptgalaxy.vercel.app/" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] text-white px-6 py-10">
        <h1 className="text-5xl font-extrabold text-center mb-10 tracking-tight text-white drop-shadow-lg">
          🚀 PromptGalaxy
        </h1>

        <div className="max-w-xl mx-auto mb-12">
          <input
            type="text"
            placeholder="🔍 Search for an AI tool..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search for AI tools"
            className="w-full px-5 py-3 text-lg rounded-xl bg-white text-black placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)
          ) : (
            <p className="text-center text-gray-400">No tools found. Try a different search.</p>
          )}
        </div>

        <div className="mt-16 text-center">
          <Link href="/submit" className="text-sm text-blue-400 underline hover:text-blue-200 transition">
            ✨ Submit a new tool
          </Link>
        </div>
      </main>
    </>
  );
}