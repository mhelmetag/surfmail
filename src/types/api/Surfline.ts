export interface BatchResponse {
  data: BatchDetail[];
}

export interface BatchDetail {
  _id: string;
  name: string;
  waterTemp: {
    min: number;
    max: number;
  };
  weather: {
    temperature: number;
  };
  waveHeight: {
    min: number;
    max: number;
    plus: boolean;
  };
  tide: {
    current: {
      height: number;
    };
  };
  swells: {
    direction: number;
    height: number;
    period: number;
  }[];
  wind: {
    speed: number;
    direction: number;
    directionType: string;
  };
}
