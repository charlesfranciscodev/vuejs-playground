const ContactGalleryTemplate = `
<div class="container">
  <div class="row">
    <contact-card v-for="contact in contacts" v-bind:contact="contact" v-bind:key="contact.contact_id" v-on:del-contact="delContact(contact.contact_id)">
    </contact-card>
  </div>
</div>
`;

export { ContactGalleryTemplate }
