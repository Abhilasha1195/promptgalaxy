import { notFound } from 'next/navigation';
import tools from '@/data/tools.json';
import InteractiveLink from '@/components/InteractiveLink'; // Import the client component

type Tool = {
  name: string;
  slug: string;
  description: string;
  url: string;
  category: string;
  image?: string;
};

type Props = {
  params: {
    slug: string;
  };
};

// Dynamic SEO Metadata
export async function generateMetadata({ params }: Props) {
  const tool = (tools as Tool[]).find((t) => t.slug === params.slug);

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

// Tool Page Component
export default function ToolPage({ params }: Props) {
  const tool = (tools as Tool[]).find((t) => t.slug === params.slug);
  if (!tool) return notFound();

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#0078D4', marginBottom: '1rem' }}>
        {tool.name}
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#444', marginBottom: '1rem' }}>
        {tool.description}
      </p>
      <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
        Category: <span style={{ color: '#0078D4' }}>{tool.category}</span>
      </p>

      {/* Tool Image with fallback */}
      <div style={{ marginBottom: '1rem' }}>
        <img
          src={tool.image || '/fallback-image.png'}
          alt={`${tool.name} logo`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/fallback-image.png';
          }}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'contain',
            borderRadius: '8px',
            backgroundColor: '#f0f0f0',
          }}
        />
      </div>

      {/* Use the InteractiveLink component */}
      <InteractiveLink href={tool.url} ariaLabel={`Visit ${tool.name}`}>
        Visit {tool.name}
      </InteractiveLink>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: tool.name,
            description: tool.description,
            applicationCategory: tool.category,
            url: tool.url,
            image: tool.image || 'https://promptgalaxy.vercel.app/default-og.png',
            operatingSystem: "All",
          }),
        }}
      ></script>
    </main>
  );
}
