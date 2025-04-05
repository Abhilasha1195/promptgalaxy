import React, { useEffect } from 'react';

export default function AdComponent() {
  useEffect(() => {
    try {
      // Check if adsbygoogle exists and use it
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error('Failed to render AdSense ad:', e);
    }
  }, []);

  return (
    <div className="ads-container">
      {/* AdSense ad container */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3309739623901627"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
