import { mapGetters } from "../vuex.esm.browser.js";

import { ProjectDetailTemplate } from "../templates/projectDetail.template.js";

const ProjectDetail = {
  data: function() {
    return {
      project: {}
    }
  },

  computed: {
    ...mapGetters(["user"]),

    emptyProject: function() {
      return Object.keys(this.project).length === 0;
    }
  },

  template: ProjectDetailTemplate,

  created() {
    const url = `/api/projects/${this.$route.params.id}`;
    const options = {
      headers: {
        "Authorization": `Bearer ${this.user.token}`
      }
    }
    fetch(url, options)
    .then(function(response) {
      if (response.ok) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    }).then(response => response.json())
    .then(data => this.project = data)
    .catch(error => console.log(error));
  }
};

export default ProjectDetail;
