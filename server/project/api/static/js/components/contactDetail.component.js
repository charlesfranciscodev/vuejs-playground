import ContactInfoMixin from "../mixins/contactInfo.mixin.js";
import GetContactMixin from "../mixins/getContact.mixin.js";
import DeleteContactMixin from "../mixins/deleteContact.mixin.js";

import { ContactDetailTemplate } from "../templates/contactDetail.template.js";

const ContactDetail = {
  mixins: [ContactInfoMixin, GetContactMixin, DeleteContactMixin],

  data: function() {
    return {
      contact: {}
    }
  },

  template: ContactDetailTemplate,

  computed: {
    ageInYears: function() {
      // with Vanilla JS
      let birthdate = new Date(this.contact["birthdate"]);
      let currentDate = new Date();
      let timeDiff = Math.abs(currentDate.getTime() - birthdate.getTime());
      return Math.floor(timeDiff / (1000 * 3600 * 24 * 365));
    }
  },
};

export default ContactDetail;
