const apiKey = '9da369bc2f49df75ca5f11865f2a0e30'

var searchForm    = document.getElementById('search-form')
var searchInput   = document.getElementById('search-input')
var searchHistory = document.getElementById('search-history')

var city        = document.getElementById('city')
var currentDate = document.getElementById('current-date')
var currentIcon = document.getElementById('current-icon')
var currentTemp = document.getElementById('current-temp')
var currentWind = document.getElementById('current-wind')
var currentHum  = document.getElementById('current-hum')
var currentUVI  = document.getElementById('current-uvi')

var forecastHeading = document.getElementById('forecast-heading')
var forecastList    = document.getElementById('forecast-list')

moment.locale()

searchForm.addEventListener('submit', event => {
  event.preventDefault()

  var cityName = searchInput.value.trim()

  fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey)
    .then(response => response.json())
    .then(geoData => {
      var lat = geoData[0].lat
      var lon = geoData[0].lon

      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey)
        .then(response => response.json())
        .then(data => {
          city.textContent        = cityName
          currentDate.textContent = moment().format('l')
          currentIcon.src         = 'https://openweathermap.org/img/wn/' + data.current.weather[0].icon + '.png'
          currentTemp.textContent = data.current.temp + '°F'
          currentWind.textContent = data.current.wind_speed + ' mph wind speed'
          currentHum.textContent  = data.current.humidity + '% humidity'
          currentUVI.textContent  = data.current.uvi + ' UV index'

          if (data.current.uvi < 3) {
            currentUVI.style.backgroundColor = 'green'
          }
          else if (data.current.uvi < 6) {
            currentUVI.style.backgroundColor = 'yellow'
          }
          else if (data.current.uvi < 8) {
            currentUVI.style.backgroundColor = 'orange'
          }
          else if (data.current.uvi < 11) {
            currentUVI.style.backgroundColor = 'red'
          }
          else {
            currentUVI.style.backgroundColor = 'purple'
          }

          forecastHeading.textContent = "5-Day Forecast"

          for (var i = 0; i < 5; i++) {
            var listItem = forecastList.children[i]

            var forecastDate = listItem.children[0]
            var forecastIcon = listItem.children[1]
            var forecastTemp = listItem.children[2]
            var forecastWind = listItem.children[3]
            var forecastHum  = listItem.children[4]

            forecastDate.textContent = moment().add(i + 1, 'days').format('l')
            forecastIcon.src         = 'https://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '.png'
            forecastTemp.textContent = data.daily[i].temp.max + '°F'
            forecastWind.textContent = data.daily[i].wind_speed + ' mph wind speed'
            forecastHum.textContent  = data.daily[i].humidity + '% humidity'
          }
        })
    })
})