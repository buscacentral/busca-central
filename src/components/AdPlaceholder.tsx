'use client';

import AdBanner from './AdBanner';

interface AdPlaceholderProps {
  position?: 'top' | 'middle' | 'bottom';
}

/**
 * AdPlaceholder - Container para anúncios Google AdSense
 * 
 * CLS Prevention: O contêiner tem altura mínima fixa para evitar
 * que o layout pule quando o anúncio carregar.
 * 
 * Para ativar o AdSense, remova o display:none e adicione
 * o script do Google AdSense dentro deste componente.
 */
export default function AdPlaceholder({ position = 'middle' }: AdPlaceholderProps) {
  const minHeightMap = {
    top: '90px',
    middle: '250px',
    bottom: '90px',
  };

  return (
    <div
      data-ad-position={position}
      aria-label={`Espaço para anúncio ${position}`}
      role="complementary"
      style={{
        maxWidth: '1200px',
        width: '100%',
        margin: position === 'middle' ? '2rem auto' : '0 auto',
        padding: '0.5rem 1rem',
        minHeight: minHeightMap[position],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AdBanner 
        adSlot="auto" 
        adFormat={position === 'middle' ? 'fluid' : 'horizontal'} 
        className="w-full h-full m-0"
      />
    </div>
  );
}
