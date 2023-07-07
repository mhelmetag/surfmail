import * as Twilio from "twilio";

exports.handler = function (_context, _event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  twiml.play("https://turquoise-emu-1178.twil.io/assets/recording.mpeg");
  callback(null, twiml);
};
