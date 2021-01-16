import { axiosInstance } from 'boot/axios'
import { LocalStorage } from 'quasar'

export default {
  async login (email, password) {
    const response = await axiosInstance.post('/login', {
      email,
      password
    })
      .then((res) => {
        try {
          LocalStorage.set('token', res.data.accessToken)
          LocalStorage.set('id', res.data.id)
        } catch (error) {
          return error
        }
        return { status: res.status, data: res.data }
      })
      .catch((error) => {
        return { status: error.response.status, message: error.response.data.error }
      })

    return response
  }
}
