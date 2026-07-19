'use client';

import Script from 'next/script';
import { useState, useEffect } from 'react';

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || '';
const CONSENT_KEY = 'buscacentral_privacy_consent';

export default function MicrosoftClarity() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.accepted === true) {
            setConsent(true);
          }
        } catch {
          // Silently handle parse errors
        }
      }
    };

    checkConsent();

    window.addEventListener('cookie-consent-updated', checkConsent);
    return () => {
      window.removeEventListener('cookie-consent-updated', checkConsent);
    };
  }, []);

  if (!CLARITY_ID || !consent) return null;

  return (
    <Script id="microsoft-clarity" strategy="lazyOnload">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `}
    </Script>
  );
}
