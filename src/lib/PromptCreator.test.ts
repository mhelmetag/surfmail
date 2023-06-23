import PromptCreator from "./PromptCreator";

describe("PromptCreator", () => {
  let forecastFacts = {
    day: "Monday, July 12th",
    surfSpot: "Ocean Beach, CA",
    surfHeight: {
      min: 1,
      max: 2,
      plus: false,
    },
    dominantSwell: {
      height: 3,
      period: 5,
      direction: "NW",
    },
    wind: {
      speed: 10,
      direction: "onshore",
    },
    tide: 1.5,
    airTemp: 70,
    waterTemp: 60,
  };

  it("creates a prompt", () => {
    const promptCreator = new PromptCreator(forecastFacts);
    const expected = promptCreator.create();
    const actual = `Day: Monday, July 12th
    Surf Spot: Ocean Beach, CA
    Surf Height: 1-2ft
    Dominant Swell: 3ft 5s NW
    Wind: 10mph onshore
    Tide: 1.5ft
    Air Temp: 70F
    Water Temp: 60F
    
    Given these surf conditions, write a surf report in the style of an old surf shop voicemail surf report.
    
    Fully write out any abbreviations, directions or units.
    
    Keep it short (up to 2 paragraphs).
    
    Introduce yourself as Steve Wavestorm.`;

    expect(expected).toEqual(actual);
  });

  it("creates a prompt with a plus", () => {
    forecastFacts.surfHeight.plus = true;
    const promptCreator = new PromptCreator(forecastFacts);
    const expected = promptCreator.create();
    const actual = `Day: Monday, July 12th
    Surf Spot: Ocean Beach, CA
    Surf Height: 1-2+ft
    Dominant Swell: 3ft 5s NW
    Wind: 10mph onshore
    Tide: 1.5ft
    Air Temp: 70F
    Water Temp: 60F
    
    Given these surf conditions, write a surf report in the style of an old surf shop voicemail surf report.
    
    Fully write out any abbreviations, directions or units.
    
    Keep it short (up to 2 paragraphs).
    
    Introduce yourself as Steve Wavestorm.`;

    expect(expected).toEqual(actual);
  });
});
