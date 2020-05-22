const form = document.getElementById('search-form');
const inputForm = document.getElementById('search-input');

const city = document.querySelector('.city');
const date = document.querySelector('.date');
const temp = document.querySelector('.temp');
const icon = document.querySelector('.weather__icon');
const weather = document.querySelector('.weather__condition');
const hi_low = document.querySelector('.hi-low');
const pressure = document.querySelector('.pressure');

const API_KEY = '10e52714a41904990c6f5d1ce77da36a';

const setCity = (e) => {
	e.preventDefault();
	if (inputForm.value === '') return alert('Wpisz nazwę miasta');
	getData(inputForm.value);
	inputForm.value = '';
}

const getData = (querry) => {
	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${querry}&appid=${API_KEY}&units=metric&lang=en`)
		.then(response => {
			if (response.ok) {
				return response
			}
			throw Error(response.statusText)
		})
		.then(response => response.json())
		.then(displayResult)
		.catch(error => console.log(error, "Nie udało się pobrać danych"))
};

const displayResult = (data) => {
	city.innerText = data.name + ', ' + data.sys.country;
	date.innerText = setDate();
	temp.innerHTML = `${Math.round(data.main.temp)}<span>&deg;c</span>`;
	icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
	icon.alt = 'Weather condition'
	weather.innerText = data.weather[0].main;
	hi_low.innerHTML = `${Math.round(data.main.temp_min)}<span>&deg;C</span> / ${Math.round(data.main.temp_max)}<span>&deg;C</span>`;
	pressure.innerText = `${data.main.pressure} kPa`
}

const setDate = () => {
	const d = new Date()
	const months = ['January', "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();
	return `${day} ${date} ${month} ${year}`
}

const cityListToLoadFirst = ['Miami', 'New York', 'Los Angeles', 'London', 'Madrid', 'Warsaw', 'Tokio', 'Rome,IT', 'Paris', 'Berlin', 'Sydney', 'Shanghai', 'Moscow']

const onLoad = () => {
	const index = Math.floor(Math.random() * cityListToLoadFirst.length)
	getData(cityListToLoadFirst[index])
}

onLoad();

form.addEventListener('submit', setCity);