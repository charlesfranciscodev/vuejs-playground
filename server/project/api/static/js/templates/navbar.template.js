const NavbarTemplate = `
<nav class="navbar navbar-expand-sm navbar-light bg-light">
  <a class="navbar-brand" href="/#/">Contact List</a>
  <button v-on:click="toggleMenu" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarLinks" aria-controls="navbarLinks">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div v-bind:class="classObject" class="navbar-collapse" id="navbarLinks">
    <ul class="navbar-nav mr-auto">
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
  </div>
</nav>
`;

export default NavbarTemplate;
