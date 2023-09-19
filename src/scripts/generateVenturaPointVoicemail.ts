import * as dotenv from "dotenv";

import VoicemailCreator from "../lib/VoiceMailCreator";

dotenv.config();

const spotId = "584204204e65fad6a77096b1";
const voicemailCreator = new VoicemailCreator(spotId);
voicemailCreator
  .create()
  .then((filename) => {
    console.log(filename);
  })
  .catch((error) => {
    console.error(error);
  });
