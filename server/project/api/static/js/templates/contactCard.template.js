const ContactCardTemplate = `
<div class="col-sm-6 col-md-4 col-lg-3">
  <div class="card bg-light mb-3">
    <a :href="detailViewPath">
      <img class="card-img-top" :src="contact.avatar_url" :alt="fullName">
    </a>
    <div class="card-body">
      <h4 class="card-title">{{ fullName }}</h4>
    </div>
  </div>
</div>
`;

export { ContactCardTemplate }