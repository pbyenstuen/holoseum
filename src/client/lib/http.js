const checkResponse = (res, url) => {
  if (!res.ok) {
    let error = `${res.status} ${res.statusText}`;
    const statusCode = res.status.toString();
    if (url.startsWith("/auth") && (statusCode === "400" || statusCode === "401")) {
      error = "Feil brukernavn/passord";
    }
    if (url.startsWith("/holograms/upload") && (statusCode === "500" )) {
      error = "Det oppstod en feil. Lastet du opp riktig filtype (.mp4)?";
    } 
    throw error;
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