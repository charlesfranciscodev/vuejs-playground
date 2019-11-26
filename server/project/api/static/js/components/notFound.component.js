import NotFoundTemplate from "../templates/notFound.template.js";

const NotFound = {
  template: NotFoundTemplate,

  created: function() {
    // get out of vue-router
    window.location.replace(this.$route.params.pathMatch);
  }
}

export default NotFound;
