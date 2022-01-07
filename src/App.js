import React, { useState } from 'react';
import './App.css';
import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './component/weather.component';
import { Component } from 'react/cjs/react.production.min';

const API_key = "a547490d7e1a6cc61d752508bf272726";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      city: undefined,
      country: undefined
    };
    this.getWeather();
  }

  getWeather = async() => {
    const apiCall = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_key}`
    );

    const response = await apiCall.json();
    console.log(response);

    this.setState({
      city: response.name,
      country: response.sys.country 
    })
  }; 

  render(){
    return( 
    <div className="App">   
      <Weather city={this.state.city} country={this.state.country}/>
    </div>
  );
 }
}




export default App;
