import NotFoundTemplate from "../templates/notFound.template.js";

const NotFound = {
  template: NotFoundTemplate,

  /**
   * Redirect to server side 404 route.
   * @returns {void}
   */
  created() {
    window.location.replace(this.$route.params.pathMatch);
  }
}

export default NotFound;
