import { mapActions, mapGetters } from "../vuex.esm.browser.js";

import NavbarTemplate from "../templates/navbar.template.js";

const Navbar = {
  data: function() {
    return {
      collapse: true
    }
  },

  methods: {
    ...mapActions(["logout"]),

    toggleMenu: function (event) {
      this.collapse = !this.collapse;
      console.log(this.collapse);
    },

    logoutButtonClick: function(event) {
      this.logout();
    }
  },

  computed: {
    ...mapGetters(["user"]),

    classProperty: function () {
      return {
        "collapse": this.collapse,
        "in": !this.collapse
      }
    },

    loggedIn: function() {
      return Object.keys(this.user).length !== 0;
    }
  },

  template: NavbarTemplate,
}

export default Navbar;
