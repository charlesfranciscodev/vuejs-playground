import ContactInfoMixin from "../mixins/contactInfo.mixin.js";
import ContactCardTemplate from "../templates/contactCard.template.js";
import DeleteContactMixin from "../mixins/deleteContact.mixin.js";

const ContactCard = {
  mixins: [ContactInfoMixin, DeleteContactMixin],

  props: ["contact"],

  template: ContactCardTemplate,
  
  computed: {
    detailViewPath() {
      return `/#/view/${this.contact["contact_id"]}`;
    }
  }
};

export default ContactCard;
