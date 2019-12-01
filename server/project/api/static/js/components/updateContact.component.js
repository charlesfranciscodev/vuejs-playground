import Vue from "../vue.esm.browser.min.js";

import ContactFormMixin from "../mixins/contactForm.mixin.js";
import GetContactMixin from "../mixins/getContact.mixin.js";

// define a component that uses this mixin
const UpdateContact = Vue.extend({
  mixins: [ContactFormMixin, GetContactMixin]
});

export default UpdateContact;
