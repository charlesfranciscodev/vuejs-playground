const ProjectGalleryTemplate = `
<div class="container">
  <h2 class="mb-4 text-center">My Projects</h2>

  <div class="row">
    <project-card v-for="project in projects" v-bind:project="project" v-bind:key="project.project_id">
    </project-card>
  </div>
</div>
`;

export { ProjectGalleryTemplate }
