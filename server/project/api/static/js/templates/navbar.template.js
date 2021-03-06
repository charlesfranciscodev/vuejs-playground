const NavbarTemplate = `
<nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
  <a class="navbar-brand mr-0" href="/#/">Playground</a>

  <button v-on:click="toggleMenu" class="navbar-toggler ml-1" type="button" data-toggle="collapse" data-target="#navbarLinks" aria-controls="navbarLinks">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div v-bind:class="classProperty" class="navbar-collapse justify-content-between align-items-center w-100" id="navbarLinks">
    <ul class="navbar-nav mx-auto text-center">
      <li class="nav-item">
        <a class="nav-link" href="/#/">
          <i class="fas fa-home"></i> Home
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="/#/create">
          <i class="fas fa-user-plus"></i> Create
        </a>
      </li>

      <li v-if="loggedIn" class="nav-item">
        <a class="nav-link" href="/#/projects">
          <i class="fas fa-gamepad"></i> Projects
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="/#/about">
          <i class="fab fa-bootstrap"></i> About
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="https://github.com/charlesfranciscodev/vuejs-playground" target="_blank">
          <i class="fab fa-github"></i> GitHub
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="/example">
          <i class="fas fa-globe"></i> Example
        </a>
      </li>
    </ul>

    <div v-if="loggedIn" class="navbar-text d-block text-center">
      Hello {{ user.username }}
    </div>

    <ul class="navbar-nav text-center">
      <li v-if="!loggedIn" class="nav-item">
        <a class="nav-link" href="/#/login">
          <i class="fas fa-sign-in-alt"></i> Login
        </a>
      </li>

      <li v-if="loggedIn" class="nav-item">
        <a v-on:click="logoutButtonClick" class="nav-link" id="logout">
          <i class="fas fa-sign-out-alt"></i> Logout
        </a>
      </li>
    </ul>
  </div>
</nav>
`;

export default NavbarTemplate;
