import { SurfForecastFacts } from "../types/SurfForecastFacts";

// PromptCreator in a set of surf forecast facts and returns a prompt for the ChatGPT API
export default class PromptCreator {
  constructor(surfForecastFacts: SurfForecastFacts) {
    this.surfForecastFacts = surfForecastFacts;
  }

  create() {
    return this.chatGPTPrompt();
  }

  private surfForecastFacts: SurfForecastFacts;

  private chatGPTPrompt() {
    // Surf Spot might come from the taxonomy API
    // Surf Height should come from the wave API
    // Dominant Swell should come from the wave API
    // Wind should come from the wind API
    // Tide should come from the tide API
    // Air Temp should come from the weather API
    // Water Temp should come from the weather API
    return `Day: ${this.surfForecastFacts.day}
    Surf Spot: ${this.surfForecastFacts.surfSpot}
    Surf Height: ${this.surfHeight()}
    Dominant Swell: ${this.surfForecastFacts.dominantSwell.height}ft ${
      this.surfForecastFacts.dominantSwell.period
    }s ${this.surfForecastFacts.dominantSwell.direction}
    Wind: ${this.surfForecastFacts.wind.speed}mph ${
      this.surfForecastFacts.wind.direction
    }
    Tide: ${this.surfForecastFacts.tide}ft
    Air Temp: ${this.surfForecastFacts.airTemp}F
    Water Temp: ${this.surfForecastFacts.waterTemp}F
    
    Given these surf conditions, write a surf report in the style of an old surf shop voicemail surf report that will be spoken by an Australian.
    
    Fully write out any abbreviations, directions or units.
    
    Keep it short (up to 2 paragraphs).
    
    Introduce yourself as Steve Wavestorm.`;
  }

  private surfHeight() {
    let surfHeight = `${this.surfForecastFacts.surfHeight.min}-${this.surfForecastFacts.surfHeight.max}`;
    this.surfForecastFacts.surfHeight.plus ? (surfHeight += "+") : surfHeight;
    surfHeight += "ft";
    return surfHeight;
  }
}
