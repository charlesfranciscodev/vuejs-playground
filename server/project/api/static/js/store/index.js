import Vue from "../vue.esm.browser.min.js";
import Vuex from "../vuex.esm.browser.min.js";
import auth from "./modules/auth.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth
  }
});
