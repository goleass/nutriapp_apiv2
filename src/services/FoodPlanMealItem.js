class FoodPlanMealItem {
  constructor(FoodPlanMealItemService) {
    this.FoodPlanMealItemService = FoodPlanMealItemService
  }

  async add(DTO) {
    try {
      const FoodPlanMealItem = await this.FoodPlanMealItemService.create(DTO)
      return FoodPlanMealItem
    } catch (error) {
      throw error
    }
  }

  async findOne(params) {
    try {
      const FoodPlanMealItem = await this.FoodPlanMealItemService.findOne({ where: params })
      return FoodPlanMealItem
    } catch (error) {
      throw error
    }
  }

  async findAll(params) {
    try {
      const FoodPlanMealItem = await this.FoodPlanMealItemService.findAll({ where: params })
      return FoodPlanMealItem
    } catch (error) {
      throw error
    }
  }

  async destroy(params) {
    try {
      const FoodPlanMealItem = await this.FoodPlanMealItemService.destroy({ where: params })
      return FoodPlanMealItem
    } catch (error) {
      throw error
    }
  }

  async update(params, data) {
    try {
      const FoodPlanMealItem = await this.FoodPlanMealItemService.update(
        { ...data },
        { where: params }
        )
        
      const newFoodPlanMealItem = await this.FoodPlanMealItemService.findOne(params)
      console.log(newFoodPlanMealItem.id, params)

      return newFoodPlanMealItem
    } catch (error) {
      throw error
    }
  }

  async bulkCreate(data) {
    try {
      const FoodPlanMealItem = await this.FoodPlanMealItemService.bulkCreate(data)

      return FoodPlanMealItem
    } catch (error) {
      throw error
    }
  }
}

module.exports = FoodPlanMealItem