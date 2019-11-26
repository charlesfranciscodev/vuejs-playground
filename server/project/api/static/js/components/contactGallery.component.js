import ContactGalleryTemplate from "../templates/contactGallery.template.js";
import ContactCard from "./contactCard.component.js";
import handleResponse from "../util/fetch.util.js";

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
    },

    convertContacts: function() {
      let data = [["contact_id", "first_name", "last_name", "username", "email", "birthdate", "phone_number", "avatar_url"]];
      this.contacts.forEach(contact => {
        let row = [
          contact["contact_id"],
          contact["first_name"],
          contact["last_name"],
          contact["username"],
          contact["email"],
          contact["birthdate"],
          contact["phone_number"],
          contact["avatar_url"]
        ];
        data.push(row);
      });
      return data;
    },

    downloadWithSheetJS: function() {
      let fileName = "contacts-sheet-js.xlsx";
      let data = this.convertContacts();
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.aoa_to_sheet(data);
      // add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      // write workbook
      XLSX.writeFile(wb, fileName);
    }
  },

  created() {
    const url = "/api/contacts";
    fetch(url)
    .then(handleResponse)
    .then(response => response.json())
    .then(data => this.contacts = data)
    .catch(error => console.log(error));
  }
};

export default ContactGallery;
