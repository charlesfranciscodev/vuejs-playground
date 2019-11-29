/**
 * Utility function for web API requests with fetch.
 * @param {Promise<Response>} response
 * @returns {void|Promise<Response>|Promise<String>}
 * Redirect to a new url in the case of an unintentional server error.
 * Returns a new promise when the request is successful.
 * Returns a rejected promise when the request failed.
 */
function handleResponse(response) {
  if (response.redirected) {
    // redirect to the url in the response
    window.location.replace(response.url);
  }
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

export default handleResponse;
