import React, { useState } from 'react';
import './App.css';
import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './component/weather.component';
import Form from './component/form.component';
import { Component } from 'react/cjs/react.production.min';

const API_key = "a547490d7e1a6cc61d752508bf272726";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };
    this.getWeather();

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
  }

  // Celsius calculator
  calCelsius(temp){
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  get_weatherIcon(icons, rangeID){
    if(rangeID >= 200 && rangeID <= 232){
      this.setState({icon:this.weatherIcon.Thunderstorm})
    } else if(rangeID >= 300 && rangeID <= 321){
      this.setState({icon:this.weatherIcon.Drizzle})
    } else if(rangeID >= 500 && rangeID <= 531){
      this.setState({icon:this.weatherIcon.Rain})
    } else if(rangeID >= 600 && rangeID <= 622){
      this.setState({icon:this.weatherIcon.Snow})
    } else if(rangeID >= 701 && rangeID <= 781){
      this.setState({icon:this.weatherIcon.Atmosphere})
    } else if(rangeID === 800){
      this.setState({icon:this.weatherIcon.Clear})
    } else if(rangeID >= 801 && rangeID <= 804){
      this.setState({icon:this.weatherIcon.Clouds})
    }
  }

  getWeather = async(e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const apiCall = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
    );

    const response = await apiCall.json();
    console.log(response);

    this.setState({
      city: `${response.name}, ${response.sys.country}`,
      celsius: this.calCelsius(response.main.temp),
      temp_max:this.calCelsius(response.main.temp_max),
      temp_min: this.calCelsius(response.main.temp_min),
      description: response.weather[0].description,
    });

    this.get_weatherIcon(this.weatherIcon, response.weather[0].id)

  }; 

  render(){
    return( 
    <div className="App">   
      
      <Weather city={this.state.city} 
               country={this.state.country}
               temp_celsius={this.state.celsius}
               temp_max={this.state.temp_max}
               temp_min={this.state.temp_min}
               description={this.state.description}
               weatherIcon={this.state.icon}
      />

      <Form loadWeather={this.getWeather}/>

    </div>
  );
 }
}





export default App;
