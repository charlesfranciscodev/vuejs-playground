import { ContactGalleryTemplate } from "../templates/contactGallery.template.js";
import ContactCard from "./contactCard.component.js";

const ConctactGallery = {
  data: function() {
    return {
      contacts: []
    }
  },

  template: ContactGalleryTemplate,

  components: {
    "contact-card": ContactCard
  },

  created() {
    const url = "/api/contacts";
    fetch(url)
    .then(function(response) {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    }).then(response =>response.json())
    .then(data => this.contacts = data)
    .catch(error => console.log(error));
  }
};

export default ConctactGallery;
