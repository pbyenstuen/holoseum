const checkResponse = (res) => {
  if (!res.ok) {
    throw Error(`${res.status} ${res.statusText}`);
  }
}

export const post = async (url, { method, payload, headers = undefined }) => {
  const response = await fetch(`/api${url}`, {
    method,
    body: payload,
    headers: headers
  });
  checkResponse(response, url);
  return await response;
}

export const get = async (url, options = undefined) => {
  const response = await fetch(`/api${url}`, options);
  checkResponse(response);
  return await response;
}