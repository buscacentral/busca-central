import { Metadata } from "next";
import PlanejadorSearch from "./PlanejadorSearch";

export const metadata: Metadata = {
  title: "Planejador de Viagens para Carros Elétricos (EV Route Planner) | BuscaCentral",
  description: "Planeje sua viagem com carro elétrico. Insira a origem e o destino para encontrar todos os eletropostos e pontos de recarga disponíveis ao longo da sua rota rodoviária no Brasil.",
};

export default function PlanejadorIndexPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 text-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/20">
            <svg className="w-8 h-8 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Planejador de Viagens EV
          </h1>
          <p className="text-lg md:text-xl text-blue-100 font-light leading-relaxed mb-8">
            Nunca mais fique sem bateria na estrada. Traçamos sua rota e encontramos todos os pontos de recarga disponíveis no trajeto para o seu carro elétrico.
          </p>
        </div>

        {/* Search Component pulled up to overlap the banner */}
        <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 px-4">
          <PlanejadorSearch />
        </div>
      </div>

      {/* Spacer to account for the overlapping search component */}
      <div className="h-48 md:h-32"></div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 pb-16 max-w-4xl">
        
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Como planejar sua viagem com carro elétrico</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 border border-blue-100">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">1. Defina a Rota</h3>
              <p className="text-gray-600 text-sm">Insira a cidade onde você está e o seu destino final. Nosso sistema vai traçar a rota rodoviária ideal.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 border border-blue-100">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">2. Descubra os Pontos</h3>
              <p className="text-gray-600 text-sm">Buscamos em tempo real na maior rede de eletropostos os carregadores num raio da sua rodovia.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 border border-blue-100">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">3. Viaje Seguro</h3>
              <p className="text-gray-600 text-sm">Navegue até as paradas, verifique a potência dos carregadores rápidos (DC) e o status de funcionamento.</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
