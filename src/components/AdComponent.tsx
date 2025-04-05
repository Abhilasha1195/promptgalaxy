'use client';
import { useEffect } from 'react';

export default function AdComponent() {
  useEffect(() => {
    try {
      // Try to re-render ads if script is already loaded
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-3309739623901627"
      data-ad-slot="✅ YOUR_AD_SLOT_HERE"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
