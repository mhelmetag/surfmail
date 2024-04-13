import * as dotenv from "dotenv";
import Rollbar from "rollbar";

import VoicemailCreator from "../lib/VoiceMailCreator";

dotenv.config();

const rollbar = new Rollbar({ accessToken: process.env.ROLLBAR_ACCESS_TOKEN });

const VENTURA_POINT_SPOT_ID = "584204204e65fad6a77096b1";
const voicemailCreator = new VoicemailCreator(VENTURA_POINT_SPOT_ID);
voicemailCreator
  .create()
  .then((filename) => {
    console.log(filename);
  })
  .catch((error) => {
    console.error(error);
    rollbar.error(error);
  });
