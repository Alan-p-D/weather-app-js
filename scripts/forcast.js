class Forecast{
    constructor() {
        this.key = 'OKJRt8GwN8ZfBXR7RDMUGmgFuRgaA2eg';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city) { // copy from app.js with insertion of this.
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);
        // below known as Object shorthand notation
        return { cityDetails, weather };
    }
    async getCity(city) { // copy from app.js with insertion of this.
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    }
    async getWeather(id) {
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }
}

// const key = 'OKJRt8GwN8ZfBXR7RDMUGmgFuRgaA2eg';

// Get weather information
// const getWeather = async (id) => {

//     const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
//     const query = `${id}?apikey=${key}`;

//     const response = await fetch(base + query);
//     const data = await response.json();

//      return data[0];
// };
// Get city information
// now a method above
// const getCity = async (city) => {

//     const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
//     const query = `?apikey=${key}&q=${city}`;

//     const response = await fetch(base + query);
//     const data = await response.json();

//     return data[0];
// };
// no need for this in this file.
// getCity('leeds').then(data => {
//     return getWeather(data.Key);
// }).then(data => {
//     console.log(data);
// }).catch(err => console.log(err));