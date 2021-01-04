import Vue from 'vue'
import axios from 'axios'

// Vue.prototype.$axios = axios

const axiosInstance = axios.create({
  baseURL: process.env.API_URL
})

// for use inside Vue files through this.$axios
Vue.prototype.$axios = axiosInstance

// Here we define a named export
// that we can later use inside .js files:
export { axiosInstance }
