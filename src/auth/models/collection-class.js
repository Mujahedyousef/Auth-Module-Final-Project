"use strict"
class Collection {
    constructor(model) {
        this.model = model
    }

    async createRecord(obj) {
        try {
            return await this.model.create(obj)
        } catch (error) {
            console.error('error in creating a new record for model: ', this.model.name);
        }
    }

    async readRecord(id) {
        try {
            if (id) {
                return await this.model.findOne({ where: { id: id } })
            } else {
                return await this.model.findAll()
            }

        } catch (error) {
            console.error('error in readRecord  for model: ', this.model.name);
        }

    }

    async updateRecord(obj, id) {
        try {
            return await this.model.update(obj, { where: { id: id }, returning: true })
        } catch (error) {
            console.error('error in updateRecord  for model: ', this.model.name);
        }
    }

    async deletRecord(id) {
        try {
            if (id) {
                return await this.model.destroy({ where: { id: id } })
            }

        } catch (error) {
            console.error('error in deleteRecord  for model: ', this.model.name);
        }
    }


}

module.exports = Collection;















