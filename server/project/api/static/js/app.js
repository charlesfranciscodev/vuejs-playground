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
    .then(function(response) {
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    }).then(response =>response.json())
    .then(data => this.message = data.message)
    .catch(error => console.log("error", error));
  }
})
