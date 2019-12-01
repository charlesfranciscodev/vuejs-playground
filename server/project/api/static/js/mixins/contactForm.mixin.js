import { mapGetters } from "../vuex.esm.browser.js";

import ContactFormTemplate from "../templates/contactForm.template.js";

import handleResponse from "../util/fetch.util.js";

const ContactFormMixin = {
  props: ["heading", "buttonText", "httpMethod"],

  data() {
    return {
      contact: {
        "contact_id": this.$route.params.id,
        "first_name": "",
        "last_name": "",
        "username": "",
        "password": "",
        "email": "",
        "birthdate": "",
        "phone_number": "",
        "avatar_url": "",
        "description": "",
        "projects": []
      },
      labels: {
        "first_name": "First Name",
        "last_name": "Last Name",
        "username": "Username",
        "password": "Password",
        "short_birthdate": "Birthdate",
        "phone_number": "Phone Number",
        "avatar_url": "Avatar URL",
        "description": "Description"
      },
      projects: [],
      errors: [],
    }
  },

  template: ContactFormTemplate,

  computed: {
    ...mapGetters(["user"])
  },

  methods: {
    /**
     * Validate whether the email address is valid or not.
     * @param {String} email 
     * @returns {Boolean}
     */
    validateEmail(email) {
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    },

    /**
     * Validate whether the form data is valid or not. 
     * @returns {Boolean}
     */
    validateForm() {
      let valid = true;
      this.errors = [];

      for (let [key, label] of Object.entries(this.labels)) {
        if (this.contact[key] === "") {
          this.errors.push(`${label} required.`);
          valid = false;
        }
      }

      if (!this.validateEmail(this.contact.email)) {
        this.errors.push("Invalid Email.");
        valid = false;
      }

      return valid;
    },

    /**
     * Send a web API request to create or update a contact.
     * @returns {void}
     */
    createOrUpdateContact() {
      if (!this.validateForm()) {
        return;
      }
      let that = this;
      let url = `/api/contacts`;
      let options = {
        method: this.httpMethod,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.user.token}`
        },
        body: JSON.stringify(this.contact)
      }

      fetch(url, options)
      .then(function(response) {
        if (response.redirected) {
          window.location.replace(response.url);
        }
        if (response.ok) {
          return Promise.resolve(response);
        } else {
          return response.json().then(function(responseJson) {
            let error = new Error(responseJson.message);
            return Promise.reject(error);
          });
        }
      }).then(response => response.json())
      .then((data) => that.$router.push(`/view/${data.contact_id}`))
      .catch((error) => that.errors.push(error));
    }
  },

  /**
   * Send a web API request to get information about all projects.
   * @returns {void}
   */
  created() {
    fetch("/api/all-projects")
    .then(handleResponse)
    .then(response => response.json())
    .then(data => this.projects = data)
    .catch(error => console.error(error));
  }
}

export default ContactFormMixin;
