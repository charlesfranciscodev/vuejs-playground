const ContactGalleryTemplate = `
<div class="container">
  <div class="row">
    <div class="col d-flex align-items-center justify-content-center">
      <button v-on:click="downloadWithSheetJS" class="btn btn-warning my-3">
        <i class="fab fa-js-square"></i> Download with SheetJS
      </button>
    </div>

    <div class="col d-flex align-items-center justify-content-center">
      <a href="/download/contacts-pandas" class="btn btn-success my-3">
        <i class="fab fa-python"></i> Download with pandas
      </a>
    </div>
  </div>

  <div class="row">
    <contact-card v-for="contact in contacts" v-bind:contact="contact" v-bind:key="contact.contact_id" v-on:del-contact="delContact(contact.contact_id)">
    </contact-card>
  </div>
</div>
`;

export { ContactGalleryTemplate }
