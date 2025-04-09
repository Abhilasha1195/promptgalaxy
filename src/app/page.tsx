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
  image?: string; // ✅ optional image field
};

const typedTools: Tool[] = tools.flat();

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(typedTools.map((tool) => tool.category)))];

  const filteredTools: Tool[] = typedTools.filter((tool) => {
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
      {/* Hero Section */}
      <header
        style={{
          background: 'linear-gradient(90deg, #0078D4, #005A9E)',
          color: '#fff',
          textAlign: 'center',
          padding: '4rem 2rem',
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          PromptGalaxy
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Discover the best AI tools to boost your productivity and creativity.
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <input
            type="text"
            placeholder="Search AI tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '0.8rem 1rem',
              borderRadius: '8px',
              border: 'none',
              width: '300px',
              outline: 'none',
              fontSize: '1rem',
            }}
          />
        </div>
      </header>

      {/* Category Filters */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '2rem auto',
          padding: '0 1rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: '1px solid #0078D4',
              backgroundColor: selectedCategory === category ? '#0078D4' : '#fff',
              color: selectedCategory === category ? '#fff' : '#0078D4',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: 'bold',
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '2rem auto',
          padding: '0 1rem',
        }}
      >
        <h2
          style={{
            fontSize: '2rem',
            marginBottom: '1.5rem',
            color: '#0078D4',
            textAlign: 'center',
          }}
        >
          Explore Tools
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredTools.map((tool: Tool) => (
            <div
              key={tool.slug}
              style={{
                padding: '1.5rem',
                border: '1px solid #ddd',
                borderRadius: '12px',
                backgroundColor: '#fff',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'scale(1.05)';
                el.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'scale(1)';
                el.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Tool Image */}
              {tool.image && (
                <img
                  src={tool.image}
                  alt={`${tool.name} logo`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/fallback-image.png';
                  }}
                  style={{
                    width: '100%',
                    height: '140px',
                    objectFit: 'contain',
                    marginBottom: '1rem',
                  }}
                />
              )}

              {/* Tool Name */}
              <h3
                style={{
                  fontSize: '1.5rem',
                  marginBottom: '0.8rem',
                  color: '#0078D4',
                }}
              >
                <Link href={`/tools/${tool.slug}`} style={{ textDecoration: 'none', color: '#0078D4' }}>
                  {tool.name}
                </Link>
              </h3>

              {/* Tool Description */}
              <p style={{ color: '#555', marginBottom: '1rem', fontSize: '1rem' }}>
                {tool.description}
              </p>

              {/* Visit Button */}
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#0078D4',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
              >
                Visit Website →
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
