const { User, Token } = require("../../models")

class UserRepository {
  create = (userPayload) => User.create(userPayload)

  fetchById = (id) => User.findOne({ where: { id }, raw: true })

  fetch = async (params) => User.findAll({ where: { ...params }, raw: true })
  
  fetchOne = async (params) => User.findOne({ where: { ...params }, raw: true })

  fetchByParams = async (property, query) => User.findAll({where: {[property]: { [Op.iLike] : `%${query}%` }}, raw: true })

  createToken = (userPayload) => Token.create(userPayload)

  fetchTokenById = (id) => Token.findOne({ where: { id }, raw: true })

  fetchOneToken = async (params) => Token.findOne({ where: { ...params }, raw: true })

  fetchTokenByParams = async (params) => Token.findAll({ where: { ...params }, raw: true })

  update = async(params1, params2) => User.update({...params1}, {where:{...params2}})

  destroyToken = async(params)=> Token.destroy({where:{...params}})
}

module.exports = new UserRepository()