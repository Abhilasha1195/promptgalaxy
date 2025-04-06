import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

type Tool = {
  name: string;
  slug: string;
  description: string;
  website?: string;
};

type Props = {
  params: {
    slug: string;
  };
};

async function getToolBySlug(slug: string): Promise<Tool | null> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'tools.json');
    const file = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(file);
    const tools: Tool[] = json.data || [];

    return tools.find((tool) => tool.slug === slug) || null;
  } catch (err) {
    console.error('Failed to read tools.json:', err);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'tools.json');
    const file = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(file);
    const tools: Tool[] = json.data || [];

    return tools.map((tool) => ({ slug: tool.slug }));
  } catch (err) {
    console.error('Failed to generate static params:', err);
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const tool = await getToolBySlug(params.slug);
  if (!tool) {
    return { title: 'Tool Not Found - PromptGalaxy' };
  }

  return {
    title: `${tool.name} - PromptGalaxy`,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: Props) {
  const tool = await getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-black p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold">{tool.name}</h1>
        <p className="mt-4 text-lg">{tool.description}</p>
        {tool.website && (
          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-6 text-blue-600 underline"
          >
            Visit Website
          </a>
        )}
      </div>
    </main>
  );
}
