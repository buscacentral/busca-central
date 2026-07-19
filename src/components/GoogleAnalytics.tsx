'use client';

import Script from 'next/script';
import { useState, useEffect } from 'react';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || '';
const CONSENT_KEY = 'buscacentral_privacy_consent';

export default function GoogleAnalytics() {
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

  if (!GA_MEASUREMENT_ID || !consent) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
