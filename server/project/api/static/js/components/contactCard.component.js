import { ContactCardTemplate } from "../templates/contactCard.template.js";

const ConctactCard = {
  props: ["contact"],

  template: ContactCardTemplate,

  computed: {
    fullName: function() {
      return `${this.contact["first_name"]} ${this.contact["last_name"]}`;
    },
    detailViewPath: function() {
      return `/#/view/${this.contact["contact_id"]}`;
    }
  }
};

export default ConctactCard;
