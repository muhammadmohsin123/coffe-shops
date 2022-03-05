const { useState } = require("react");
import { useDispatch, useSelector } from "react-redux";
import { setLatLong, getCoffeStores } from "../redux/coffeeStoreSlice";

export const useTrackLocation = () => {
  //   const [latLong, setLatLong] = useState("");
  const [locationErrMsg, setLocationErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    dispatch(setLatLong(`${latitude},${longitude}`));
    setLoading(false);
    // Do something with your latitude and longitude
    // setLatLong(`${latitude},${longitude}`);
    setLocationErrMsg("");
  }

  function error() {
    setLoading(true);
    setLocationErrMsg("Unable to retrieve your location");
  }

  function tracLocationHandler() {
    setLoading(true);
    if (!navigator.geolocation) {
      setLocationErrMsg("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return {
    tracLocationHandler,
    locationErrMsg,
    loading,
  };
};
