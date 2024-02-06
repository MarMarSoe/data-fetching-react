import { useEffect } from "react";
import Places from "./Places.jsx";
import { useState } from "react";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false); //for loading state control
  const [availablePlace, setAvailablePlace] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlace(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message: error.message || "Could not fetch places, please try again.",
        });
        setIsFetching(false);
      }
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An Error occurred" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlace}
      isLoading={isFetching}
      loadingText="Fetching Data ...."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
