import axios from "axios";

export async function fetchAvailablePlaces() {
  const response = await axios.get("http://localhost:3000/places");
  const resData = await response.data.places;

  return resData;
}

export async function updateUserPlaces(places) {
  const response = await axios({
    method: "PUT",
    url: "http://localhost:3000/user-places",
    data: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = response.message;
  return resData;
}
