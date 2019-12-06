import ContactGalleryTemplate from "../templates/contactGallery.template.js";
import ContactCard from "./contactCard.component.js";
import handleResponse from "../util/fetch.util.js";

const ContactGallery = {
  data() {
    return {
      contacts: []
    }
  },

  template: ContactGalleryTemplate,

  components: {
    "contact-card": ContactCard
  },

  methods: {
    /**
     * Delete the contact from the component state.
     * @param {Number} contactId 
     * @returns {void}
     */
    delContact(contactId) {
      this.contacts = this.contacts.filter(contact => contact.contact_id !== contactId);
    },

    /**
     * Convert contacts data to a SheetJS friendly format.
     * @returns {Array<Array<*>>}
     */
    convertContacts() {
      const KEYS = ["contact_id", "first_name", "last_name", "username", "email", "birthdate", "short_birthdate", "phone_number", "avatar_url", "is_admin"];
      let data = [KEYS];
      this.contacts.forEach(contact => {
        let row = [];
        KEYS.forEach(key => {
          row.push(contact[key]);
        });
        data.push(row);
      });
      return data;
    },

    /**
     * Download contacts data as an Excel sheet.
     */
    downloadWithSheetJS() {
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

  /**
   * Send a web API request to get information about all the contacts.
   * @returns {void}
   */
  created() {
    fetch("/api/contacts")
    .then(handleResponse)
    .then(response => response.json())
    .then(data => this.contacts = data)
    .catch(error => console.error(error));
  }
};

export default ContactGallery;
