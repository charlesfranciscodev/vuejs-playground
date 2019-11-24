const ProjectCardTemplate = `
<div class="col-sm-6 col-md-4 col-lg-3">
  <div class="card bg-light text-center mb-3">
    <a :href="detailViewPath">
      <img class="card-img-top" :src="project.logo_url" :alt="project.name">
    </a>
    <div class="card-body">
      <h4 class="card-title">{{ project.name }}</h4>
    </div>
  </div>
</div>
`;

export default ProjectCardTemplate;
