class UserPatient {
  constructor(UserPatientService) {
    this.UserPatientService = UserPatientService
  }

  async add(DTO) {
    try {
      const user = await this.UserPatientService.create(DTO)
      return user
    } catch (error) {
      throw error
    }
  }

  async findOne(params, include = null) {
    try {
      const user = await this.UserPatientService.findOne({ where: params, include })
      return user
    } catch (error) {
      throw error
    }
  }

  async findAll(params, include = null) {
    try {
      const users = await this.UserPatientService.findAll({ where: params, include, order: [['name', 'ASC']] })
      return users
    } catch (error) {
      throw error
    }
  }

  async destroy(params) {
    try {
      const user = await this.UserPatientService.destroy({ where: params })
      return user
    } catch (error) {
      throw error
    }
  }

  async update(params, data) {
    try {
      const user = await this.UserPatientService.update(
        { ...data },
        { where: params }
      )

      const newUser = this.UserPatientService.findOne(params)

      return newUser
    } catch (error) {
      throw error
    }
  }
}

module.exports = UserPatient