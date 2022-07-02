class CompositionTableService {
  constructor(CompositionTableModel) {
    this.CompositionTable = CompositionTableModel
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
      const compositionTable = await this.CompositionTable.create(DTO)
      return compositionTable
    } catch (error) {
      throw error
    }
  }

  async findOne(params) {
    try {
      const compositionTable = await this.CompositionTable.findOne({ where: params })
      return compositionTable
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
      const data = await this.CompositionTable.findAll({ where: params, include })

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

module.exports = CompositionTableService