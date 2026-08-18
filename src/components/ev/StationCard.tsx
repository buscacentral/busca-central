import { OCMPointOfInterest } from "@/lib/openchargemap";
import { MapPinIcon, ZapIcon, NavigationIcon } from "./Icons";

interface StationCardProps {
  station: OCMPointOfInterest;
  distanceKm?: number;
}

export default function StationCard({ station, distanceKm }: StationCardProps) {
  const address = station.AddressInfo;
  const operator = station.OperatorInfo?.Title || address?.Title || "Operador Desconhecido";
  const addressStr = [address?.AddressLine1, address?.Town, address?.StateOrProvince].filter(Boolean).join(", ");
  
  // Aggregate connectors information
  const connectors = station.Connections || [];
  const powerLevels = connectors.map(c => c.PowerKW).filter((p): p is number => !!p);
  const maxPower = powerLevels.length > 0 ? Math.max(...powerLevels) : null;
  
  const connectorTypes = Array.from(
    new Set(connectors.map(c => c.ConnectionType?.Title).filter(Boolean))
  );

  // Status
  const isOperational = station.StatusType?.IsOperational;
  let statusBadge = (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
      Status Desconhecido
    </span>
  );
  if (isOperational === true) {
    statusBadge = (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
        <span className="w-2 h-2 mr-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
        Operacional
      </span>
    );
  } else if (isOperational === false) {
    statusBadge = (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <span className="w-2 h-2 mr-1.5 bg-red-500 rounded-full"></span>
        Inoperante
      </span>
    );
  }

  // Calculate distance string if available
  const effectiveDistance = distanceKm !== undefined ? distanceKm : address?.Distance;
  const formattedDistance =
    effectiveDistance !== undefined
      ? effectiveDistance < 1
        ? `a ${Math.round(effectiveDistance * 1000)} m de você`
        : `a ${effectiveDistance.toFixed(1)} km de você`
      : null;

  const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${address?.Latitude},${address?.Longitude}`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full hover:shadow-md hover:border-blue-300 transition-all group">
      <div className="p-5 sm:p-6 flex-grow">
        <div className="flex justify-between items-start mb-3 gap-2">
          <div className="min-w-0 flex-1">
            {formattedDistance && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-full mb-2">
                <span>📍</span> {formattedDistance}
              </span>
            )}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {operator}
            </h3>
          </div>
          <div className="shrink-0 whitespace-nowrap">
            {statusBadge}
          </div>
        </div>
        
        <div className="flex items-start text-gray-600 mb-4 text-xs sm:text-sm">
          <MapPinIcon />
          <span className="ml-2 line-clamp-2">{addressStr || "Endereço não informado"}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 bg-slate-50 border border-slate-100 p-3 rounded-xl">
          <div>
            <p className="text-[11px] text-gray-500 uppercase font-semibold mb-1">Potência Máx</p>
            <p className="text-gray-900 font-bold text-sm flex items-center">
              <ZapIcon />
              <span className="ml-1">{maxPower ? `${maxPower} kW` : "Não informada"}</span>
            </p>
          </div>
          <div>
            <p className="text-[11px] text-gray-500 uppercase font-semibold mb-1">Conectores</p>
            <p className="text-gray-900 font-medium text-xs sm:text-sm line-clamp-2" title={connectorTypes.join(", ")}>
              {connectorTypes.length > 0 ? connectorTypes.join(", ") : "Padrão Tipo 2 / CCS2"}
            </p>
          </div>
        </div>

        {station.UsageCost && (
          <div className="text-xs text-slate-500 mb-2 line-clamp-1">
            <span className="font-semibold text-slate-700">Tarifa / Acesso:</span> {station.UsageCost}
          </div>
        )}
      </div>
      
      <div className="p-5 pt-0 sm:p-6 sm:pt-0 mt-auto flex flex-col gap-2">
        <a 
          href={mapUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors"
        >
          <NavigationIcon />
          <span>Abrir no Google Maps / Waze</span>
        </a>
      </div>
    </div>
  );
}
