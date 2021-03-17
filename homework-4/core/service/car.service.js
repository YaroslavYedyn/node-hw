const { models: { Car } } = require('../dataBase');

module.exports = {
    findCar: async (query) => {
        const cars = await Car.find(query);
        return cars;
    },

    createCar: async (Object) => {
        await Car.create(Object);
    },

    getSingleCar: async (carId) => {
        const user = await Car.findById(carId);
        return user;
    },

    updateCar: async (query, updateBody) => {
        const car = await Car.updateOne(query, updateBody);
        return car;
    },

    updateCars: async (query, updateBody) => {
        const car = await Car.updateMany(query, updateBody);
        return car;
    },

    removeCar: async (carId) => {
        await Car.deleteOne({ _id: carId }, (e) => console.log(e));
    }
};
