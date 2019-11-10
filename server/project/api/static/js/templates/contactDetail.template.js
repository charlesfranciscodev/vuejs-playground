const ContactDetailTemplate = `
<div class="container">
  <div class="row mb-4">
    <div class="col-sm-12 col-lg-6 text-center">
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

        <div>
          <a :href="editViewPath" class="btn btn-outline-info mb-3">
            <i class="fas fa-user-edit"></i> Edit
          </a>
        </div>

        <div>
          <button v-on:click="deleteContact(contact.contact_id)" class="btn btn-outline-danger mb-3">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>

    <div class="col-sm-12 col-lg-6 d-flex align-items-center justify-content-center">
      <img :src="contact.avatar_url" class="img-thumbnail avatar" :alt="fullName">
    </div>
  </div>

  <div class="row mx-2">
    <div>
      <h3>Description</h3>
      <p>{{ contact.description }}</p>
    </div>
  </div>
</div>
`;

export { ContactDetailTemplate }
