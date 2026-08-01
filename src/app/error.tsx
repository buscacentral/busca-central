'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
        Ops! Algo deu errado.
      </h2>
      <p className="text-slate-600 max-w-md mx-auto mb-8 text-lg">
        Encontramos um erro inesperado ao carregar esta página. Nossa equipe já foi notificada.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Tentar novamente
        </button>
        <Link
          href="/"
          className="bg-slate-100 text-slate-700 font-bold py-3 px-6 rounded-xl hover:bg-slate-200 transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
        >
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
}
