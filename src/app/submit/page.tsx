'use client';

import { useState } from 'react';

type Tool = {
  name: string;
  slug: string;
  description: string;
};

let toolStore: Tool[] = [
  { name: 'ChatGPT', slug: 'chatgpt', description: 'AI chatbot developed by OpenAI for conversation and productivity.' },
  { name: 'MidJourney', slug: 'midjourney', description: 'AI image generation tool that turns text prompts into art.' },
  { name: 'Jasper AI', slug: 'jasper-ai', description: 'AI writing assistant for marketing copy, emails, and more.' },
  { name: 'Runway ML', slug: 'runway-ml', description: 'Creative suite of AI tools for video, image, and audio editing.' },
  { name: 'Synthesia', slug: 'synthesia', description: 'AI video creation platform using avatars and voiceovers.' }
];

export default function SubmitPage() {
  const [form, setForm] = useState({ name: '', slug: '', description: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.slug || !form.description) return;

    toolStore.push({ ...form });
    setForm({ name: '', slug: '', description: '' });
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Submit a New AI Tool</h1>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <label className="block mb-1">Tool Name</label>
          <input
            className="w-full p-2 rounded bg-white text-black"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Slug (e.g. chatgpt)</label>
          <input
            className="w-full p-2 rounded bg-white text-black"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            className="w-full p-2 rounded bg-white text-black"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">
          Submit Tool
        </button>
      </form>

      {submitted && <p className="mt-6 text-green-400">✅ Tool submitted successfully (in memory).</p>}
    </main>
  );
}
