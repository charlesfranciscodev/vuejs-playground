const state = {
  user: {},
  errors: [],
};

const getters = {
  user: (state) => state.user,
  errors: (state) => state.errors
};

const actions = {
  login ({ commit }, formData) {

    return new Promise((resolve, reject) => {
      // validation
      commit("clearErrors");
      if (formData["username"] === "") {
        commit("addError", "Username required.");
        reject();
      } else if (formData["password"] === "") {
        commit("addError", "Password required.");
        reject();
      } else {
        // API call
        const options = {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(formData)
        }
        fetch("/login", options)
        .then(function(response) {
          if (response.ok) {
            response.json().then(function(data) {
              commit("setUser", data);
              resolve();
            });
          } else {
            response.json().then(function(data) {
              commit("addError", data.message);
              reject();
            });
          }
        });
      }
    });
  }
};

const mutations = {
  setUser: (state, user) => (state.user = user),
  clearErrors: (state) => (state.errors = []),
  addError: (state, error) => (state.errors.push(error)),
};

export default {
  state,
  getters,
  actions,
  mutations
};