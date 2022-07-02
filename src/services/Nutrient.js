class Nutrient {
  constructor(NutrientService) {
    this.NutrientService = NutrientService
  }

  async get() {
    try {
      const data = await this.CompositionTable.findAll()
      return data
    } catch (error) {
      throw error
    }
  }

  async add(DTO) {
    try {
      const nutrient = await this.NutrientService.create(DTO)
      return nutrient
    } catch (error) {
      throw error
    }
  }

  async findOne(params) {
    try {
      const nutrient = await this.NutrientService.findOne({ where: params })
      return nutrient
    } catch (error) {
      throw error
    }
  }

  async destroy(params) {
    try {
      const skill = await this.Skill.destroy({ where: params })
      return skill
    } catch (error) {
      throw error
    }
  }

  async findAll(params, include = null) {
    try {
      const data = await this.CategoryFood.findAll({ where: params, include })

      return data
    } catch (error) {
      throw error
    }
  }

  async update(params, data) {
    try {
      const skill = await this.Skill.update(
        { ...data },
        { where: params }
      )

      console.error(skill)

      const newSkill = this.findOne(params)

      return newSkill
    } catch (error) {
      throw error
    }
  }
}

module.exports = Nutrient