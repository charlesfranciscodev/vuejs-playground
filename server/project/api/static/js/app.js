import Vue from "./vue.esm.browser.js";
import AppTemplate from "./templates/app.template.js";
import Jumbotron from "./components/jumbotron.component.js";
import ContactGallery from "./components/contactGallery.component.js";

new Vue({
  el: '#app',

  template: AppTemplate,

  components: {
    "jumbotron": Jumbotron,
    "contact-gallery": ContactGallery
  }
})
