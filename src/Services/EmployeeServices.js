const url = "http://localhost:3000" + "/mediachannel/api/v1/employees";

// Create a new election

export const addEmployee = async (token, data) => {
  const response = await fetch(`${url}/create-employee`, {
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

// Get all employees
export const getEmployees = async (token, page) => {
  const response = await fetch(`${url}/?page=${page}`, {
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

  const responseData = await response.json();
  return responseData;
};
