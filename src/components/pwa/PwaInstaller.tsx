'use client';

import React, { useState, useEffect, useRef } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PwaInstaller() {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker in production
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('[PWA] Service Worker registrado com escopo:', reg.scope);
          })
          .catch((err) => {
            console.warn('[PWA] Falha ao registrar Service Worker:', err);
          });
      });
    }

    // 2. Check if already installed in standalone mode
    if (typeof window !== 'undefined') {
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;

      if (isStandalone) {
        return;
      }

      // Check if user dismissed recently (within 7 days)
      const dismissedAt = localStorage.getItem('pwa_prompt_dismissed_at');
      if (dismissedAt) {
        const diffDays = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
        if (diffDays < 7) {
          return;
        }
      }

      // 3. Detect iOS Safari
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
      const isSafari = /safari/.test(userAgent) && !/chrome|crios|fxios/.test(userAgent);

      let timer: NodeJS.Timeout | null = null;

      if (isIosDevice && isSafari) {
        setIsIos(true);
        timer = setTimeout(() => {
          setShowBanner(true);
        }, 4500);
        return () => {
          if (timer) clearTimeout(timer);
        };
      }

      // 4. Android / Desktop Chrome beforeinstallprompt handler
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        deferredPrompt.current = e as BeforeInstallPromptEvent;
        timer = setTimeout(() => {
          setShowBanner(true);
        }, 4500);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      return () => {
        if (timer) clearTimeout(timer);
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
    }
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt.current) return;

    deferredPrompt.current.prompt();
    const choiceResult = await deferredPrompt.current.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('[PWA] Usuário aceitou a instalação do app.');
    } else {
      console.log('[PWA] Usuário recusou a instalação.');
    }

    deferredPrompt.current = null;
    setShowBanner(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pwa_prompt_dismissed_at', String(Date.now()));
    }
  };

  if (!showBanner) {
    return null;
  }

  return (
    <aside
      aria-label="Instalar aplicativo BuscaCentral"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xl shadow-slate-900/10 text-slate-900">
        <div className="flex items-start gap-3.5">
          {/* App Icon */}
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm overflow-hidden p-1">
            <img
              src="/favicon-32x32.png"
              alt="BuscaCentral Ícone"
              className="w-7 h-7 object-contain"
              width={28}
              height={28}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 tracking-tight">
                Instalar BuscaCentral
              </h3>
              <button
                onClick={handleDismiss}
                className="text-slate-400 hover:text-slate-600 p-1 -mr-1 rounded-lg transition-colors"
                aria-label="Fechar banner de instalação"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
              Acesse ferramentas, rotas e calculadoras direto da sua tela inicial, mesmo offline.
            </p>

            {/* iOS Hint */}
            {isIos ? (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-[11px] text-slate-600 space-y-1">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <span>📱</span> Como instalar no iPhone/iPad:
                </div>
                <p>
                  Toque no botão de <strong>Compartilhar</strong>{' '}
                  <span className="inline-block px-1 py-0.5 bg-slate-200 rounded text-[10px]">⎋</span>{' '}
                  na barra do Safari e selecione <strong>&quot;Adicionar à Tela de Início&quot; ➕</strong>.
                </p>
                <button
                  onClick={handleDismiss}
                  className="mt-2 w-full text-center py-1.5 font-semibold text-xs text-blue-600 hover:text-blue-700"
                >
                  Entendi
                </button>
              </div>
            ) : (
              /* Android / Desktop CTA Buttons */
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleInstallClick}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-xs"
                >
                  <span>📲</span>
                  Instalar App
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Agora não
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}