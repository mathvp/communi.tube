import { axiosInstance } from 'boot/axios'

export default {
  async register (userData) {
    const response = await axiosInstance.post('/register', {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password: userData.password,
      birth_date_day: userData.birthDay,
      birth_date_month: userData.birthMonth.value,
      birth_date_year: userData.birthYear,
      gender: userData.gender
    })
      .then((res) => {
        return { status: res.status, data: res.data }
      })
      .catch((error) => {
        const msg = (error.response.data.message !== undefined) ? [error.response.data.message] : error.response.data.error.errors.map(e => e.message)
        return { status: error.response.status, message: msg }
      })

    return response
  }
}
