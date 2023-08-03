import * as path from "path";

import express from "express";
import * as dotenv from "dotenv";
import * as Twilio from "twilio";

import { voicemailFilename } from "./lib/fileHelpers";

dotenv.config();

const app = express();
const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || 3000;

app.get("/", (_, res) => {
  res.send("All I need are some tasty waves...");
});

app.get("/voice", (_, res) => {
  const filename = voicemailFilename();
  const assetURL = `${host}/recordings/${filename}`;
  const voiceResponse = new Twilio.twiml.VoiceResponse();

  voiceResponse.play(assetURL);

  res.type("text/xml");
  res.send(voiceResponse.toString());
});

app.use(
  "/recordings",
  express.static(path.join(__dirname, "..", "recordings"))
);

app.listen(port, () => {
  console.log(`Surfmail listening on port ${port}`);
});
