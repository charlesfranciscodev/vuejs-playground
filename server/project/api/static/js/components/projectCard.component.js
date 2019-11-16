import { ProjectCardTemplate } from "../templates/projectCard.template.js";

const ProjectCard = {
  props: ["project"],

  template: ProjectCardTemplate,
  
  computed: {
    detailViewPath: function() {
      return `/#/project/${this.project["project_id"]}`;
    }
  }
};

export default ProjectCard;
