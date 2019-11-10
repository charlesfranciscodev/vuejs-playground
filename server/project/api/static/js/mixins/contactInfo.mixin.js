const ContactInfoMixin = {
  computed: {
    fullName: function() {
      return `${this.contact["first_name"]} ${this.contact["last_name"]}`;
    },
    editViewPath: function() {
      return `/#/edit/${this.contact["contact_id"]}`;
    }
  }
};

export default ContactInfoMixin;
