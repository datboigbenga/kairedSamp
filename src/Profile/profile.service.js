const { SUCCESS_MESSAGE, ERROR_MESSAGE } = require("../../utils/messages")
const profileRepository = require("./profile.repository")

class ProfileService {
  async createUserProfile(payload) {
    return profileRepository.create(payload)
  }

  async getProfileByParams(queryPayload) {
    const customers = await profileRepository.fetch({ ...queryPayload })

    if (customers.length === 0) return { success: false, msg: ERROR_MESSAGE.NO_USER }

    return { success: true, msg: SUCCESS_MESSAGE.FETCH_CUSTOMER, customers }
  }
  
  async getOneProfileByUser(queryPayload) {
    const profile = await profileRepository.fetchOneProfile({ ...queryPayload })

    if (profile.length > 0) return { success: false, msg: ERROR_MESSAGE.PROFILE_EXISTS }

    return { success: true, msg: SUCCESS_MESSAGE.GENERAL, profile }
  }

  async getUserByName(query) {
    const customers = await profileRepository.fetchByParams(Object.keys(query)[0], Object.values(query)[0])

    if (customers.length === 0) return { success: false, msg: ERROR_MESSAGE.NO_USER }

    return { success: true, msg: SUCCESS_MESSAGE.FETCH_CUSTOMER, customers }
  }

  async getUserById(param) {
    const user = await profileRepository.fetchById(param.id)

    if (!user) return { success: false, msg: ERROR_MESSAGE.NO_USER }

    return { success: true, msg: SUCCESS_MESSAGE.FETCH_CUSTOMER, customer }
  }

}

module.exports = new ProfileService()
