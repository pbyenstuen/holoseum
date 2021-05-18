const checkResponse = (res) => {
  if (!res.ok) {
    throw Error(`${res.status} ${res.statusText}`);
  }
}

export const fetchJSON = async (url, options = null) => {
  const response = await fetch(`/api${url}`, options);
  checkResponse(response);
  return await response.json();
}