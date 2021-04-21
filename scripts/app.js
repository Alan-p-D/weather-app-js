const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();
const updateUI = (data) => {

    // const cityDetails = data.cityDetails;
    // const weather = data.weather;
    // destructure properties no need for the above
    const { cityDetails, weather } = data;

    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>`;

        // update night and day and icon images

        const iconSource = `img/icons/${weather.WeatherIcon}.svg`;
        icon.setAttribute('src', iconSource);

        let timeSource = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
        time.setAttribute('src', timeSource);

        // remove the d-none class if present
        if(card.classList.contains('d-none')){
            card.classList.remove('d-none');
        }

};

const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);
    // below known as Object shorthand notation
    return { cityDetails, weather };
};

cityForm.addEventListener('submit', e => {
// prevent default action of the form
    e.preventDefault();
    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();


    // update ui with new city
    forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('location', city);
});

if(localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}