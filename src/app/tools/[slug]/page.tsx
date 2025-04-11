import { notFound } from 'next/navigation';
import tools from '@/data/tools.json';
import InteractiveLink from '@/components/InteractiveLink'; // client component
import Image from 'next/image';

type Tool = {
  name: string;
  slug: string;
  description: string;
  url: string;
  category: string;
  image?: string;
};
type PageProps = {
  params: Promise<{ slug: string }>;
};

// ✅ Correct `generateMetadata` signature
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const tool = (tools as Tool[]).find((t) => t.slug === resolvedParams.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found | PromptGalaxy',
      description: 'The requested tool could not be found on PromptGalaxy.',
    };
  }

  return {
    title: `${tool.name} | PromptGalaxy`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} | PromptGalaxy`,
      description: tool.description,
      url: `https://promptgalaxy.vercel.app/tools/${tool.slug}`,
      siteName: 'PromptGalaxy',
      images: [
        {
          url: tool.image || 'https://promptgalaxy.vercel.app/default-og.png',
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} | PromptGalaxy`,
      description: tool.description,
      images: [tool.image || 'https://promptgalaxy.vercel.app/default-og.png'],
    },
  };
}

// ✅ Correct component signature
export default async function ToolPage({ params }: PageProps) {
  const resolvedParams = await params;
  const tool = (tools as Tool[]).find((t) => t.slug === resolvedParams.slug);
  if (!tool) return notFound();

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#0078D4', marginBottom: '1rem' }}>{tool.name}</h1>
      <p style={{ fontSize: '1.2rem', color: '#444', marginBottom: '1rem' }}>{tool.description}</p>
      <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
        Category: <span style={{ color: '#0078D4' }}>{tool.category}</span>
      </p>

      <div style={{ marginBottom: '1rem' }}>
        <Image
          src={tool.image || '/fallback-image.png'}
          alt={`${tool.name} logo`}
          width={800} // Specify width
          height={200} // Specify height
          style={{
            objectFit: 'contain',
            borderRadius: '8px',
            backgroundColor: '#f0f0f0',
          }}
        />
      </div>

      <InteractiveLink href={tool.url} ariaLabel={`Visit ${tool.name}`}>
        Visit {tool.name}
      </InteractiveLink>
    </main>
  );
}
