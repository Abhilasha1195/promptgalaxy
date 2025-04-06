import Link from 'next/link';
import { notFound } from 'next/navigation';

const toolData = [
  {
    name: 'ChatGPT',
    slug: 'chatgpt',
    description: 'AI chatbot developed by OpenAI for conversation and productivity.',
    tags: ['Chatbot', 'Productivity', 'Free'],
    link: 'https://chat.openai.com/',
  },
  {
    name: 'MidJourney',
    slug: 'midjourney',
    description: 'AI image generation tool that turns text prompts into art.',
    tags: ['Image', 'Art', 'Paid'],
    link: 'https://www.midjourney.com/',
  },
  {
    name: 'Jasper AI',
    slug: 'jasper-ai',
    description: 'AI writing assistant for marketing copy, emails, and more.',
    tags: ['Writing', 'Copywriting', 'Marketing'],
    link: 'https://www.jasper.ai/',
  },
  {
    name: 'Runway ML',
    slug: 'runway-ml',
    description: 'Creative suite of AI tools for video, image, and audio editing.',
    tags: ['Video', 'Editing', 'Creative'],
    link: 'https://runwayml.com/',
  },
  {
    name: 'Synthesia',
    slug: 'synthesia',
    description: 'AI video creation platform using avatars and voiceovers.',
    tags: ['Video', 'Avatar', 'Voice'],
    link: 'https://www.synthesia.io/',
  },
];

type PageProps = {
  params: { slug: string };
};

export default function ToolDetailPage({ params }: PageProps) {
  const tool = toolData.find((t) => t.slug === params.slug);

  if (!tool) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 to-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-400 hover:underline inline-block mb-6">← Back to Home</Link>
        
        <h1 className="text-4xl font-bold mb-4">{tool.name}</h1>
        <p className="text-lg text-gray-300 mb-6">{tool.description}</p>

        <div className="mb-6">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-green-700 text-white text-xs font-medium px-3 py-1 rounded-full mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={tool.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200 transition"
        >
          Visit {tool.name}
        </a>
      </div>
    </main>
  );
}
  