// /app/tools/[slug]/page.tsx

import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

type Tool = {
  name: string;
  slug: string;
  description: string;
  website?: string;
};

async function getToolBySlug(slug: string): Promise<Tool | null> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'tools.json');
    const file = await fs.readFile(filePath, 'utf-8');
    const tools: Tool[] = JSON.parse(file); // Parse the file directly as an array
    return tools.find((t) => t.slug === slug) || null;
  } catch (error) {
    console.error('Error reading tools.json:', error);
    return null;
  }
}

export default async function ToolPage({
  params,
}: {
  params: { slug: string };
}) {
  const tool = await getToolBySlug(params.slug);

  if (!tool) return notFound();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{tool.name}</h1>
        <p className="text-lg text-gray-300">{tool.description}</p>
        {tool.website && (
          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-blue-400 underline hover:text-blue-200"
          >
            Visit {tool.name}
          </a>
        )}
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'data', 'tools.json');

  try {
    const file = await fs.readFile(filePath, 'utf-8');
    const tools: Tool[] = JSON.parse(file); // Parse the file directly as an array

    return tools.map((tool) => ({
      slug: tool.slug,
    }));
  } catch (error) {
    console.error('Error reading tools.json:', error);
    return [];
  }
}
