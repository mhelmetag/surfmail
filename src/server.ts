import express from "express";
import * as dotenv from "dotenv";
import * as Twilio from "twilio";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("All I need are some tasty waves...");
});

app.get("/voice", (_, res) => {
  const assetURL =
    "https://turquoise-emu-1178.twil.io/assets/surfmail-2023-7-5.mp3";
  const voiceResponse = new Twilio.twiml.VoiceResponse();

  voiceResponse.play(assetURL);

  res.type("text/xml");
  res.send(voiceResponse.toString());
});

app.listen(port, () => {
  console.log(`Surfmail listening on port ${port}`);
});
