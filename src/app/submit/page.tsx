'use client';

import { useState } from 'react';

export default function SubmitToolPage() {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Submitting...');

    try {
      const res = await fetch('/api/tools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setMessage('✅ Tool submitted successfully!');
        setFormData({ name: '', slug: '', description: '' });
      } else {
        setMessage('❌ Failed to submit the tool.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setMessage('⚠️ An error occurred.');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Submit a New Tool</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          type="text"
          name="name"
          placeholder="Tool Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="text"
          name="slug"
          placeholder="tool-slug"
          value={formData.slug}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <textarea
          name="description"
          placeholder="Tool description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full p-2 rounded bg-gray-800 text-white"
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded"
        >
          Submit
        </button>
        {message && <p className="mt-2 text-sm text-green-400">{message}</p>}
      </form>
    </main>
  );
}
