"use client"; // Ensures this component runs on the client side

import Image from 'next/image';

export default function InteractiveImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800} // Specify width
      height={200} // Specify height
      style={{
        objectFit: 'contain',
        borderRadius: '8px',
        backgroundColor: '#f0f0f0',
      }}
    />
  );
}
