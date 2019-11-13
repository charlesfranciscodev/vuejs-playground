import LoginFormTemplate from "../templates/loginForm.template.js";

const LoginForm = {
  data: function() {
    return {
      user: {
        "username": "",
        "password": ""
      },
      errors: [],
    }
  },

  template: LoginFormTemplate,

  methods: {
    validateForm: function() {
      let valid = true;
      this.errors = [];

      if (this.user["username"] === "") {
        this.errors.push("Username required.");
        valid = false;
      }

      if (this.user["password"] === "") {
        this.errors.push("Password required.");
        valid = false;
      }

      return valid;
    },

    loginButtonClick: function(event) {
      if (!this.validateForm()) {
        return;
      }

      let that = this;

      const url = "/login";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.user)
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
        console.log(responseJson);
        // TODO save in global state

        // redirect to the previous page (in the history)

      })
      .catch(function(error){
        that.errors.push(error);
      });
    }
  },
}

export default LoginForm;
