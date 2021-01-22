import { axiosInstance } from 'boot/axios'
import { LocalStorage } from 'quasar'

export default {
  async getUser () {
    const token = LocalStorage.getItem('token')
    const response = await axiosInstance.get('/user',
      {
        headers: {
          'x-access-token': token
        }
      }).then((res) => {
      return { status: res.status, data: res.data }
    }).catch((error) => {
      return { status: error.response.status, message: error.response.data.error }
    })

    return response
  }
}
