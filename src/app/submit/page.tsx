'use client';

import { useState } from 'react';

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    url: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSubmitted(true);
      setFormData({ name: '', slug: '', description: '', url: '' });
    }
  };

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-green-500">🪐 Submit a New AI Tool</h1>

        {submitted && <p className="mb-6 text-green-300">✅ Tool submitted successfully!</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Tool Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 bg-black border border-green-700 rounded-md text-green-200"
          />
          <input
            type="text"
            name="slug"
            placeholder="Unique Slug (e.g., chatgpt)"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full p-3 bg-black border border-green-700 rounded-md text-green-200"
          />
          <textarea
            name="description"
            placeholder="Short description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-3 bg-black border border-green-700 rounded-md text-green-200"
            rows={4}
          />
          <input
            type="url"
            name="url"
            placeholder="https://example.com"
            value={formData.url}
            onChange={handleChange}
            required
            className="w-full p-3 bg-black border border-green-700 rounded-md text-green-200"
          />

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition"
          >
            🚀 Submit Tool
          </button>
        </form>
      </div>
    </main>
  );
}
