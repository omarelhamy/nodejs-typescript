import Area, { IArea } from './area.schema';

export default class AreaServices {
    async create(area: IArea, callback) {
        return await Area.create(area, callback);
    }

    async getAll(query, callback) {
        return await Area.find(query, callback);
    }

    async getOne(id) {
        return await Area.findById(id);
    }

    async update(id, area: IArea, callback) {
        return await Area.findByIdAndUpdate(id, area, callback);
    }

    async delete(id, callback) {
        return await Area.findByIdAndRemove(id, callback);
    }
}