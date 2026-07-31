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

export async function fetchChargingStations(cidade: string, uf: string, lat?: number, lon?: number): Promise<OCMPointOfInterest[]> {
  const apiKey = process.env.OPENCHARGEMAP_API_KEY;
  if (!apiKey) {
    console.warn("OPENCHARGEMAP_API_KEY is not defined in environment variables.");
  }

  // OpenChargeMap API expects city names in the 'town' parameter
  // We'll pass the city name directly, though OCM can be a bit fuzzy
  const url = new URL("https://api.openchargemap.io/v3/poi/");
  url.searchParams.append("countrycode", "BR");
  url.searchParams.append("maxresults", "50");
  url.searchParams.append("verbose", "false"); // To reduce payload size if possible, but keep false by default

  if (lat !== undefined && lon !== undefined) {
    url.searchParams.append("latitude", lat.toString());
    url.searchParams.append("longitude", lon.toString());
    url.searchParams.append("distance", "100"); // 100km radius
    url.searchParams.append("distanceunit", "KM");
  } else {
    url.searchParams.append("town", cidade);
  }

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "X-API-Key": apiKey || "",
        "User-Agent": "BuscaCentral/1.0"
      },
      next: {
        revalidate: 86400 // Cache for 24 hours to avoid hitting API limits
      }
    });

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
