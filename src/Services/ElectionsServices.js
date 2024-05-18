const url = "http://localhost:3000" + "/mediachannel/api/v1/elections";

// Create a new election

export const createElection = async (token, data) => {
  const response = await fetch(`${url}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  return responseData;
};

// Get all elections
export const getElections = async (token) => {
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

// get election by id
export const getElectionById = async (token, id) => {
  const response = await fetch(`${url}/${id}`, {
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

// update an election by id
export const updateElection = async (token, data) => {
  const response = await fetch(`${url}/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  // Check if the request was successful
  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }

  const responseData = await response.json();
  return responseData;
};

// change the status of an election
export const changeElectionStatus = async (token, data) => {
  const response = await fetch(`${url}/changestatus`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  console.log(response);

  // Check if the request was successful
  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }

  const responseData = await response.json();
  return responseData;
};

export const getSeatOverviewByElection = async (token, id, pageparams) => {
  const response = await fetch(`${url}/overview/${id}?page=${pageparams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  // Check if the request was successful
  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }

  const data = await response.json();
  return data;
};
