import VoicemailCreator from "../lib/VoiceMailCreator";

const spotId = "5842041f4e65fad6a7708f7a";
const voicemailCreator = new VoicemailCreator(spotId);
voicemailCreator.create().then((filepath) => {
  console.log(filepath);
});
