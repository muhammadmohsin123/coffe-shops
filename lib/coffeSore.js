import axios from "axios";
import { createApi } from "unsplash-js";
////

const unsplash = createApi({
  accessKey: process.env.ACCESS_KEY,
});

// Variables
const latlong = "43.65267326999575,-79.39545615725015";
const query = "coffee stores";
const limit = "6";

const coffeeStorePhotoes = async () => {
  const photoes = await unsplash.search.getPhotos({
    query: "coffee",
    perPage: 10,
  });
  return photoes.response.results;
};

export const fectchCoffeSTores = async () => {
  const photoes = await coffeeStorePhotoes();
  const imageUrls = photoes.map((item) => item.urls["small"]);

  const respone = await axios.get(
    `https://api.foursquare.com/v3/places/nearby?ll=${latlong}&${query}&v=20220105&limit=6`,
    {
      headers: {
        Authorization: `${process.env.API_KEY}`,
      },
    }
  );
  const formatedData = respone.data.results.map((item, idx) => {
    return {
      ...item,
      imgUrl: imageUrls[idx],
    };
  });
  console.log("formatedData", formatedData);
  return formatedData;
};
