import { notFound } from 'next/navigation';

type Tool = {
  name: string;
  slug: string;
  description: string;
};

const tools: Tool[] = [
  { name: 'ChatGPT', slug: 'chatgpt', description: 'AI chatbot developed by OpenAI.' },
  { name: 'MidJourney', slug: 'midjourney', description: 'AI image generation tool.' },
  { name: 'Jasper AI', slug: 'jasper-ai', description: 'AI writing assistant.' },
  { name: 'Runway ML', slug: 'runway-ml', description: 'Creative AI suite for media editing.' },
  { name: 'Synthesia', slug: 'synthesia', description: 'AI video creation with avatars.' }
];

// ✅ Explicitly define the type for dynamic route parameters
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ✅ Export an async function to resolve params
export default async function ToolPage({ params }: PageProps) {
  const resolvedParams = await params; // Resolve the Promise
  const tool = tools.find((tool) => tool.slug === resolvedParams.slug);

  if (!tool) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-4">{tool.name}</h1>
      <p className="text-lg text-gray-300">{tool.description}</p>
    </main>
  );
}