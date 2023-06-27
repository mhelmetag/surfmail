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

    console.log("OPEN_API_KEY=" + process.env.CHATGPT_API_KEY);

    return axios
      .post(url.toString(), payload, {
        headers: {
          Authorization: `Bearer ${process.env.CHATGPT_API_KEY}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          console.error(response);
          throw new Error(
            `ChatGPT responded with status code ${response.status}`
          );
        }

        const data = response.data;
        return data.choices[0].message.content;
      })
      .catch((error) => {
        console.error(error);
        console.error(error.response.data);
        throw error;
      });
  }
}
