import NavbarTemplate from "../templates/navbar.template.js";

const Navbar = {
  data: function() {
    return {
      collapse: true
    }
  },

  methods: {
    toggleMenu: function (event) {
      this.collapse = !this.collapse;
      console.log(this.collapse);
    }
  },

  computed: {
    classProperty: function () {
      return {
        "collapse": this.collapse,
        "in": !this.collapse
      }
    }
  },

  template: NavbarTemplate,
}

export default Navbar;
