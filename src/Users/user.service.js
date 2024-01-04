const { SUCCESS_MESSAGE, ERROR_MESSAGE } = require("../../utils/messages")
const userRepository = require("./user.repository")

class UserService {
  async createUser(payload) {
    return userRepository.create(payload)
  }

  async getUserByParams(queryPayload) {
    const user = await userRepository.fetch({ ...queryPayload })


    if (user.length === 0) return { success: false, msg: ERROR_MESSAGE.NO_USER }
    console.log(user)
    return { success: true, msg: SUCCESS_MESSAGE.FETCH_USER, user }
  }
  
  async getSingleUserByParams(queryPayload) {
    const user = await userRepository.fetchOne({ ...queryPayload })

    if (!user) return { success: false, msg: ERROR_MESSAGE.NO_USER }
    console.log(user)
    return { success: true, msg: SUCCESS_MESSAGE.FETCH_USER, user }
  }
  
  async getUserByName(query) {
    const customers = await userRepository.fetchByParams(Object.keys(query)[0], Object.values(query)[0])

    if (customers.length === 0) return { success: false, msg: ERROR_MESSAGE.NO_USER }

    return { success: true, msg: SUCCESS_MESSAGE.FETCH_USER, customers }
  }

  async getUserById(param) {
    const user = await userRepository.fetchById(param.id)

    if (!user) return { success: false, msg: ERROR_MESSAGE.NO_USER }

    return { success: true, msg: SUCCESS_MESSAGE.FETCH_CUSTOMER, user }
  }

  async updateDetails(params1, params2){
    const user = await userRepository.update({...params1}, {...params2})

    if(!user) return { success: false, msg: ERROR_MESSAGE.NO_USER }

    return { success: true, msg: SUCCESS_MESSAGE.GENERAL, user }
  }

  async createTokenUser(payload){
    return userRepository.createToken(payload)
  }


  async getUserTokenById(param) {
    const token = await userRepository.fetchTokenById(param.id)

    if (!token) return { success: false, msg: ERROR_MESSAGE.NO_USER }

    return { success: true, msg: SUCCESS_MESSAGE.FETCH_USER, token }
  }

  async getSingleToken(queryPayload) {
    const token = await userRepository.fetchOneToken({ ...queryPayload })


    if (token.length === 0) return { success: false, msg: ERROR_MESSAGE.NO_USER}

    return { success: true, msg: SUCCESS_MESSAGE.FETCH_USER, token }
  }

  async destroySingleToken(queryPayload) {
    const token = await userRepository.destroyToken({ ...queryPayload })


    if (!token) return { success: false, msg: ERROR_MESSAGE.NO_USER}

    return { success: true, msg: SUCCESS_MESSAGE.FETCH_USER, token }
  }
  
}

module.exports = new UserService()
