'use client';

type InteractiveLinkProps = {
  href: string;
  children: React.ReactNode;
  ariaLabel: string;
};

export default function InteractiveLink({ href, children, ariaLabel }: InteractiveLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-block',
        marginTop: '1rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#0078D4',
        color: '#fff',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: 'background-color 0.2s ease',
      }}
      onMouseEnter={(e) =>
        ((e.target as HTMLElement).style.backgroundColor = '#005A9E')
      }
      onMouseLeave={(e) =>
        ((e.target as HTMLElement).style.backgroundColor = '#0078D4')
      }
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}