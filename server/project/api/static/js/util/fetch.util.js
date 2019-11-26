function handleResponse(response) {
  if (response.redirected) {
    window.location.replace(response.url);
  }
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

export default handleResponse;
