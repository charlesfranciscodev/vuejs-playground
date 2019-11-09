import Vue from "../vue.esm.browser.js";

import ContactFormMixin from "../mixins/contactForm.mixin.js"

// define a component that uses this mixin
const CreateContact = Vue.extend({
  mixins: [ContactFormMixin]
});

export default CreateContact;
