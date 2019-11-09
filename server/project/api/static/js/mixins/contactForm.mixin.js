import ContactFormTemplate from "../templates/contactForm.template.js";

const ContactFormMixin = {
  props: ["heading", "buttonText", "httpMethod"],

  data: function() {
    return {
      contact: {
        "contactId": null,
        "firstName": "",
        "lastName": "",
        "email": "",
        "birthdate": "",
        "phoneNumber": "",
        "avatarUrl": "",
        "description": ""
      },
      errors: []
    }
  },

  template: ContactFormTemplate,

  methods: {
    validateEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    validateForm: function() {
      let valid = true;
      this.errors = [];

      if (this.contact.firstName === "") {
        this.errors.push("First Name required.");
        valid = false;
      }

      if (this.contact.lastName === "") {
        this.errors.push("Last Name required.");
        valid = false;
      }

      if (!this.validateEmail(this.contact.email)) {
        this.errors.push("Invalid Email.");
        valid = false;
      }

      if (this.contact.birthdate === "") {
        this.errors.push("Birthdate required.");
        valid = false;
      }

      if (this.contact.phoneNumber === "") {
        this.errors.push("Phone Number required.");
        valid = false;
      }

      if (this.contact.avatarUrl === "") {
        this.errors.push("Avatar URL required.");
        valid = false;
      }

      if (this.contact.description === "") {
        this.errors.push("Description required.");
        valid = false;
      }

      return valid;
    },

    createOrUpdateContact: function(event) {
      if (!this.validateForm()) {
        return;
      }

      let errors = this.errors;
      let router = this.$router;

      const url = `/api/contacts`;
      const options = {
        method: this.httpMethod,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.contact)
      }
      fetch(url, options)
      .then(function(response) {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response);
        } else {
          return response.json().then(function(responseJson) {
            let error = new Error(responseJson.message);
            return Promise.reject(error);
          });
        }
      }).then(response => response.json())
      .then(function(responseJson) {
        router.push(`/view/${responseJson.contact_id}`);
      })
      .catch(function(error){
        errors.push(error);
      });
    }
  }
}

export default ContactFormMixin;
