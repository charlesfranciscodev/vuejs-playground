const ContactDetailTemplate = `
<div class="container">
  <div class="row mb-4">
    <div class="col-sm-12 col-lg-6 d-flex align-items-center justify-content-center">
      <div>
        <h2>{{ fullName }}</h2>
        <p class="font-weight-bold">{{ age }} years old</p>
        <p class="font-italic">
          <i class="fas fa-envelope"></i> 
          {{ contact.email }}
        </p>
        <p class="font-italic">
          <i class="fas fa-phone"></i> 
          {{ contact.phone_number }}
        </p>
      </div>
    </div>

    <div class="col-sm-12 col-lg-6 d-flex align-items-center justify-content-center">
      <img :src="contact.avatar_url" class="img-thumbnail" :alt="fullName">
    </div>
  </div>

  <div class="row mx-2">
    <h3>Description</h3>
    <p>{{ contact.description }}</p>
  </div>
</div>
`;

export { ContactDetailTemplate }
