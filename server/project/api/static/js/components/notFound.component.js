import NotFoundTemplate from "../templates/notFound.template.js";

const NotFound = {
  template: NotFoundTemplate,

  created: function() {
    console.log(this.$route.params.pathMatch);
    // get out of vue-router
    window.location.replace(this.$route.params.pathMatch);
  }
}

export default NotFound;
