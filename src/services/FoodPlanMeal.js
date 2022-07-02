class FoodPlanMeal {
  constructor(FoodPlanMealService) {
    this.FoodPlanMealService = FoodPlanMealService
  }

  async add(DTO) {
    try {
      const FoodPlanMeal = await this.FoodPlanMealService.create(DTO)
      return FoodPlanMeal
    } catch (error) {
      throw error
    }
  }

  async findOne(params, include = null) {
    try {
      const FoodPlanMeal = await this.FoodPlanMealService.findOne({ where: params, include })
      return FoodPlanMeal
    } catch (error) {
      throw error
    }
  }

  async findAll(params, include = null) {
    try {
      const FoodPlanMeal = await this.FoodPlanMealService.findAll({ where: params, include })
      return FoodPlanMeal
    } catch (error) {
      throw error
    }
  }

  async destroy(params) {
    try {
      const FoodPlanMeal = await this.FoodPlanMealService.destroy({ where: params })
      return FoodPlanMeal
    } catch (error) {
      throw error
    }
  }

  async update(params, data) {
    try {
      const FoodPlanMeal = await this.FoodPlanMealService.update(
        { ...data },
        { where: params }
        )
        
      const newFoodPlanMeal = await this.FoodPlanMealService.findOne(params)
      console.log(newFoodPlanMeal.id, params)

      return newFoodPlanMeal
    } catch (error) {
      throw error
    }
  }
}

module.exports = FoodPlanMeal