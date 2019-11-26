import handleResponse from "../util/fetch.util.js";

const GetContactMixin = {
  created() {
    const url = `/api/contacts/${this.$route.params.id}`;
    fetch(url)
    .then(handleResponse)
    .then(response => response.json())
    .then(data => this.contact = data)
    .catch(error => console.log(error));
  }
};

export default GetContactMixin;
