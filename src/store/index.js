import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user:null,
  },
  mutations: {
    SET_USER_DATA(state,userData){
      state.user = userData;
      localStorage.setItem("user" , JSON.stringify(userData));
      axios.defaults.headers.common["Authorization"] = "Bearer ${userData.token}";
      userData.token;
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem("user");
      location.reload();
    },
    SET_PROFILE(state){
      state.user = JSON.parse(localStorage.getItem("user"));
    },
  },
  actions: { 
    login({ commit }, credentials) {
      return axios.post("http://127.0.0.1:8000/api/login", credentials).then(({ data }) => {
        commit("SET_USER_DATA", data);
      });
    },
    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    },
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
    getusers(state){
      return state.user;
    },
  }
})
