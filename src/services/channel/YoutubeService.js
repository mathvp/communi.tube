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
      const msg = (error.response.data.message !== undefined) ? [error.response.data.message] : error.response.data.error.errors.map(e => e.message)
      return { status: error.response.status, message: msg }
    })

    return response
  }
}
