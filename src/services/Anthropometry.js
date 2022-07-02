class Anthropometry {
  constructor(AnthropometryService) {
    this.AnthropometryService = AnthropometryService
  }

  async add(DTO) {
    try {
      const data = await this.AnthropometryService.create(DTO)
      return data
    } catch (error) {
      throw error
    }
  }

  async findOne(params) {
    try {
      const data = await this.AnthropometryService.findOne({ where: params })
      return data
    } catch (error) {
      throw error
    }
  }

  async findAll(params) {
    try {
      const data = await this.AnthropometryService.findAll({ where: params })
      return data
    } catch (error) {
      throw error
    }
  }

  async destroy(params) {
    try {
      const data = await this.AnthropometryService.destroy({ where: params })
      return data
    } catch (error) {
      throw error
    }
  }

  async update(params, data) {
    try {
      const [r] = await this.AnthropometryService.update(
        { ...data },
        { where: params }
      )

      if (r === 0)
        throw Error("Falha ao deletar.")

      const updatedData = await this.AnthropometryService.findOne(params)

      return updatedData
    } catch (error) {
      throw error
    }
  }
}

module.exports = Anthropometry