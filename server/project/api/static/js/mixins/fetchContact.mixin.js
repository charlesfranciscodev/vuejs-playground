const FetchContactMixin = {
  created() {
    const url = `/api/contacts/${this.$route.params.id}`;
    fetch(url)
    .then(function(response) {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    }).then(response => response.json())
    .then(data => this.contact = data)
    .catch(error => console.log(error));
  }
};

export default FetchContactMixin;
