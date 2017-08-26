import React, { Component } from 'react';
import './App.css';

class WeatherView extends Component {
    render() {
        let city='';
        let temp = null;
        let err_message = null;
        let country = '';
        let weather = '';
        let max_temp = null;
        let min_temp = null;
        let img_url = '';
        if(this.props.city !== null){
            city = this.props.city;
            temp = this.props.temp + " °";
            country = this.props.country;
            weather = this.props.weather;
            max_temp = this.props.max_temp + " °";
            min_temp = this.props.min_temp + " °";
            img_url = "http://openweathermap.org/img/w/" + this.props.img + ".png"
         }else {
            err_message = this.props.err_message
            return(
                <h2 className="city-profile">{err_message}</h2>
            )
        }
        return(
            <div className="city-profile">
                <h2 className="city">{city}, {country}</h2>
                <div className="weather">{weather}</div>
                <img className="test" src={img_url} alt="weather display"/>
                <div className="temp">current: {temp}</div>
                <div className="temp">High: {max_temp}</div>
                <div className="temp">Low: {min_temp}</div>    
            </div>
        )
    }
}

export default WeatherView;