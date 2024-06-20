const api = {
  key: "5b7f3c590e09353c000191290e661808",
  base: "https://api.openweathermap.org/data/2.5/",
};


var searchCity="noida";
logMovies()

const buttonbox = document.querySelector("#btnsearch");
buttonbox.addEventListener("click", setQuery);

const searchbox = document.querySelector("#searchin");
searchbox.addEventListener("keypress", setQuery2);

function setQuery(evt) {
  searchCity = document.querySelector("#searchin").value;
  logMovies();
}


function setQuery2(evt) {
  if (evt.keyCode == 13) {
    searchCity = document.querySelector("#searchin").value;
    // console.log(searchCity);
    logMovies();
  }
}


async function logMovies() {
  const response = await fetch(
    `${api.base}weather?q=${searchCity}&appid=${api.key}`
  );
  const data = await response.json();
  // console.log(data);
  writeData(data);
}


const writeData=(data)=>{
  let loc=document.querySelector(".moreinfo .location")
  loc.innerHTML=`Location: ${data.name}`
  
  let curtemp = document.querySelector(".moreinfo .Currenttemp");
  let curtempval=((data.main.temp)-273.15).toFixed(2)
  curtemp.innerHTML = `Current temperature: ${curtempval}°C`;

  if(curtempval>30){
    document.querySelector(".bodytag").style.backgroundImage = "url('7280738.jpg')";
  }
  else{
    document.querySelector(".bodytag").style.backgroundImage = "url('winter.jpg')";

  }
  
  
  let Cloudy = document.querySelector(".moreinfo .Cloudy");
  Cloudy.innerHTML = `Weather: ${data.weather[0].main} (${data.weather[0].description})`;

  let wind = document.querySelector(".moreinfo .wind");
  wind.innerHTML = `Wind: ${data.wind.speed} Kmph`;

  let vis = document.querySelector(".moreinfo .visibility");
  vis.innerHTML = `Visibility: ${(data.visibility)/1000} Km`;

  let humidity = document.querySelector(".moreinfo .Humidity");
  humidity.innerHTML = `Humidity: ${data.main.humidity} g.m-3`;

  let now = new Date();
  let date = document.querySelector(".moreinfo .date");
  date.innerHTML = `Date: ${dateBuilder(now)}`;
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${date} ${month} ${year} / ${day}`;
}