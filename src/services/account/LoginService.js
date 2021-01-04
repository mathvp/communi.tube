import { axiosInstance } from 'boot/axios'

export default {
  async login (email, password) {
    const response = await axiosInstance.post('/login', {
      email,
      password
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
