import path from "node:path";

import express from "express";
import * as dotenv from "dotenv";
import * as Twilio from "twilio";

import { voicemailFilename } from "./lib/fileHelpers";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "../public") });
});

app.get("/voice", (_, res) => {
  const voiceResponse = new Twilio.twiml.VoiceResponse();

  const welcomeURL = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/welcome.mp3`;
  voiceResponse.play(welcomeURL);

  const filename = voicemailFilename();
  const voicemailURL = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${process.env.NODE_ENV}/${filename}`;
  voiceResponse.play(voicemailURL);

  res.type("text/xml");
  res.send(voiceResponse.toString());
});

app.get("/error", (_, res) => {
  const errorURL = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/error.mp3`;
  const voiceResponse = new Twilio.twiml.VoiceResponse();

  voiceResponse.play(errorURL);

  res.type("text/xml");
  res.send(voiceResponse.toString());
});

app.listen(port, () => {
  console.log(`Surfmail listening on port ${port}`);
});
