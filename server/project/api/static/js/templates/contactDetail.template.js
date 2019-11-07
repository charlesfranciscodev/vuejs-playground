const ContactDetailTemplate = `
<div class="container">
  <div class="row">
    <div class="col-8">
      <div class="text-center">
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
        <h3>Description</h3>
        <p>{{ contact.description }}</p>
    </div>
    <div class="col-4">
      <img :src="contact.avatar_url" class="img-thumbnail" :alt="fullName">
    </div>
  </div>
</div>
`;

export { ContactDetailTemplate }
