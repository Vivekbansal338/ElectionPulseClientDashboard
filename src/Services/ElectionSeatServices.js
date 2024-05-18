const url = "http://localhost:3000" + "/mediachannel/api/v1/electionseats";

// add seat
export const addSeat = async (token, data) => {
  console.log("addSeat", token, data);
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

// remove seat
export const removeSeat = async (token, data) => {
  console.log("removeSeat", token, data);
  const response = await fetch(`${url}/${data.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  return responseData;
};

//add party to election seat
export const addPartyToSeat = async (token, data) => {
  const response = await fetch(`${url}/addparty/${data.id}`, {
    method: "PUT",
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

//remove party from election seat
export const removePartyFromSeat = async (token, data) => {
  const response = await fetch(
    `${url}/removeparty/${data.id}/${data.partyId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  return responseData;
};

//add employee to election seat
export const addEmployeeToSeat = async (token, data) => {
  const response = await fetch(
    `${url}/addemployee/${data.electionSeatId}/${data.employeeId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  return responseData;
};

//remove employee from election seat
export const removeEmployeeFromSeat = async (token, data) => {
  const response = await fetch(
    `${url}/removeemployee/${data.electionSeatId}/${data.employeeId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  return responseData;
};

export const getAvailableSeatsByElectionId = async (
  token,
  id,
  seatType,
  state
) => {
  console.log("getAvailableSeatsByElectionId", token, id, seatType, state);
  const response = await fetch(
    `${url}/availableseats/${id}?state=${state}&seatType=${seatType}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const getSelectedSeatsByElectionId = async (
  token,
  id,
  seatType,
  state
) => {
  const response = await fetch(
    `${url}/includedseats/${id}?state=${state}&seatType=${seatType}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const getAvailableParties = async (token, id) => {
  const response = await fetch(`${url}/availableparties/${id}`, {
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

export const getAvailableEmployees = async (token, id) => {
  const response = await fetch(`${url}/availableemployees/${id}`, {
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
