const ContactCardTemplate = `
<div class="col-sm-6 col-md-4 col-lg-3">
  <div class="card bg-light text-center mb-3">
    <a :href="detailViewPath">
      <img class="card-img-top" :src="contact.avatar_url" :alt="fullName">
    </a>
    <div class="card-body">
      <h4 class="card-title">{{ fullName }}</h4>
      <a :href="editViewPath" class="btn btn-info mb-2 mx-2">
        <i class="fas fa-user-edit"></i> Edit
      </a>
      <button v-on:click="deleteContact(contact.contact_id)" class="btn btn-danger mb-2 mx-2">
        <i class="fas fa-trash"></i> Delete
      </button>
    </div>
  </div>
</div>
`;

export { ContactCardTemplate }
