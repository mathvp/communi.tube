import { axiosInstance } from 'boot/axios'
import { LocalStorage } from 'quasar'

export default {
  async saveChannels (channelList) {
    const token = LocalStorage.getItem('token')
    const id = LocalStorage.getItem('id')

    const response = await axiosInstance.post(`/users/${id}/channels`,
      {
        channelList
      }, {
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
