class FoodPlan {
  constructor(FoodPlanService) {
    this.FoodPlanService = FoodPlanService
  }

  async add(DTO) {
    try {
      const FoodPlan = await this.FoodPlanService.create(DTO)
      return FoodPlan
    } catch (error) {
      throw error
    }
  }

  async findOne(params, include = null) {
    try {
      const FoodPlan = await this.FoodPlanService.findOne({ where: params, include })
      return FoodPlan
    } catch (error) {
      throw error
    }
  }

  async findAll(params, include = null) {
    try {
      const FoodPlan = await this.FoodPlanService.findAll({ where: params, include })
      return FoodPlan
    } catch (error) {
      throw error
    }
  }

  async destroy(params) {
    try {
      const FoodPlan = await this.FoodPlanService.destroy({ where: params })
      return FoodPlan
    } catch (error) {
      throw error
    }
  }

  async update(params, data) {
    try {
      const FoodPlan = await this.FoodPlanService.update(
        { ...data },
        { where: params }
        )
        
      const newFoodPlan = await this.FoodPlanService.findOne(params)
      console.log(newFoodPlan.id, params)

      return newFoodPlan
    } catch (error) {
      throw error
    }
  }
}

module.exports = FoodPlan