import { ContactGalleryTemplate } from "../templates/contactGallery.template.js";
import ContactCard from "./contactCard.component.js";

const ContactGallery = {
  data: function() {
    return {
      contacts: []
    }
  },

  template: ContactGalleryTemplate,

  components: {
    "contact-card": ContactCard
  },

  methods: {
    delContact: function(contactId) {
      this.contacts = this.contacts.filter(contact => contact.contact_id !== contactId);
    }
  },

  created() {
    const url = "/api/contacts";
    fetch(url)
    .then(function(response) {
      if (response.ok) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    }).then(response => response.json())
    .then(data => this.contacts = data)
    .catch(error => console.log(error));
  }
};

export default ContactGallery;
