import ContactInfoMixin from "../mixins/contactInfo.mixin.js";
import GetContactMixin from "../mixins/getContact.mixin.js";
import DeleteContactMixin from "../mixins/deleteContact.mixin.js";

import ContactDetailTemplate from "../templates/contactDetail.template.js";

const ContactDetail = {
  mixins: [ContactInfoMixin, GetContactMixin, DeleteContactMixin],

  data() {
    return {
      contact: {}
    }
  },

  template: ContactDetailTemplate,

  computed: {
    /**
     * Calculate the age in years of the contact.
     * @returns {Number} age
     */
    ageInYears() {
      /*
      // with Vanilla JS
      let birthdate = new Date(this.contact["birthdate"]);
      let currentDate = new Date();
      let timeDiff = Math.abs(currentDate.getTime() - birthdate.getTime());
      return Math.floor(timeDiff / (1000 * 3600 * 24 * 365));
      */
      
      // with Moment.js
      let now = moment();
      let birthdate = moment(this.contact["birthdate"]);
      return now.diff(birthdate, "year");
    }
  },
};

export default ContactDetail;
