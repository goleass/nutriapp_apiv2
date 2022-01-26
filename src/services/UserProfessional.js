class UserProfessional {
  constructor(UserProfessionalService) {
    this.UserProfessionalService = UserProfessionalService
  }

  async add(DTO) {
    try {
      const user = await this.UserProfessionalService.create(DTO)
      return user
    } catch (error) {
      throw error
    }
  }

  async findOne(params) {
    try {
      const user = await this.UserProfessionalService.findOne({ where: params })
      return user
    } catch (error) {
      throw error
    }
  }

  async destroy(params) {
    try {
      const user = await this.UserProfessionalService.destroy({ where: params })
      return user
    } catch (error) {
      throw error
    }
  }

  async update(params, data) {
    try {
      const user = await this.UserProfessionalService.update(
        { ...data },
        { where: params }
      )

      const newUser = this.UserProfessionalService.findOne(params)

      return newUser
    } catch (error) {
      throw error
    }
  }
}

module.exports = UserProfessional