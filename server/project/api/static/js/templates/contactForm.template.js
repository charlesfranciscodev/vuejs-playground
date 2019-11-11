const ContactFormTemplate = `
<div class="container">
  <div v-if="errors.length" class="alert alert-danger" role="alert">
    <h4 class="alert-heading">Please correct the following error(s):</h4>
    <p v-for="error in errors">{{ error }}</p>
  </div>

  <h2 class="mb-4">{{ heading }}</h2>

  <div class="form-group row">
    <label for="first_name" class="col-sm-2 col-form-label">{{ labels["first_name"] }}</label>
    <div class="col-sm-10">
      <input v-model="contact.first_name" type="text" class="form-control" id="first_name" :placeholder="labels['first_name']">
    </div>
  </div>

  <div class="form-group row">
    <label for="last_name" class="col-sm-2 col-form-label">{{ labels["last_name"] }}</label>
    <div class="col-sm-10">
      <input v-model="contact.last_name" type="text" class="form-control" id="last_name" :placeholder="labels['last_name']">
    </div>
  </div>

  <div class="form-group row">
    <label for="username" class="col-sm-2 col-form-label">{{ labels["username"] }}</label>
    <div class="col-sm-10">
      <input v-model="contact.username" type="text" class="form-control" id="username" :placeholder="labels['username']">
    </div>
  </div>

  <div class="form-group row">
    <label for="password" class="col-sm-2 col-form-label">{{ labels["password"] }}</label>
    <div class="col-sm-10">
      <input v-model="contact.password" type="password" class="form-control" id="password" :placeholder="labels['password']">
    </div>
  </div>

  <div class="form-group row">
    <label for="email" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input v-model="contact.email" type="email" class="form-control" id="email" placeholder="Email">
    </div>
  </div>

  <div class="form-group row">
    <label for="birthdate" class="col-sm-2 col-form-label">{{ labels["birthdate"] }}</label>
    <div class="col-sm-10">
      <input v-model="contact.birthdate" type="date" class="form-control" id="birthdate">
    </div>
  </div>

  <div class="form-group row">
    <label for="phone_number" class="col-sm-2 col-form-label">{{ labels["phone_number"] }}</label>
    <div class="col-sm-10">
      <input v-model="contact.phone_number" type="tel" class="form-control" id="phone_number" :placeholder="labels['phone_number']">
    </div>
  </div>

  <div class="form-group row">
    <label for="avatar_url" class="col-sm-2 col-form-label">{{ labels["avatar_url"] }}</label>
    <div class="col-sm-10">
      <input v-model="contact.avatar_url" type="text" class="form-control" id="avatar_url" :placeholder="labels['avatar_url']">
    </div>
  </div>

  <div class="form-group">
    <label for="description">{{ labels["description"] }}</label>
    <textarea v-model="contact.description" class="form-control" id="description" rows="5"></textarea>
  </div>

  <div class="form-group">
    <label for="projects">Projects</label>
    <select multiple="multiple" v-model="contact.projects" class="form-control" id="projects">
      <option v-for="project in projects" v-bind:value="project">
        {{ project.name }}
      </option>
    </select>
  </div>

  <button v-on:click="createOrUpdateContact" class="btn btn-lg btn-primary mb-4">{{ buttonText }}</button>
</div>
`;

export default ContactFormTemplate;
