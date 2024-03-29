var data = [ { "HolidayReference": 1, "HotelName": "Uptown", "City": "Bali", "Continent": "Asia", "Country": "Indonesia", "Category": "active", "StarRating": 3, "TempRating": "mild", "Location": "mountain", "PricePerPerNight": 120 }, { "HolidayReference": 2, "HotelName": "Relaxamax", "City": "New Orleans", "Continent": "North America", "Country": "USA", "Category": "lazy", "StarRating": 4, "TempRating": "mild", "Location": "city", "PricePerPerNight": 28 }, { "HolidayReference": 3, "HotelName": "WindyBeach", "City": "Ventry", "Continent": "Europe", "Country": "Ireland", "Category": "active", "StarRating": 3, "TempRating": "mild", "Location": "sea", "PricePerPerNight": 42 }, { "HolidayReference": 4, "HotelName": "Twighlight", "City": "Marrakech", "Continent": "Africa", "Country": "Morocco", "Category": "lazy", "StarRating": 5, "TempRating": "cold", "Location": "mountain", "PricePerPerNight": 50 }, { "HolidayReference": 5, "HotelName": "TooHot", "City": "Sydney", "Continent": "Australia", "Country": "Australia", "Category": "lazy", "StarRating": 5, "TempRating": "hot", "Location": "sea", "PricePerPerNight": 67 }, { "HolidayReference": 6, "HotelName": "Castaway", "City": "", "Continent": "Africa", "Country": "The Maldives", "Category": "lazy", "StarRating": 3, "TempRating": "mild", "Location": "sea", "PricePerPerNight": 120 }, { "HolidayReference": 7, "HotelName": "Eiffel Park", "City": "Paris", "Continent": "Europe", "Country": "France", "Category": "active", "StarRating": 4, "TempRating": "mild", "Location": "city", "PricePerPerNight": 45 }, { "HolidayReference": 8, "HotelName": "The Cape", "City": "Cape Town", "Continent": "Africa", "Country": "South Africa", "Category": "active", "StarRating": 4, "TempRating": "mild", "Location": "sea", "PricePerPerNight": 78 }, { "HolidayReference": 9, "HotelName": "Desert Dreams", "City": "Dubai", "Continent": "Asia", "Country": "U.A.E", "Category": "active", "StarRating": 4, "TempRating": "hot", "Location": "mountain", "PricePerPerNight": 67 }, { "HolidayReference": 10, "HotelName": "SeaViews", "City": "Bora Bora", "Continent": "Australia", "Country": "French Polynesia", "Category": "active", "StarRating": 3, "TempRating": "mild", "Location": "sea", "PricePerPerNight": 54 }, { "HolidayReference": 11, "HotelName": "AppleCity", "City": "New York", "Continent": "North America", "Country": "USA", "Category": "active", "StarRating": 3, "TempRating": "mild", "Location": "city", "PricePerPerNight": 27 }, { "HolidayReference": 12, "HotelName": "IslandHopper", "City": "Dubrovnik", "Continent": "Europe", "Country": "Croatia", "Category": "active", "StarRating": 5, "TempRating": "mild", "Location": "sea", "PricePerPerNight": 78 }, { "HolidayReference": 13, "HotelName": "CastleTown", "City": "Edinburgh", "Continent": "Europe", "Country": "Scotland", "Category": "lazy", "StarRating": 3, "TempRating": "mild", "Location": "city", "PricePerPerNight": 53 }, { "HolidayReference": 14, "HotelName": "WineValley", "City": "Rome", "Continent": "Europe", "Country": "Italy", "Category": "lazy", "StarRating": 5, "TempRating": "mild", "Location": "city", "PricePerPerNight": 25 }, { "HolidayReference": 15, "HotelName": "WearyTraveller", "City": "Paro Valley", "Continent": "Asia", "Country": "Bhutan", "Category": "active", "StarRating": 5, "TempRating": "mild", "Location": "mountain", "PricePerPerNight": 54 }, { "HolidayReference": 16, "HotelName": "HotTimes", "City": "Jaipur", "Continent": "Asia", "Country": "India", "Category": "lazy", "StarRating": 4, "TempRating": "hot", "Location": "sea", "PricePerPerNight": 67 }, { "HolidayReference": 17, "HotelName": "ForestRetreat", "City": "Waikato", "Continent": "Australia", "Country": "New Zealand", "Category": "active", "StarRating": 4, "TempRating": "mild", "Location": "mountain", "PricePerPerNight": 89 }, { "HolidayReference": 18, "HotelName": "Casablanca", "City": "Havana", "Continent": "North America", "Country": "Cuba", "Category": "lazy", "StarRating": 5, "TempRating": "mild", "Location": "city", "PricePerPerNight": 29 }, { "HolidayReference": 19, "HotelName": "TechCity", "City": "Tokyo", "Continent": "Asia", "Country": "Japan", "Category": "active", "StarRating": 3, "TempRating": "mild", "Location": "city", "PricePerPerNight": 71 }, { "HolidayReference": 20, "HotelName": "IceHotel", "City": "Base Marambio", "Continent": "Antarctica", "Country": "Antartica", "Category": "active", "StarRating": 5, "TempRating": "cold", "Location": "mountain", "PricePerPerNight": 270 }, { "HolidayReference": 21, "HotelName": "NorthStar", "City": "", "Continent": "Arctic", "Country": "Greenland", "Category": "active", "StarRating": 5, "TempRating": "cold", "Location": "mountain", "PricePerPerNight": 250 } ];

function normalize_key(key){
	switch(key){
		case "price":
			return "PricePerPerNight"
			break;
		case "temperature":
			return "TempRating"
			break;
		case "continent":
			return "Continent"
			break;
		case "rating":
			return "StarRating"
			break;
	}
	return key;
}

module.exports = (function(params){
    return new Promise(async function(cb){
		try {
			var inputs = params;
			var temperature = inputs.temperature;
			var price = inputs.price;
			var continent = inputs.continent;
			var rating = inputs.rating;

			var final_holidays = [];
			
			for(var i in data){
				var holiday = data[i];
				if(holiday[normalize_key('temperature')] == temperature){
					if(parseInt(holiday[normalize_key('rating')]) >= rating){
						if(holiday[normalize_key('continent')] == continent){
							if(parseInt(holiday[normalize_key('price')]) <= price || price >= 120)
							final_holidays.push(holiday);	
						}
					}							
				}		
			}			
			var beginSentence = "The following vacations matched your criteria:";
			var andSentence = "or";
			var reply = '';
			for(let i in final_holidays){
				let holiday = final_holidays[i];

				if(i == 0){
					reply += beginSentence + ' ';
				} else if(i < final_holidays.length - 1){
					reply += andSentence + ' ';
				} else if(i == final_holidays.length - 1){
					reply += andSentence + ' ';
				}
				reply += "@HotelName@ in @City@, @Country@ ";
				
				for(let key in holiday){
					reply = reply.replaceAll('@' + key + '@', holiday[key]);
				}
			}

			if (final_holidays.length == 0){
				reply = "No holidays match your criteria.";
			}

		cb({
		type: "success",
		holiday:final_holidays,
		reply:reply

		});

		}
		catch(e){
			cb({type:`failure_${e}`});
			return;
		}
	});
    
});