const LoginFormTemplate = `
<div class="container">
  <div v-if="errors.length" class="alert alert-danger" role="alert">
    <h4 class="alert-heading">Please correct the following error(s):</h4>
    <p v-for="error in errors">{{ error }}</p>
  </div>

  <h2 class="mb-4 text-center">Please enter your credentials</h2>

  <div class="form-group row">
    <div class="input-group col-sm-4 offset-sm-4">
      <input v-model="formData.username" type="text" class="form-control" id="username" placeholder="Username">

      <div class="input-group-append">
        <span class="input-group-text">
          <i class="fas fa-user"></i>
        </span>
      </div>
    </div>
  </div>

  <div class="form-group row">
    <div class="input-group col-sm-4 offset-sm-4">
      <input v-model="formData.password" type="password" class="form-control" id="password" placeholder="Password">

      <div class="input-group-append">
        <span class="input-group-text">
          <i class="fas fa-key fa-sm"></i>
        </span>
      </div>
    </div>
  </div>

  <div class="form-group row">
    <div class="input-group col-sm-4 offset-sm-4">
      <button v-on:click="loginButtonClick" class="btn btn-lg btn-block btn-primary mb-4">
      <i class="fas fa-sign-in-alt"></i> Login
      </button>
    </div>
  </div>
</div>
`;

export default LoginFormTemplate;
