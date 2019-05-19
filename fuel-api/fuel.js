const fetch = require("node-fetch");

const host = "creativecommons.tankerkoenig.de";
let API_KEY;

class Fuel{
    constructor(apiKey) {
        API_KEY = apiKey;
    }

    async makeRequest(parameter){
        const parameterQuery = this._makeQuerry(parameter)
        const url = "https://" + host + "/json/list.php" + parameterQuery;

        
        try {
            const response = await fetch(url);
            const json = await response.json();
            const { stations } =  json;
            const { ok } = json;
            // console.log("json:fuel");
            // console.log(json);
            if(ok === true){
            

                const filteredStations = stations.filter(station =>{
                    return station.isOpen;
                })

                const topStations = filteredStations.slice(0,4);
                topStations.forEach(element =>{
                    
                    delete element.id;
                    delete element.lng;
                    delete element.lat;
                    delete element.dist;

                    return element;
                })

                return topStations;
            }
            else{
                return new Error("Fuel  API error");
            }

        } catch (error) {
            return error;
        }
    }

    _makeQuerry(parameters)
    {
        let parameterQuery = "?";
        parameters.forEach(parameter => {
            parameterQuery += Object.keys(parameter)[0];
            parameterQuery += "=";
            parameterQuery += Object.values(parameter)[0];
            parameterQuery += "&";
        });
        parameterQuery += "apikey="
        parameterQuery += API_KEY;

        return parameterQuery;
    }
}

exports.Fuel = Fuel;