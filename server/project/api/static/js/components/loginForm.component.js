import { mapActions, mapGetters } from "../vuex.esm.browser.js";

import LoginFormTemplate from "../templates/loginForm.template.js";

const LoginForm = {
  data: function() {
    return {
      formData: {
        "username": "",
        "password": ""
      }
    }
  },

  template: LoginFormTemplate,

  computed: mapGetters(["errors"]),

  methods: {
    ...mapActions(["login"]),

    loginButtonClick: function(event) {
      let that = this;

      this.login(this.formData)
      .then(() => {
        // go back to the previous page
        that.$router.go(-1);
      })
      .catch(() => console.log("login error"));
    }
  },
}

export default LoginForm;
