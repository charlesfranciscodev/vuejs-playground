const NavbarTemplate = `
<nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center">
  <a class="navbar-brand mr-0" href="/#/">Contact List</a>

  <button v-on:click="toggleMenu" class="navbar-toggler ml-1" type="button" data-toggle="collapse" data-target="#navbarLinks" aria-controls="navbarLinks">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div v-bind:class="classProperty" class="navbar-collapse" id="navbarLinks" justify-content-between align-items-center w-100>
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

      <li class="nav-item">
        <a class="nav-link" href="/#/about">
          <i class="fab fa-bootstrap"></i> About
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link" href="https://github.com/charlesfranciscodev/contact-list" target="_blank">
          <i class="fab fa-github"></i> GitHub
        </a>
      </li>
    </ul>


    <ul class="navbar-nav text-center">
      <li class="nav-item">
        <a class="nav-link" href="/#/login">
          <i class="fas fa-sign-in-alt"></i> Login
        </a>
      </li>
    </ul>
  </div>
</nav>
`;

export default NavbarTemplate;
