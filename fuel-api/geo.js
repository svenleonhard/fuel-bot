const fetch = require("node-fetch");

let API_KEY;
const host = "api.opencagedata.com";

class Geo {
    constructor(apiKey) {
        API_KEY = apiKey;
    }

    async getCoordinates(cityName) {

        const querry = "https://" + host + "/geocode/v1/json?q=" + cityName + "&key=" + API_KEY;

        try {
            const response = await fetch(querry);
            const json = await response.json();
            const { geometry } = json.results[0]
            const coordiantes = {
                lat: geometry.lat,
                lng: geometry.lng
            }

            return coordiantes;
        } catch (error) {
            return error;
        }
    }
}

exports.Geo = Geo;