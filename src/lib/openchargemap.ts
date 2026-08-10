export interface OCMConnectionType {
  ID: number;
  Title: string;
}

export interface OCMStatusType {
  IsOperational?: boolean;
  IsUserSelectable?: boolean;
  Title: string;
}

export interface OCMConnection {
  ID: number;
  ConnectionTypeID: number;
  ConnectionType?: OCMConnectionType;
  StatusTypeID?: number;
  StatusType?: OCMStatusType;
  Amps?: number;
  Voltage?: number;
  PowerKW?: number;
  CurrentTypeID?: number;
  Quantity?: number;
}

export interface OCMAddressInfo {
  ID: number;
  Title: string;
  AddressLine1: string;
  AddressLine2?: string;
  Town: string;
  StateOrProvince: string;
  Postcode: string;
  CountryID: number;
  Latitude: number;
  Longitude: number;
  ContactTelephone1?: string;
  ContactTelephone2?: string;
  ContactEmail?: string;
  AccessComments?: string;
  RelatedURL?: string;
  Distance?: number;
  DistanceUnit?: number;
}

export interface OCMOperatorInfo {
  ID: number;
  Title: string;
  WebsiteURL?: string;
}

export interface OCMPointOfInterest {
  ID: number;
  UUID: string;
  AddressInfo: OCMAddressInfo;
  Connections: OCMConnection[];
  OperatorInfo?: OCMOperatorInfo;
  NumberOfPoints?: number;
  StatusType?: OCMStatusType;
  DateLastStatusUpdate?: string;
  DataQualityLevel?: number;
  DateCreated?: string;
  SubmissionStatus?: {
    IsLive: boolean;
  };
  IsRecentlyVerified?: boolean;
  DateLastVerified?: string;
}

export interface CityCoordConfig {
  lat: number;
  lng: number;
  countryCode: string;
  radiusKm: number;
}

export const INTERNATIONAL_CITY_COORDS: Record<string, CityCoordConfig> = {
  "buenos-aires-argentina": { lat: -34.6037, lng: -58.3816, countryCode: "AR", radiusKm: 30 },
  "montevideo-uruguai": { lat: -34.9011, lng: -56.1645, countryCode: "UY", radiusKm: 30 },
  "santiago-chile": { lat: -33.4489, lng: -70.6693, countryCode: "CL", radiusKm: 30 },
  "lisboa-portugal": { lat: 38.7223, lng: -9.1393, countryCode: "PT", radiusKm: 30 },
  "miami-eua": { lat: 25.7617, lng: -80.1918, countryCode: "US", radiusKm: 30 },
  "orlando-eua": { lat: 28.5383, lng: -81.3792, countryCode: "US", radiusKm: 30 },
  "madrid-espanha": { lat: 40.4168, lng: -3.7038, countryCode: "ES", radiusKm: 30 },
  "porto-portugal": { lat: 41.1579, lng: -8.6291, countryCode: "PT", radiusKm: 30 },
  "asuncion-paraguai": { lat: -25.2637, lng: -57.5759, countryCode: "PY", radiusKm: 30 },
  "punta-del-este-uruguai": { lat: -34.9411, lng: -54.9333, countryCode: "UY", radiusKm: 30 },
};

export async function fetchChargingStations(
  cidade: string,
  uf: string,
  lat?: number,
  lon?: number,
  countryCode?: string,
  radiusKm: number = 30
): Promise<OCMPointOfInterest[]> {
  const apiKey = process.env.OPENCHARGEMAP_API_KEY;
  if (!apiKey) {
    console.warn("OPENCHARGEMAP_API_KEY is not defined in environment variables.");
  }

  // OpenChargeMap API query construction
  const url = new URL("https://api.openchargemap.io/v3/poi/");
  url.searchParams.append("maxresults", "50");
  url.searchParams.append("verbose", "false");

  if (lat !== undefined && lon !== undefined) {
    url.searchParams.append("latitude", lat.toString());
    url.searchParams.append("longitude", lon.toString());
    url.searchParams.append("distance", radiusKm.toString());
    url.searchParams.append("distanceunit", "KM");
    if (countryCode) {
      url.searchParams.append("countrycode", countryCode);
    }
  } else {
    url.searchParams.append("countrycode", countryCode || "BR");
    url.searchParams.append("town", cidade);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

    const response = await fetch(url.toString(), {
      signal: controller.signal,
      headers: {
        "X-API-Key": apiKey || "",
        "User-Agent": "BuscaCentral/1.0"
      },
      next: {
        revalidate: 86400 // Cache for 24 hours to avoid hitting API limits
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`OpenChargeMap API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    return data as OCMPointOfInterest[];
  } catch (error) {
    console.error("Error fetching charging stations from OpenChargeMap:", error);
    return [];
  }
}

export async function fetchRouteChargers(polyline: string, distanceKm: number = 20): Promise<OCMPointOfInterest[]> {
  const apiKey = process.env.OPENCHARGEMAP_API_KEY;
  if (!apiKey) {
    console.warn("OPENCHARGEMAP_API_KEY is not defined in environment variables.");
  }

  const url = new URL("https://api.openchargemap.io/v3/poi/");
  url.searchParams.append("countrycode", "BR");
  url.searchParams.append("maxresults", "100");
  url.searchParams.append("verbose", "false");
  url.searchParams.append("polyline", polyline);
  url.searchParams.append("distance", distanceKm.toString());
  url.searchParams.append("distanceunit", "KM");

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url.toString(), {
      signal: controller.signal,
      headers: {
        "X-API-Key": apiKey || "",
        "User-Agent": "BuscaCentral/1.0"
      },
      next: {
        revalidate: 86400
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`OpenChargeMap API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    return data as OCMPointOfInterest[];
  } catch (error) {
    console.error("Error fetching route chargers from OpenChargeMap:", error);
    return [];
  }
}
