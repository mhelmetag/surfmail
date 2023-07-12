import * as Twilio from "twilio";

exports.handler = function (_context, _event, callback) {
  const assetsBaseURL = "https://turquoise-emu-1178.twil.io/assets";
  const now = new Date();
  const assetURL = `${assetsBaseURL}/surfmail-${now.getFullYear()}-${now.getDate()}-${now.getDay()}.mpeg`;

  const twiml = new Twilio.twiml.VoiceResponse();
  twiml.play(assetURL);

  callback(null, twiml);
};
