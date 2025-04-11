'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function HomeClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // Used in filter logic

  const typedTools = ['Tool 1', 'Tool 2', 'Tool 3']; // Example tools

  // Example usage of variables
  const handleSearch = () => {
    console.log('Search Term:', searchTerm);
  };

  const categories = ['Category 1', 'Category 2', 'Category 3']; // Example categories

  return (
    <main
      style={{
        fontFamily: 'Inter, sans-serif',
        color: '#333',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        padding: '1rem',
      }}
    >
      {/* Search Section */}
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          style={{
            padding: '0.5rem',
            borderRadius: '8px',
            border: '1px solid #ddd',
            width: '200px',
            marginRight: '1rem',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: '1px solid #0078D4',
            backgroundColor: '#0078D4',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>

      {/* Categories Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#0078D4' }}>
          Categories
        </h3>
        <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', gap: '1rem' }}>
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                console.log('Selected Category:', category); // Now used
              }}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: '1px solid #0078D4',
                backgroundColor: selectedCategory === category ? '#0078D4' : '#fff',
                color: selectedCategory === category ? '#fff' : '#0078D4',
                cursor: 'pointer',
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Tools Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#0078D4' }}>
          Typed Tools
        </h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {typedTools.map((tool) => (
            <li key={tool} style={{ marginBottom: '0.5rem' }}>
              {tool}
            </li>
          ))}
        </ul>
      </div>

      {/* Image Section */}
      <div>
        <Image
          src="/example-image.png"
          alt="Example Image"
          width={800}
          height={400}
          style={{
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      </div>
    </main>
  );
}