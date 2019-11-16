const ProjectDetailTemplate = `
<div v-if="!emptyProject" class="container">
  <div class="row mb-4">
    <div class="col-sm-12 col-lg-3 text-center">
      <div>
        <h2>{{ project.name }}</h2>
        <p class="font-weight-bold">
          Release Date: {{ project.release_date }}
        </p>

        <a :href="project.website_url" target="_blank">{{ project.website_url }}</a>
      </div>
    </div>

    <div class="col-sm-12 col-lg-5 text-center">
      <div>
        <h3>Platforms</h3>

        <button v-for="platform in project.platforms" class="btn btn-outline-info mx-2 my-2">
          <i :class="platform.icon_class"></i> {{ platform.name }}
        </button>
      </div>
    </div>

    <div class="col-sm-12 col-lg-4 d-flex align-items-center justify-content-center">
      <img :src="project.logo_url" class="img-thumbnail avatar" :alt="project.name">
    </div>
  </div>

  <div class="row mx-2">
    <div>
      <h3>Description</h3>
      <p>{{ project.description }}</p>
    </div>
  </div>
</div>
`;

export { ProjectDetailTemplate }
