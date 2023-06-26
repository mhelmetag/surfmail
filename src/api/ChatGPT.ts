import axios from "axios";

// ChatGPT is a wrapper for the ChatGPT API
export default class ChatGPT {
  baseURL = "https://api.openai.com";

  postChatResponse(content: string): Promise<string> {
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: content }],
    };

    const url = new URL(`/v1/chat/completions`, this.baseURL);

    return axios
      .post(url.toString(), {
        payload,
        Headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(
            `ChatGPT responded with status code ${response.status}`
          );
        }

        const data = response.data;
        return data.choices[0].message.content;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
}
