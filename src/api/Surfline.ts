import axios from "axios";
import querystring from "node:querystring";

import { BatchDetail } from "../types/api/Surfline";

// Surfline is a wrapper for the Surfline API
export default class Surfline {
  baseURL = "https://services.surfline.com";

  getBatchDetails(spotIds: string[]): Promise<BatchDetail[]> {
    const params = {
      spotIds: spotIds.join(","),
      "units[swellHeight]": "FT",
      "units[windSpeed]": "MPH",
      "units[temperature]": "F",
      "units[tideHeight]": "FT",
      "units[waveHeight]": "FT",
    };
    const queryString = querystring.stringify(params);
    const url = new URL(`/kbyg/spots/batch?${queryString}`, this.baseURL);

    console.log("Getting Surfline batch details...");

    return axios
      .get(url.toString(), {
        headers: {
          Accept: "application/json",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36",
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          console.error(response);
          throw new Error(
            `Surfline responded with status code ${response.status}`
          );
        }

        console.log(response);

        const data = response.data;
        return data.data;
      })
      .catch((error) => {
        console.error(error);
        console.error(error.response?.data);
        throw error;
      });
  }

  private spotId: string;
}
