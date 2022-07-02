const Sequelize = require('sequelize')

const Op = Sequelize.Op

class Food {
  constructor(FoodServiceFoodModel) {
    this.Food = FoodServiceFoodModel
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
      const food = await this.Food.create(DTO)
      return food
    } catch (error) {
      throw error
    }
  }

  async findOne(params) {
    try {
      const food = await this.Food.findOne({ where: params })
      return food
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
      const data = await this.Food.findAll({ where: params, include })

      return data
    } catch (error) {
      throw error
    }
  }

  async search(params, include = null) {
    try {
      const data = await this.Food.findAll({ where: {
        description: {
          [Op.iLike]: `%${params.description}%`
        }
      }, include })

      return data
    } catch (error) {
      console.log(error)
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

module.exports = Food