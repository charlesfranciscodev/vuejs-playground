const NavbarTemplate = `
<nav class="navbar navbar-expand-sm navbar-light bg-light">
  <a class="navbar-brand" href="/#/">Contact List</a>
  <button v-on:click="toggleMenu" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarLinks" aria-controls="navbarLinks">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div v-bind:class="classObject" class="navbar-collapse" id="navbarLinks">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="/#/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/#/about">About</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="https://github.com/charlesfranciscodev/contact-list" target="_blank">GitHub</a>
      </li>
    </ul>
  </div>
</nav>
`;

export default NavbarTemplate;
