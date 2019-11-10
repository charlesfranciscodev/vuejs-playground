import ContactInfoMixin from "../mixins/contactInfo.mixin.js";
import { ContactCardTemplate } from "../templates/contactCard.template.js";

const ConctactCard = {
  mixins: [ContactInfoMixin],

  props: ["contact"],

  template: ContactCardTemplate,
  
  computed: {
    detailViewPath: function() {
      return `/#/view/${this.contact["contact_id"]}`;
    }
  }
};

export default ConctactCard;
