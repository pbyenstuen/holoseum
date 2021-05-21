const checkResponse = (res) => {
  if (!res.ok) {
    throw Error(`${res.status} ${res.statusText}`);
  }
}

export const post = async (url, { method, payload }) => {
  const response = await fetch(`/api${url}`, {
    method,
    body: payload,
  });
  checkResponse(response, url);
  return await response.json();
}

export const postJSON = async (url, { method, payload }) => {
  const response = await fetch(`/api${url}`, {
    method,
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    }
  });
  checkResponse(response, url);
  return await response.json();
}

export const fetchJSON = async (url, options = null) => {
  const response = await fetch(`/api${url}`, options);
  checkResponse(response);
  return await response;
}