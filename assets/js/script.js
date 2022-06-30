const key = '9da369bc2f49df75ca5f11865f2a0e30'

var searchForm = document.getElementById('search-form')
var searchInput = document.getElementById('search-input')

var cityName = document.getElementById('city-name')
var currentDate = document.getElementById('current-date')
var currentIcon = document.getElementById('current-icon')
var currentTemp = document.getElementById('current-temp')
var currentWind = document.getElementById('current-wind')
var currentHum = document.getElementById('current-hum')
var currentUV = document.getElementById('current-uv')

var dailyForecast = document.getElementById('daily-forecast')

moment().locale()

searchForm.addEventListener('submit', event => {
  event.preventDefault()

  var city = searchInput.value.trim()

  fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + key)
    .then(response => response.json())
    .then(geoData => {
      var lat = geoData[0].lat
      var lon = geoData[0].lon

      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + key)
        .then(response => response.json())
        .then(data => {
          cityName.textContent = city
          currentDate.textContent = moment().format('l')
          currentIcon.src = 'https://openweathermap.org/img/wn/' + data.current.weather[0].icon + '.png'
          currentTemp.textContent = data.current.temp + '°F'
          currentWind.textContent = data.current.wind_speed + ' mph wind speed'
          currentHum.textContent = data.current.humidity + '% humidity'
          currentUV.textContent = data.current.uvi + ' UV index'

          if (data.current.uvi < 3) {
            currentUV.style.backgroundColor = 'green'
          }
          else if (data.current.uvi < 6) {
            currentUV.style.backgroundColor = 'yellow'
          }
          else if (data.current.uvi < 8) {
            currentUV.style.backgroundColor = 'orange'
          }
          else if (data.current.uvi < 11) {
            currentUV.style.backgroundColor = 'red'
          }
          else {
            currentUV.style.backgroundColor = 'purple'
          }

          for (var i = 0; i < 5; i++) {
            var forecastCard = document.createElement('li')

            var date = document.createElement('p')
            var icon = document.createElement('img')
            var temp = document.createElement('p')
            var wind = document.createElement('p')
            var humidity = document.createElement('p')

            date.textContent = moment().add(i + 1, 'days').format('l')
            icon.src = 'https://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '.png'
            temp.textContent = data.daily[i].temp.max + '°F'
            wind.textContent = data.daily[i].wind_speed + ' mph wind speed'
            humidity.textContent = data.daily[i].humidity + '% humidity'

            forecastCard.appendChild(date)
            forecastCard.appendChild(icon)
            forecastCard.appendChild(temp)
            forecastCard.appendChild(wind)
            forecastCard.appendChild(humidity)

            dailyForecast.appendChild(forecastCard)
          }
        })
    })
})