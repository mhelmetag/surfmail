import * as fs from "node:fs";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import Surfline from "../api/Surfline";
import { SurfForecastFacts } from "../types/SurfForecastFacts";
import { humanizeCompassDirection } from "./surflineHelpers";
import PromptCreator from "./PromptCreator";
import ChatGPT from "../api/ChatGPT";
import ElevenLabs from "../api/ElevenLabs";
import { BatchDetail } from "../types/api/Surfline";
import { voicemailFilename } from "./fileHelpers";

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
          const client = new S3Client({
            region: process.env.AWS_DEFAULT_REGION,
          });

          // Upload prompt and response to S3 for historical purposes
          const promptFilename = voicemailFilename("txt");

          console.log("Uploading prompt and response to S3...");

          const promptSaveCommand = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `${process.env.NODE_ENV}/${promptFilename}`,
            Body: `PROMPT:\n${prompt}\n\nRESPONSE:\n${response}`,
            ContentType: "text/plain",
          });
          client.send(promptSaveCommand);

          const editedResponse = response.replace("\\n", "");
          return new ElevenLabs()
            .postTTS(editedResponse)
            .then((data: string) => {
              const recordingFilename = voicemailFilename();

              console.log("Uploading recording to S3...");

              const recordingSaveCommand = new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: `${process.env.NODE_ENV}/${recordingFilename}`,
                Body: data,
                ContentType: "audio/mp3",
              });
              return client.send(recordingSaveCommand).then(() => {
                return recordingFilename;
              });
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
