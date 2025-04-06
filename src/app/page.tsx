'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

type Tool = {
  name: string;
  slug: string;
  description: string;
};

const ToolCard = ({ tool }: { tool: Tool }) => (
  <Link key={tool.slug} href={`/tools/${tool.slug}`} passHref>
    <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] hover:from-[#334155] hover:to-[#1e293b] p-6 rounded-2xl shadow-lg cursor-pointer transition duration-300 border border-white/10">
      <h2 className="text-xl font-semibold mb-2 text-white">{tool.name}</h2>
      <p className="text-gray-400 text-sm">{tool.description}</p>
    </div>
  </Link>
);

export default function Home() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Load tools from the API
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await fetch('/api/tools');
        const data = await res.json();
        console.log('Fetched tools data:', data);
  
        if (Array.isArray(data.data)) {
          setTools(data.data);
        } else {
          console.error('Unexpected data format:', data);
          setTools([]);
        }
      } catch (error) {
        console.error('Error fetching tools:', error);
        setTools([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTools();
  }, []);
  


  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-center text-gray-400">Loading tools...</p>;
  }

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