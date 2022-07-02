class EnergyExpenditure {
  constructor(EnergyExpenditureService) {
    this.EnergyExpenditureService = EnergyExpenditureService
  }

  async add(DTO) {
    try {
      const data = await this.EnergyExpenditureService.create(DTO)
      return data
    } catch (error) {
      throw error
    }
  }

  async findOne(params) {
    try {
      const data = await this.EnergyExpenditureService.findOne({ where: params })
      return data
    } catch (error) {
      throw error
    }
  }

  async findAll(params) {
    try {
      const data = await this.EnergyExpenditureService.findAll({ where: params })
      return data
    } catch (error) {
      throw error
    }
  }

  async destroy(params) {
    try {
      const data = await this.EnergyExpenditureService.destroy({ where: params })
      return data
    } catch (error) {
      throw error
    }
  }

  async update(params, data) {
    try {
      const [r] = await this.EnergyExpenditureService.update(
        { ...data },
        { where: params }
      )

      console.log(r === 0)

      if (r === 0)
        throw Error("Falha ao deletar.")

      const updatedData = await this.EnergyExpenditureService.findOne(params)

      return updatedData
    } catch (error) {
      throw error
    }
  }
}

module.exports = EnergyExpenditure