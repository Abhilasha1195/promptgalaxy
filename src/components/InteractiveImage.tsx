"use client"; // Ensures this component runs on the client side

type InteractiveImageProps = {
  src: string;
  alt: string;
};

export default function InteractiveImage({ src, alt }: InteractiveImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      onError={(e) => {
        (e.target as HTMLImageElement).src = "/fallback-image.png"; // Fallback image
      }}
      style={{
        width: "100%",
        height: "200px",
        objectFit: "contain",
        borderRadius: "8px",
        backgroundColor: "#f0f0f0",
      }}
    />
  );
}
