import axios from "axios";

// ElevenLabs is a wrapper for the ElevenLabs API
export default class ElevenLabs {
  baseURL = "https://api.elevenlabs.io";
  voiceID = "3aGfjsuKI2hjUqEpRPpp";

  postTTS(text: string): Promise<string> {
    const url = new URL(`/v1/text-to-speech/${this.voiceID}`, this.baseURL);
    const payload = {
      text: text,
      model_id: "eleven_monolingual_v1",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5,
      },
    };

    console.log("Sending text to ElevenLabs...");

    return axios
      .post(url.toString(), payload, {
        responseType: "arraybuffer",
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          console.error(response);
          throw new Error(
            `ElevenLabs responded with status code ${response.status}`
          );
        }

        return response.data;
      })
      .catch((error) => {
        console.error(error);
        console.error(error.response?.data);
        throw error;
      });
  }
}
