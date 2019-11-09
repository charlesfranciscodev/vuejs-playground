const ContactFormTemplate = `
<div class="container">
  <div v-if="errors.length" class="alert alert-danger" role="alert">
    <h4 class="alert-heading">Please correct the following error(s):</h4>
    <p v-for="error in errors">{{ error }}</p>
  </div>

  <h2 class="mb-4">{{ heading }}</h2>

  <div class="form-group row">
    <label for="firstName" class="col-sm-2 col-form-label">First Name</label>
    <div class="col-sm-10">
      <input v-model="contact.firstName" type="text" class="form-control" id="firstName" placeholder="First Name">
    </div>
  </div>

  <div class="form-group row">
    <label for="lastName" class="col-sm-2 col-form-label">Last Name</label>
    <div class="col-sm-10">
      <input v-model="contact.lastName" type="text" class="form-control" id="lastName" placeholder="Last Name">
    </div>
  </div>

  <div class="form-group row">
    <label for="email" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input v-model="contact.email" type="email" class="form-control" id="email" placeholder="Email">
    </div>
  </div>

  <div class="form-group row">
    <label for="birthdate" class="col-sm-2 col-form-label">Birthdate</label>
    <div class="col-sm-10">
      <input v-model="contact.birthdate" type="date" class="form-control" id="birthdate">
    </div>
  </div>

  <div class="form-group row">
    <label for="phoneNumber" class="col-sm-2 col-form-label">Phone Number</label>
    <div class="col-sm-10">
      <input v-model="contact.phoneNumber" type="tel" class="form-control" id="phoneNumber" placeholder="Phone Number">
    </div>
  </div>

  <div class="form-group row">
    <label for="avatarUrl" class="col-sm-2 col-form-label">Avatar URL</label>
    <div class="col-sm-10">
      <input v-model="contact.avatarUrl" type="text" class="form-control" id="avatarUrl" placeholder="Avatar URL">
    </div>
  </div>

  <div class="form-group">
    <label for="description">Description</label>
    <textarea v-model="contact.description" class="form-control" id="description" rows="5"></textarea>
  </div>

  <button v-on:click="createOrUpdateContact" class="btn btn-lg btn-primary mb-4">{{ buttonText }}</button>
</div>
`;

export default ContactFormTemplate;
