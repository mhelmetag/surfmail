import * as Twilio from "twilio";

export const handler = (_context, _event, callback) => {
  const assetURL =
    "https://turquoise-emu-1178.twil.io/assets/surfmail-2023-7-5.mp3";

  const voiceResponse = new Twilio.twiml.VoiceResponse();

  console.log("Playing surf report");
  voiceResponse.play(assetURL);

  callback(null, voiceResponse);
};
