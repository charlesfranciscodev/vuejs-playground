import { mapActions, mapGetters } from "../vuex.esm.browser.js";

import NavbarTemplate from "../templates/navbar.template.js";

const Navbar = {
  data() {
    return {
      collapse: true
    }
  },

  methods: {
    ...mapActions(["logout"]),

    toggleMenu() {
      this.collapse = !this.collapse;
    },

    logoutButtonClick() {
      this.logout();
      this.$router.push({"name": "home"});
    }
  },

  computed: {
    ...mapGetters(["user"]),

    classProperty() {
      return {
        "collapse": this.collapse,
        "in": !this.collapse
      }
    },

    loggedIn() {
      return Object.keys(this.user).length !== 0;
    }
  },

  template: NavbarTemplate,
}

export default Navbar;
