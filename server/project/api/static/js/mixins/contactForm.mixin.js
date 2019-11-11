import ContactFormTemplate from "../templates/contactForm.template.js";

const ContactFormMixin = {
  props: ["heading", "buttonText", "httpMethod"],

  data: function() {
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
        "birthdate": "Birthdate",
        "phone_number": "Phone Number",
        "avatar_url": "Avatar URL",
        "description": "Description"
      },
      projects: [],
      errors: [],
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

    createOrUpdateContact: function(event) {
      if (!this.validateForm()) {
        return;
      }

      let that = this;

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
        if (response.ok) {
          return Promise.resolve(response);
        } else {
          return response.json().then(function(responseJson) {
            let error = new Error(responseJson.message);
            return Promise.reject(error);
          });
        }
      }).then(response => response.json())
      .then(function(responseJson) {
        that.router.push(`/view/${responseJson.contact_id}`);
      })
      .catch(function(error){
        that.errors.push(error);
      });
    }
  },

  created() {
    const url = "/api/projects";
    fetch(url)
    .then(function(response) {
      if (response.ok) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    }).then(response => response.json())
    .then(data => this.projects = data)
    .catch(error => console.log(error));
  }
}

export default ContactFormMixin;
