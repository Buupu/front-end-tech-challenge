import axios from "axios";

const instance = axios.create({
  baseURL: "https://images-api.nasa.gov/",
});

export const getSearchResults = (query: string, mediaType: string) => {
  return instance.get(`/search?&media_type=${mediaType}&q=${query}`);
};

export const getAsset = (assetId: string) => {
  return instance.get(`/asset/${assetId}`);
};
