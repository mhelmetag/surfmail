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
    Dominant Swell: ${this.surfForecastFacts.dominantSwell.height} feet at ${
      this.surfForecastFacts.dominantSwell.period
    } seconds from the ${this.surfForecastFacts.dominantSwell.direction}
    Wind: ${this.surfForecastFacts.wind.speed} miles per hour ${
      this.surfForecastFacts.wind.direction
    }
    Tide: ${this.surfForecastFacts.tide} feet
    Air Temp: ${this.surfForecastFacts.airTemp} Fahrenheit
    Water Temp: ${this.surfForecastFacts.waterTemp} Fahrenheit
    
    Given these surf conditions, write a surf report in the style of an old surf shop voicemail surf report that will be spoken by an Australian.

    If the surf is smaller than 2 feet or the wind is strong, the surf isn't that good and the report should reflect that.
    
    Keep the report short (up to 2 paragraphs).

    Use some Australian slang for fun.
    
    Introduce yourself as Steve Wavestorm.`;
  }

  private surfHeight() {
    let surfHeight = `${this.surfForecastFacts.surfHeight.min}-${this.surfForecastFacts.surfHeight.max}`;
    this.surfForecastFacts.surfHeight.plus ? (surfHeight += "+") : surfHeight;
    surfHeight += " feet";
    return surfHeight;
  }
}
