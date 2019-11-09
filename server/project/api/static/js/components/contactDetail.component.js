import { ContactDetailTemplate } from "../templates/contactDetail.template.js";

const ContactDetail = {
  data: function() {
    return {
      contact: {}
    }
  },

  template: ContactDetailTemplate,

  computed: {
    fullName: function() {
      return `${this.contact["first_name"]} ${this.contact["last_name"]}`;
    },
    age: function() {
      let birthdate = new Date(this.contact["birthdate"]);
      let timeDiff = Math.abs(birthdate.getTime() - birthdate.getTime());
      let ageInYears = Math.floor(timeDiff / (1000 * 3600 * 24 * 365));
      return ageInYears;
    }
  },

  created() {
    const url = `/api/contacts/${this.$route.params.id}`;
    fetch(url)
    .then(function(response) {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    }).then(response => response.json())
    .then(data => this.contact = data)
    .catch(error => console.log(error));
  }
};

export default ContactDetail;
