import { axiosInstance } from 'boot/axios'

export default {
  async register (userData) {
    const response = await axiosInstance.post('/register', {
      userData
    })
    .then((res) => {
      return { status: res.status, data: res.data }
    })
    .catch((error) => {
      return { status: error.response.status, message: error.response.data.error }
    })

    return response
  }
}