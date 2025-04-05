'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-indigo-950 text-white shadow-md">
      <h1 className="text-2xl font-bold">
        <Link href="/">PromptGalaxy 🚀</Link>
      </h1>
      <nav className="space-x-6">
        <Link href="/tools" className="hover:underline">All Tools</Link>
        <Link href="/categories" className="hover:underline">Categories</Link>
        <Link href="/submit" className="hover:underline">Submit a Tool</Link>
      </nav>
    </header>
  );
}

