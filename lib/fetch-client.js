export const sendRequest = async (endpoint, body, method = "POST") => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${endpoint}`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    const { message } = error;
    throw new Error(message || `Send OTP | API Failed!`);
  }

  const data = await response.json();
  return data;
};

export const fetchDataClient = async (endpoint) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${endpoint}`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    const { message } = error;
    throw new Error(message || `${endpoint} | API Failed!`);
  }

  const data = await response.json();
  return data;
};
