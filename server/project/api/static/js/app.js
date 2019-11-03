import Vue from "./vue.esm.browser.js";
import { AppTemplate } from "./templates/app.template.js";
import { Jumbotron } from "./components/jumbotron.component.js";

new Vue({
  el: '#app',

  data: {
    message: ""
  },

  template: AppTemplate,

  components: {
    "jumbotron": Jumbotron
  },

  created() {
    const url = "http://localhost:5000/api/test";
    fetch(url)
    .then(response => response.json())
    .then(data => this.message = data.message);
  }
})
