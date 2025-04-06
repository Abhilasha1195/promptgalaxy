import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import Head from 'next/head';

type Tool = {
  name: string;
  slug: string;
  description: string;
};

async function getToolBySlug(slug: string): Promise<Tool | null> {
  try {
    if (!slug || typeof slug !== 'string') {
      return null;
    }

    const filePath = path.join(process.cwd(), 'tools.json');
    const file = await fs.readFile(filePath, 'utf-8');
    const tools: Tool[] = JSON.parse(file);
    const tool = tools.find((t) => t.slug === slug);
    return tool || null;
  } catch (error) {
    console.error('Error reading tools.json:', error);
    return null;
  }
}

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const tool = await getToolBySlug(params.slug);

  if (!tool) {
    return notFound();
  }

  return (
    <>
      <Head>
        <title>{tool.name} - PromptGalaxy</title>
        <meta name="description" content={tool.description} />
        <meta property="og:title" content={`${tool.name} - PromptGalaxy`} />
        <meta property="og:description" content={tool.description} />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{tool.name}</h1>
          <p className="text-lg text-gray-300">{tool.description}</p>
          <p className="mt-10 text-sm text-gray-500">Slug: <code>{tool.slug}</code></p>
        </div>
      </main>
    </>
  );
}