'use client';
import React, { useState } from 'react';

export default function SubmitToolPage() {
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    link: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted tool:', form);
    alert('Tool submitted (not saved, this is just a demo)!');
    setForm({ name: '', slug: '', description: '', link: '' });
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Submit a New AI Tool</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          type="text"
          name="name"
          placeholder="Tool Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
          required
        />
        <input
          type="text"
          name="slug"
          placeholder="Tool Slug (e.g., chatgpt)"
          value={form.slug}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
          required
        />
        <input
          type="url"
          name="link"
          placeholder="Website URL"
          value={form.link}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
          required
        />
        <textarea
          name="description"
          placeholder="Short Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
          rows={4}
          required
        />
        <button type="submit" className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500">
          Submit Tool
        </button>
      </form>
    </main>
  );
}

  