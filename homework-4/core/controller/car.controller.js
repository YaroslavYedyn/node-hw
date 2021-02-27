const { carService } = require('../service');
const { errorCode } = require('../constant');

module.exports = {
    findCars: async (req, res) => {
        try {
            const car = await carService.findCar(req.query);
            res.json(car);
        } catch (e) {
            res.status(418).json(e.message);
        }
    },

    getSingleCar: async (req, res) => {
        try {
            const id = req.params.carId;
            const user = await carService.getSingleCar(id);
            res.json(user);
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    },

    createCar: async (req, res) => {
        try {
            await carService.createCar(req.body);
            res.json('Car is created');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    updateCar: async (req, res) => {
        try {
            await carService.updateCar(req.query, req.body);
            res.json('Car updated');
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    },

    updateCars: async (req, res) => {
        try {
            await carService.updateCars(req.query, req.body);
            res.json('Cars updated');
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    },

    removeCar: async (req, res) => {
        try {
            const id = req.params.carId;
            await carService.removeCar(id);
            res.json('Car remove');
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    }
};
