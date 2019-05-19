const { Geo } = require('./geo');
const { Fuel } = require('./fuel');

let geo;
let fuel;

class FuelApi {
    constructor(apiKeys) {
        fuel = new Fuel(apiKeys.fuelApi);
        geo = new Geo(apiKeys.geoApi);
    }

    async getCheapestGasStation(city, type) {

        let coordinates = await this._getCoordinates(city);

        const parameter = [
            { lat: coordinates.lat },
            { lng: coordinates.lng },
            { rad: "5" },
            { type },
            { sort: "price" }
        ]

        return await fuel.makeRequest(parameter);

    }

    async getCheapestGasStation(city, type, dist) {

        let coordinates = await this._getCoordinates(city);
        // console.log("coordinates:");
        // console.log(coordinates);

        const parameter = [
            { lat: coordinates.lat },
            { lng: coordinates.lng },
            { rad: dist },
            { type },
            { sort: "price" },
        ]

        return await fuel.makeRequest(parameter);

    }

    async _getCoordinates(city) {
        return await geo.getCoordinates(city);
    }
}

exports.FuelApi = FuelApi;