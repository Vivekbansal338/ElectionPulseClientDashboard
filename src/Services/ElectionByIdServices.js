const url = "http://localhost:3000" + "/mediachannel/api/v1/elections";

// Get election by id status
export const getElectionStatus = async (token, id) => {
  console.log("getElectionStatus", token, id);
  const response = await fetch(`${url}/status/${id}`, {
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
