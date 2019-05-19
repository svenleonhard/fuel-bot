const mostCheapestPhrase = "Here are the top four gas station with the most cheapest price for ";

class AnswerBuilder{

    fourMostCheapestStations(stationList,type,city){

        let stationListing = "\n";

        stationList.forEach(station => {
            stationListing += station.name;
            stationListing += ", ";
            stationListing += station.street;
            stationListing += " ";
            stationListing += station.houseNumber;
            stationListing += ":\n";
            stationListing += "Price: ";
            stationListing += station.price;
            stationListing += "€\n";         
        });

        return mostCheapestPhrase + type + " in " + this._capitalizeFirstLetter(city) + ":" + stationListing;

    }

    _capitalizeFirstLetter(word)
    {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

}

exports.AnswerBuilder = AnswerBuilder;