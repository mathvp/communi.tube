import { axiosInstance } from 'boot/axios'
import { LocalStorage } from 'quasar'

export default {
  async getChannels (searchTerm) {
    const token = LocalStorage.getItem('token')

    const config = {
      headers: { 'x-access-token': token },
      params: {
        search_term: searchTerm
      }
    }

    const response = await axiosInstance.get('/channels-search', config).then((res) => {
      console.log(res)
      return { status: res.status, data: res.data }
    }).catch((error) => {
      console.log(error)
      return { status: error.response.status, message: error.response.data.error }
    })

    return response
  }
}
