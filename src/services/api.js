const API_URL = "http://localhost:3001";

export const getDonorsFromAPI = async () => {
  const response = await fetch(`${API_URL}/donors`);

  if (!response.ok) {
    throw new Error("Failed to fetch donors");
  }

  return response.json();
};

export const getRequestsFromAPI = async () => {
  const response = await fetch(`${API_URL}/requests`);

  if (!response.ok) {
    throw new Error("Failed to fetch requests");
  }

  return response.json();
};

export const addDonorToAPI = async (donor) => {
  const response = await fetch(`${API_URL}/donors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(donor),
  });

  if (!response.ok) {
    throw new Error("Failed to add donor");
  }

  return response.json();
};

export const addRequestToAPI = async (request) => {
  const response = await fetch(`${API_URL}/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to add request");
  }

  return response.json();
};

export const updateDonorAvailability = async (id, availability) => {
  const response = await fetch(`${API_URL}/donors/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      availability,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update donor availability");
  }

  return response.json();
};

export const updateRequestStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/requests/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update request status");
  }

  return response.json();
};