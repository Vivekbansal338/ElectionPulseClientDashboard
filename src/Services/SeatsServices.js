const url = "http://localhost:3000" + "/mediachannel/api/v1/seats";

// Get all seats
export const getAllSeats = async (token) => {
  const response = await fetch(`${url}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
