export interface SurfForecastFacts {
  day: string;
  surfSpot: string;
  surfHeight: SurfHeight;
  dominantSwell: DominantSwell;
  wind: Wind;
  tide: number;
  airTemp: number;
  waterTemp: number;
}

export interface SurfHeight {
  min: number;
  max: number;
  plus: boolean;
}

export interface DominantSwell {
  height: number;
  period: number;
  direction: string;
}

export interface Wind {
  speed: number;
  direction: string;
}
