// VoiceMailCreator is a class that takes in a Surfline Spot ID,
// fetches the swell info from Surfline's API,
// uses the ChatGPT API to generate a voicemail transcript based on the swell facts,
// and returns the tmpfile path of the generated mp3 file from the ElevenLabs API

class VoiceMailCreator {
  constructor(surflineSpotId: string) {
    this.surflineSpotId = surflineSpotId;
  }

  create() {}

  private surflineSpotId: string;
}
