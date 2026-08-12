'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LocationButtonProps {
  className?: string;
  variant?: 'button' | 'hero';
  onLocationFound?: (lat: number, lng: number) => void;
}

export default function LocationButton({
  className = '',
  variant = 'hero',
  onLocationFound,
}: LocationButtonProps) {
  const [isLocating, setIsLocating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleClick = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setErrorMsg('Geolocalização não é suportada pelo seu navegador.');
      return;
    }
    setIsLocating(true);
    setErrorMsg(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const { latitude, longitude } = position.coords;
        if (onLocationFound) {
          onLocationFound(latitude, longitude);
        } else {
          router.push(`/localizacao/carregador-eletrico/perto-de-mim?lat=${latitude.toFixed(6)}&lng=${longitude.toFixed(6)}`);
        }
      },
      (error) => {
        console.warn('Erro de geolocalização:', error);
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setErrorMsg('Permissão de localização negada. Libere o acesso no seu navegador.');
        } else {
          setErrorMsg('Não foi possível obter sua localização. Busque por cidade abaixo.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={isLocating}
        title="Usar minha localização atual"
        aria-label="Usar minha localização atual"
        className={`inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-sky-600 hover:bg-sky-50 transition-colors disabled:opacity-50 ${className}`}
      >
        {isLocating ? (
          <svg className="animate-spin h-5 w-5 text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={handleClick}
        disabled={isLocating}
        className={`inline-flex items-center justify-center py-3.5 px-6 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-60 ${className}`}
      >
        {isLocating ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Obtendo sua localização...
          </>
        ) : (
          <>
            <svg className="h-5 w-5 mr-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Usar Minha Localização Atual
          </>
        )}
      </button>
      {errorMsg && (
        <p className="mt-2.5 text-sm text-red-600 font-medium text-center bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">{errorMsg}</p>
      )}
    </div>
  );
}
