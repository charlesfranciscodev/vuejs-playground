import handleResponse from "../util/fetch.util.js";

const GetContactMixin = {
  /**
   * Send a web API request to get contact information.
   * @returns {void}
   */
  created() {
    let url = `/api/contacts/${this.$route.params.id}`;
    fetch(url)
    .then(handleResponse)
    .then(response => response.json())
    .then(data => this.contact = data)
    .catch(error => console.error(error));
  }
};

export default GetContactMixin;
