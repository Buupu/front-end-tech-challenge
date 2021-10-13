import axios from "axios";

const instance = axios.create({
  baseURL: "https://images-api.nasa.gov/",
});

export const getSearchResults = (query: string) => {
  return instance.get(`/search?&media_type=image&q=${query}`);
};
