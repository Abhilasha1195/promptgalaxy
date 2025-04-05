// src/app/tools/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';

const toolData = [
  { name: 'ChatGPT', slug: 'chatgpt', description: 'AI chatbot developed by OpenAI for conversation and productivity.' },
  { name: 'MidJourney', slug: 'midjourney', description: 'AI image generation tool that turns text prompts into art.' },
  { name: 'Jasper AI', slug: 'jasper-ai', description: 'AI writing assistant for marketing copy, emails, and more.' },
  { name: 'Runway ML', slug: 'runway-ml', description: 'Creative suite of AI tools for video, image, and audio editing.' },
  { name: 'Synthesia', slug: 'synthesia', description: 'AI video creation platform using avatars and voiceovers.' }
];

type ToolProps = {
  params: { slug: string }
};

export default function ToolDetailPage({ params }: ToolProps) {
  const tool = toolData.find(t => t.slug === params.slug);

  if (!tool) {
    notFound();
    return null; // this line is just to satisfy TypeScript
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{tool.name}</h1>
      <p className="text-lg text-gray-300 mb-6">{tool.description}</p>
      <p className="text-sm text-gray-500">More info coming soon...</p>
    </main>
  );
}
