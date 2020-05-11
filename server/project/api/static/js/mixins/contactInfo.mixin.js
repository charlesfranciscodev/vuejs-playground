const ContactInfoMixin = {
  computed: {
    fullName() {
      return `${this.contact.first_name} ${this.contact.last_name}`;
    },
    editViewPath() {
      return `/#/edit/${this.contact.contact_id}`;
    }
  }
};

export default ContactInfoMixin;
