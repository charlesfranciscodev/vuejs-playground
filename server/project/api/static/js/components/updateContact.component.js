import Vue from "../vue.esm.browser.js";

import ContactFormMixin from "../mixins/contactForm.mixin.js";
import FetchContactMixin from "../mixins/fetchContact.mixin.js";

// define a component that uses this mixin
const UpdateContact = Vue.extend({
  mixins: [ContactFormMixin, FetchContactMixin]
});

export default UpdateContact;
