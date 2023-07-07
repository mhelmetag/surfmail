import * as fs from "node:fs";

import Surfline from "../api/Surfline";
import { SurfForecastFacts } from "../types/SurfForecastFacts";
import { humanizeCompassDirection } from "./surflineHelpers";
import PromptCreator from "./PromptCreator";
import ChatGPT from "../api/ChatGPT";
import ElevenLabs from "../api/ElevenLabs";
import { BatchDetail } from "../types/api/Surfline";

// VoicemailCreator is a class that takes in a Surfline Spot ID,
// fetches the swell info from Surfline's API,
// uses the ChatGPT API to generate a voicemail transcript based on the swell facts,
// and returns the filepath of the generated mp3 file from the ElevenLabs API
export default class VoiceMailCreator {
  constructor(surflineSpotId: string) {
    this.surflineSpotId = surflineSpotId;
  }

  create() {
    const now = new Date();

    return new Surfline()
      .getBatchDetails([this.surflineSpotId])
      .then((details) => {
        const detail = details.find((d) => d._id === this.surflineSpotId);
        const surfForecastFacts = this.surflineForecastFactsFromDetail(
          now,
          detail
        );
        const prompt = new PromptCreator(surfForecastFacts).create();
        return new ChatGPT().postChatResponse(prompt).then((response) => {
          const editedResponse = response.replace("\\n", "");
          return new ElevenLabs().postTTS(editedResponse).then((data) => {
            const filepath = `./recordings/surfmail-${now.getFullYear()}-${now.getDate()}-${now.getDay()}.mpeg`;

            fs.writeFileSync(filepath, data);

            return filepath;
          });
        });
      });
  }

  private surflineSpotId: string;

  private surflineForecastFactsFromDetail(
    now: Date,
    detail: BatchDetail
  ): SurfForecastFacts {
    return <SurfForecastFacts>{
      day: now.toLocaleString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
      surfSpot: detail.name,
      surfHeight: {
        min: detail.waveHeight.min,
        max: detail.waveHeight.max,
        plus: detail.waveHeight.plus,
      },
      dominantSwell: {
        height: detail.swells[0].height,
        period: detail.swells[0].period,
        direction: humanizeCompassDirection(detail.swells[0].direction),
      },
      wind: {
        speed: detail.wind.speed,
        direction: detail.wind.directionType,
      },
      tide: detail.tide.current.height,
      airTemp: detail.weather.temperature,
      waterTemp: detail.waterTemp.max,
    };
  }
}
