import express from "express";
import * as dotenv from "dotenv";
import * as Twilio from "twilio";

import { voicemailFilename } from "./lib/fileHelpers";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_, res) => {
  res.send("All I need are some tasty waves...");
});

app.get("/voice", (_, res) => {
  const filename = voicemailFilename();

  // From S3
  const assetURL = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${process.env.NODE_ENV}/${filename}`;
  const voiceResponse = new Twilio.twiml.VoiceResponse();

  voiceResponse.play(assetURL);

  res.type("text/xml");
  res.send(voiceResponse.toString());
});

app.listen(port, () => {
  console.log(`Surfmail listening on port ${port}`);
});
