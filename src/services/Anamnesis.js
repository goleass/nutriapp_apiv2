class Anamnesis {
  constructor(AnamnesisService) {
    this.AnamnesisService = AnamnesisService
  }

  async add(DTO) {
    try {
      const anamnesis = await this.AnamnesisService.create(DTO)
      return anamnesis
    } catch (error) {
      throw error
    }
  }

  async findOne(params) {
    try {
      const anamnesis = await this.AnamnesisService.findOne({ where: params })
      return anamnesis
    } catch (error) {
      throw error
    }
  }

  async findAll(params) {
    try {
      const anamnesis = await this.AnamnesisService.findAll({ where: params })
      return anamnesis
    } catch (error) {
      throw error
    }
  }

  async destroy(params) {
    try {
      const anamnesis = await this.AnamnesisService.destroy({ where: params })
      return anamnesis
    } catch (error) {
      throw error
    }
  }

  async update(params, data) {
    try {
      const anamnesis = await this.AnamnesisService.update(
        { ...data },
        { where: params }
      )

      const newAnamnesis = this.AnamnesisService.findOne(params)

      return newAnamnesis
    } catch (error) {
      throw error
    }
  }
}

module.exports = Anamnesis