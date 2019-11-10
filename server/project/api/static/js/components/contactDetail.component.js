import ContactInfoMixin from "../mixins/contactInfo.mixin.js";
import FetchContactMixin from "../mixins/fetchContact.mixin.js";
import { ContactDetailTemplate } from "../templates/contactDetail.template.js";

const ContactDetail = {
  mixins: [ContactInfoMixin, FetchContactMixin],

  data: function() {
    return {
      contact: {}
    }
  },

  template: ContactDetailTemplate,

  computed: {
    age: function() {
      let birthdate = new Date(this.contact["birthdate"]);
      let localDate = new Date();
      let utcTimestamp = Date.UTC(localDate.getUTCFullYear(), localDate.getUTCMonth(), localDate.getUTCDate());	
      let utcDate = new Date(utcTimestamp);	
      let timeDiff = Math.abs(utcDate.getTime() - birthdate.getTime());
      let ageInYears = Math.floor(timeDiff / (1000 * 3600 * 24 * 365));
      return ageInYears;
    }
  },
};

export default ContactDetail;
