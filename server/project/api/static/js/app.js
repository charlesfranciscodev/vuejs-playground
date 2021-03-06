import Vue from "./vue.esm.browser.js";
import VueRouter from "./vue-router.esm.browser.js";

import store from "./store/index.js";

import AppTemplate from "./templates/app.template.js";

import Jumbotron from "./components/jumbotron.component.js";
import Navbar from "./components/navbar.component.js";

import ContactGallery from "./components/contactGallery.component.js";
import CreateContact from "./components/createContact.component.js";
import UpdateContact from "./components/updateContact.component.js";
import About from "./components/about.component.js";
import ContactDetail from "./components/contactDetail.component.js";
import LoginForm from "./components/loginForm.component.js";
import ProjectGallery from "./components/projectGallery.component.js";
import ProjectDetail from "./components/projectDetail.component.js";
import NotFound from "./components/notFound.component.js";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: ContactGallery,
      name: "home"
    },
    {
      path: "/create",
      component: CreateContact,
      props: {
        "heading": "Create New Contact",
        "buttonText": "Create",
        "httpMethod": "POST"
      },
      name: "create"
    },
    {
      path: "/edit/:id",
      component: UpdateContact,
      props: {
        "heading": "Edit Contact",
        "buttonText": "Save",
        "httpMethod": "PUT"
      },
      name: "edit"
    },
    {
      path: "/about",
      component: About,
      name: "about"
    },
    {
      path: "/view/:id",
      component: ContactDetail,
      name: "view"
    },
    {
      path: "/login",
      component: LoginForm,
      name: "login"
    },
    {
      path: "/projects",
      component: ProjectGallery,
      name: "projects"
    },
    {
      path: "/project/:id",
      component: ProjectDetail,
      name: "project"
    },
    {
      // will match everything
      path: "*",
      component: NotFound,
      name: "notFound"
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

  store
});

