import Vue from "../vue.esm.browser.js";

import ContactFormMixin from "../mixins/contactForm.mixin.js"

const CreateContact = Vue.extend({
  mixins: [ContactFormMixin]
});

export default CreateContact;
