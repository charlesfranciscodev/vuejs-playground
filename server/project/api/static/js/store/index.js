import Vue from "../vue.esm.browser.js";
import Vuex from "../vuex.esm.browser.js";
import auth from "./modules/auth.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth
  }
});
