import { mapGetters } from "../vuex.esm.browser.js";

import ProjectDetailTemplate from "../templates/projectDetail.template.js";

import handleResponse from "../util/fetch.util.js";

const ProjectDetail = {
  data() {
    return {
      project: {}
    }
  },

  computed: {
    ...mapGetters(["user"]),

    /**
     * Whether or not the project is an empty object.
     * @returns {Boolean}
     */
    emptyProject() {
      return Object.keys(this.project).length === 0;
    }
  },

  template: ProjectDetailTemplate,

  /**
   * Send a web API request to get the project information.
   * @returns {void}
   */
  created() {
    const url = `/api/projects/${this.$route.params.id}`;
    const options = {
      headers: {
        "Authorization": `Bearer ${this.user.token}`
      }
    }
    
    fetch(url, options)
    .then(handleResponse)
    .then(response => response.json())
    .then(data => this.project = data)
    .catch(error => console.log(error));
  }
};

export default ProjectDetail;
