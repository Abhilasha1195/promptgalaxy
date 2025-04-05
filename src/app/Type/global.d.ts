declare global {
  interface Window {
    adsbygoogle: { push: (args?: unknown) => void }; // Replace 'any' with 'unknown'
  }
}

export {};

