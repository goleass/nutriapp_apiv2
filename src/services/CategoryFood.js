class CategoryFoodService {
  constructor(CategoryFoodService) {
    this.CategoryFood = CategoryFoodService
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
      const categoryFood = await this.CategoryFood.create(DTO)
      return categoryFood
    } catch (error) {
      throw error
    }
  }

  async findOne(params) {
    try {
      const categoryFood = await this.CategoryFood.findOne({ where: params })
      return categoryFood
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

module.exports = CategoryFoodService