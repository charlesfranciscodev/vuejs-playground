import Vue from "./vue.esm.browser.js";
import VueRouter from "./vue-router.esm.browser.js";
import AppTemplate from "./templates/app.template.js";
import Jumbotron from "./components/jumbotron.component.js";
import Navbar from "./components/navbar.component.js";
import About from "./components/about.component.js";
import ContactGallery from "./components/contactGallery.component.js";
import ContactDetail from "./components/contactDetail.component.js";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: ContactGallery
    },
    {
      path: "/about",
      component: About
    },
    {
      path: "/view/:id",
      component: ContactDetail
    }
  ]
});

new Vue({
  el: '#app',

  components: {
    "jumbotron": Jumbotron,
    "navbar": Navbar
  },

  router,

  template: AppTemplate,
})
