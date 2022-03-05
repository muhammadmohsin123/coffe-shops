import axios from "axios";
import { createApi } from "unsplash-js";
////

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
});

// Variables
const latlongEx = "43.65267326999575,-79.39545615725015";
const query = "coffee stores";
const limit = "6";

const coffeeStorePhotoes = async () => {
  const photoes = await unsplash.search.getPhotos({
    query: "coffee",
    perPage: 15,
  });
  return photoes.response.results;
};

export const fectchCoffeSTores = async (latLong = latlongEx, limit = 6) => {
  const photoes = await coffeeStorePhotoes();
  const imageUrls = photoes.map((item) => item.urls["small"]);

  const respone = await axios.get(
    `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&${query}&v=20220105&limit=${limit}`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  );
  const formatedData = respone.data.results.map((item, idx) => {
    return {
      ...item,
      imgUrl: imageUrls[idx],
    };
  });

  return formatedData;
};
