import { mapGetters } from "../vuex.esm.browser.js";

const DeleteContactMixin = {
  computed: mapGetters(["user"]),

  methods: {
    deleteContact: function(contactId) {
      let that = this;
      const url = `/api/contacts/${contactId}`;
      const options = {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${this.user.token}`
        }
      };
      
      fetch(url, options)
      .then(function(response) {
        if (response.ok) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      }).then(function(response) {
        if (that.$route.name === "home") {
          // emit event to delete the contact from the state
          that.$emit("del-contact");
        } else if (that.$route.name === "view") {
          // navigate to the home page?
          if (that.$router.currentRoute.name !== "home") {
            that.$router.push("/");
          }
        }
      })
      .catch(error => console.log(error));
    }
  }
};

export default DeleteContactMixin;
