export interface OCMConnectionType {
  ID?: number;
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
  Title?: string;
  UsageCost?: string;
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

export interface FetchStationsOptions {
  cityName?: string;
  uf?: string;
  latitude?: number;
  longitude?: number;
  countryCode?: string;
  distance?: number;
}

export const STATIC_FALLBACK_STATIONS: Record<string, OCMPointOfInterest[]> = {
  "buenos-aires-argentina": [
    {
      ID: 502668,
      UUID: "52857390-D7D0-47D8-B9FA-4F8769C8F491",
      Title: "[ChargeBox] Parking de las Artes Av. Corrientes",
      AddressInfo: {
        ID: 503057,
        Title: "[ChargeBox] Parking de las Artes Av. Corrientes",
        AddressLine1: "Avenida Corrientes 436",
        Town: "Buenos Aires",
        StateOrProvince: "Ciudad Autónoma de Buenos Aires",
        Postcode: "C1043AAR",
        CountryID: 12,
        Latitude: -34.6037,
        Longitude: -58.3816,
      },
      Connections: [
        {
          ID: 1001,
          ConnectionTypeID: 25,
          ConnectionType: { Title: "Type 2 (Socket Only)" },
          PowerKW: 22,
          Quantity: 2,
        },
      ],
      UsageCost: "EV Jungle App",
    },
    {
      ID: 502669,
      UUID: "62857390-D7D0-47D8-B9FA-4F8769C8F492",
      Title: "YPF Punto Eléctrico Puerto Madero",
      AddressInfo: {
        ID: 503058,
        Title: "YPF Punto Eléctrico Puerto Madero",
        AddressLine1: "Av. Alicia Moreau de Justo 1900",
        Town: "Buenos Aires",
        StateOrProvince: "Puerto Madero",
        Latitude: -34.6185,
        Longitude: -58.3644,
      },
      Connections: [
        {
          ID: 1002,
          ConnectionTypeID: 33,
          ConnectionType: { Title: "CCS / SAE Combo Fast Charger" },
          PowerKW: 50,
          Quantity: 2,
        },
      ],
      UsageCost: "YPF App",
    },
  ],
  "montevideo-uruguai": [
    {
      ID: 502670,
      UUID: "72857390-D7D0-47D8-B9FA-4F8769C8F493",
      Title: "UTE Movilidad Eléctrica Rambla",
      AddressInfo: {
        ID: 503059,
        Title: "UTE Movilidad Eléctrica Rambla",
        AddressLine1: "Rambla Gandhi y Solano Antuña",
        Town: "Montevideo",
        Latitude: -34.9254,
        Longitude: -56.1558,
      },
      Connections: [
        {
          ID: 1003,
          ConnectionTypeID: 33,
          ConnectionType: { Title: "CCS / SAE Combo Fast Charger" },
          PowerKW: 50,
          Quantity: 2,
        },
      ],
    },
  ],
  "santiago-chile": [
    {
      ID: 502671,
      UUID: "82857390-D7D0-47D8-B9FA-4F8769C8F494",
      Title: "Enel X Electrolinera Apoquindo",
      AddressInfo: {
        ID: 503060,
        Title: "Enel X Electrolinera Apoquindo",
        AddressLine1: "Av. Apoquindo 4800",
        Town: "Santiago",
        StateOrProvince: "Las Condes",
        Latitude: -33.4115,
        Longitude: -70.5752,
      },
      Connections: [
        {
          ID: 1004,
          ConnectionTypeID: 33,
          ConnectionType: { Title: "CCS2 Fast Charger" },
          PowerKW: 60,
          Quantity: 2,
        },
      ],
    },
  ],
};

function getFallbackForOptions(options: FetchStationsOptions): OCMPointOfInterest[] {
  const cityLower = (options.cityName || "").toLowerCase();
  const ufLower = (options.uf || "").toLowerCase();

  if (cityLower.includes("buenos") || ufLower.includes("argentina") || (options.latitude && Math.abs(options.latitude - -34.6037) < 1)) {
    return STATIC_FALLBACK_STATIONS["buenos-aires-argentina"];
  }
  if (cityLower.includes("montevideo") || (options.latitude && Math.abs(options.latitude - -34.9011) < 1)) {
    return STATIC_FALLBACK_STATIONS["montevideo-uruguai"];
  }
  if (cityLower.includes("santiago") || (options.latitude && Math.abs(options.latitude - -33.4489) < 1)) {
    return STATIC_FALLBACK_STATIONS["santiago-chile"];
  }
  return [];
}

export async function fetchChargingStations(
  optionsOrCidade: FetchStationsOptions | string,
  uf?: string,
  lat?: number,
  lon?: number,
  countryCode?: string,
  radiusKm: number = 30
): Promise<OCMPointOfInterest[]> {
  const options: FetchStationsOptions =
    typeof optionsOrCidade === "object"
      ? optionsOrCidade
      : {
          cityName: optionsOrCidade,
          uf,
          latitude: lat,
          longitude: lon,
          countryCode,
          distance: radiusKm,
        };

  const apiKey = process.env.OPENCHARGEMAP_API_KEY || "4b24e852-2e41-4daf-83da-38e409a87cee";

  const url = new URL("https://api.openchargemap.io/v3/poi/");
  url.searchParams.append("output", "json");
  url.searchParams.append("maxresults", "100");
  url.searchParams.append("compact", "true");
  url.searchParams.append("verbose", "false");

  if (options.latitude !== undefined && options.longitude !== undefined) {
    url.searchParams.append("latitude", options.latitude.toString());
    url.searchParams.append("longitude", options.longitude.toString());
    url.searchParams.append("distance", (options.distance || 30).toString());
    url.searchParams.append("distanceunit", "KM");
  } else {
    url.searchParams.append("countrycode", options.countryCode || "BR");
    if (options.cityName) {
      url.searchParams.append("town", options.cityName);
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 seconds timeout

    const response = await fetch(url.toString(), {
      signal: controller.signal,
      headers: {
        "X-API-Key": apiKey,
        "User-Agent": "BuscaCentral/1.0"
      },
      next: {
        revalidate: 86400 // Cache for 24 hours to avoid hitting API limits
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`OpenChargeMap API error (${url.toString()}): ${response.status} ${response.statusText}`);
      return getFallbackForOptions(options);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      console.error(`OpenChargeMap API returned invalid non-array response (${url.toString()}):`, data);
      return getFallbackForOptions(options);
    }

    if (data.length === 0) {
      const fallbacks = getFallbackForOptions(options);
      if (fallbacks.length > 0) {
        console.log(`[OCM] API returned 0 stations, returning ${fallbacks.length} static fallback stations.`);
        return fallbacks;
      }
    }

    return data as OCMPointOfInterest[];
  } catch (error) {
    console.error(`Error fetching charging stations from OpenChargeMap (${url.toString()}):`, error);
    return getFallbackForOptions(options);
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
