const { Profile} = require("../../models")

class ProfileRepository {
  create = (profilePayload) => Profile.create(profilePayload)

  fetchById = (id) => Profile.findOne({ where: { id }, raw: true })

  fetchOneProfile =async (userId) => Profile.findOne({ where: { ...userId }, raw: true })

  fetch = async (params) => Profile.findAll({ where: { ...params }, raw: true })

  fetchByParams = async (property, query) => Profile.findAll({where: {[property]: { [Op.iLike] : `%${query}%` }}, raw: true })
  

}

module.exports = new ProfileRepository()