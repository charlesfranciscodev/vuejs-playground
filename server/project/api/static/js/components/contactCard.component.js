import { ContactCardTemplate } from "../templates/contactCard.template.js";

const ConctactCard = {
  props: ["contact"],

  template: ContactCardTemplate,

  computed: {
    fullName: function() {
      return `${this.contact.first_name} ${this.contact.last_name}`;
    }
  }
};

export default ConctactCard;
