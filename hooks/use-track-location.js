const { useState } = require("react");

export const useTrackLocation = () => {
  const [latLong, setLatLong] = useState("");
  const [locationErrMsg, setLocationErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLoading(false);
    // Do something with your latitude and longitude
    setLatLong(`${latitude},${longitude}`);
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
      //   const status = "Locating…";

      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return {
    latLong,
    tracLocationHandler,
    locationErrMsg,
    loading,
  };
};
