/**
 * Utility function for web API requests with fetch.
 *
 * Redirect to a new url in the case of an unintentional server error.
 * Returns a new promise with the response when the request is successful.
 * Returns a rejected promise with the error when the request failed.
 *
 * @param {Response} response
 * @returns {void|Promise<Response>|Promise<Error>}
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
