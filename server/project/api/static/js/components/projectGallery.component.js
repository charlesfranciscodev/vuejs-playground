import { mapGetters } from "../vuex.esm.browser.js";

import ProjectGalleryTemplate from "../templates/projectGallery.template.js";
import ProjectCard from "./projectCard.component.js";

import handleResponse from "../util/fetch.util.js";

const ProjectGallery = {
  data() {
    return {
      projects: []
    }
  },

  computed: mapGetters(["user"]),

  template: ProjectGalleryTemplate,

  components: {
    "project-card": ProjectCard
  },

  /**
   * Send a web API request to get information about all the projects.
   * @returns {void}
   */
  created() {
    const url = "/api/projects";
    const options = {
      headers: {
        "Authorization": `Bearer ${this.user.token}`
      }
    }
    
    fetch(url, options)
    .then(handleResponse)
    .then(response => response.json())
    .then(data => this.projects = data)
    .catch(error => console.log(error));
  }
};

export default ProjectGallery;
