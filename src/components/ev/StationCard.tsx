import { OCMPointOfInterest } from "@/lib/openchargemap";
import { MapPinIcon, ZapIcon, NavigationIcon } from "./Icons";

export default function StationCard({ station }: { station: OCMPointOfInterest }) {
  const address = station.AddressInfo;
  const operator = station.OperatorInfo?.Title || "Operador Desconhecido";
  const addressStr = [address.AddressLine1, address.Town, address.StateOrProvince].filter(Boolean).join(", ");
  
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
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <span className="w-2 h-2 mr-1.5 bg-green-500 rounded-full"></span>
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

  const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${address.Latitude},${address.Longitude}`;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-4 gap-2">
          <h2 className="text-xl font-bold text-gray-900 line-clamp-2">{operator}</h2>
          <div className="shrink-0 whitespace-nowrap">
            {statusBadge}
          </div>
        </div>
        
        <div className="flex items-start text-gray-600 mb-4 text-sm">
          <MapPinIcon />
          <span className="ml-2 line-clamp-2">{addressStr}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-50 p-3 rounded-lg">
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Potência Máx</p>
            <p className="text-gray-900 font-medium flex items-center">
              <ZapIcon />
              <span className="ml-1">{maxPower ? `${maxPower} kW` : "Não informada"}</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Conectores</p>
            <p className="text-gray-900 font-medium text-sm line-clamp-2" title={connectorTypes.join(", ")}>
              {connectorTypes.length > 0 ? connectorTypes.join(", ") : "Não informado"}
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-5 pt-0 mt-auto">
        <a 
          href={mapUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <NavigationIcon />
          Navegar via Google Maps
        </a>
      </div>
    </div>
  );
}
