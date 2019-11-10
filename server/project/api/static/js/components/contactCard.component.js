import ContactInfoMixin from "../mixins/contactInfo.mixin.js";
import { ContactCardTemplate } from "../templates/contactCard.template.js";
import DeleteContactMixin from "../mixins/deleteContact.mixin.js";

const ConctactCard = {
  mixins: [ContactInfoMixin, DeleteContactMixin],

  props: ["contact"],

  template: ContactCardTemplate,
  
  computed: {
    detailViewPath: function() {
      return `/#/view/${this.contact["contact_id"]}`;
    }
  }
};

export default ConctactCard;
