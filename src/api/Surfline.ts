import axios from "axios";
import querystring from "querystring";
import { BatchResponse } from "../types/api/Surfline";

// Surfline is a wrapper for the Surfline API
export default class Surfline {
  baseURL = "https://services.surfline.com";

  getBatchDetails(spotIds: string[]): Promise<BatchResponse> {
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

    return axios
      .get(url.toString())
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(
            `Surfline responded with status code ${response.status}`
          );
        }

        const data = response.data;
        return data.data;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  private spotId: string;
}
