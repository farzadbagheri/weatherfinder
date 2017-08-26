import React, { Component } from 'react';
import './App.css';
import WeatherView from './WeatherView';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            temp_type: "imperial",
            city: '',
            country:'',
            temp: null,
            max_temp:null,
            min_temp:null,
            weather: null,
            img:null,
            err_message:"City not Found"
        }
    }

    search() {
            const url = 'https://api.openweathermap.org/data/2.5/weather?';
            const appId = 'eaea59fede8a0ba85d7f3a0ef34c6961'
            const fetch_url = `${url}zip=${this.state.query},us&units=${this.state.temp_type}&appid=${appId}`
            
            fetch(fetch_url, {
                method: 'GET'
            })
            .then(response => {
            if (!response.ok) { throw Error(response.statusText) }
                return response.json()  
            })
            .then(json => {
                const city = json.name
                const country = json.sys.country
                const temp = json.main.temp
                const weather = json.weather[0].description
                const img = json.weather[0].icon
                const max_temp = json.main.temp_max
                const min_temp = json.main.temp_min
                this.setState({city})
                this.setState({temp})
                this.setState({country})
                this.setState({weather})
                this.setState({max_temp})
                this.setState({min_temp})
                this.setState({img})
                const err_message = null
                this.setState({err_message})
            }).catch( err => {
                const city = null
                this.setState({city})
                const err_message = "City not Found"
                this.setState({err_message})
            
    })
    }
    render() {
        return (
            <div className="App">
                <div className="top">
                    <h2>Weather Finder</h2>
                    <div className="container">
                        <input value={this.state.query} 
                        onChange={event=>{this.setState({query: event.target.value})}} 
                        onKeyPress={event =>{
                                if(event.key === 'Enter'){
                                    this.search();
                                }
                            }
                        } 
                        placeholder='5-Digit ZIP code'/>
                        <button 
                            onClick={() => this.search()}                             
                            className="button">Go</button>
                        <label className="toggle">
                            <input onClick={()=>{
                                if(this.state.temp_type === "imperial") {
                                    this.setState({temp_type: "metric"}, () => { 
                                        if(this.state.city !== null && this.state.city !== ''){
                                            this.search()
                                        }
                                    });
                                } else if( this.state.temp_type === "metric") {
                                    this.setState({temp_type: "imperial"}, () => { 
                                        if(this.state.city !== null && this.state.city !== ''){
                                            this.search()
                                        }
                                    });
                                }
                                
                            }
                            } 
                            className="toggle-in" type="checkbox" />
                                <span className="toggle-label"></span> 
                                <span className="toggle-handle"></span> 
                        </label>
                    </div> 
                </div>
                {
                    this.state.city !== '' || this.state.temp !== null
                    ? <WeatherView
                    city = {this.state.city}
                    temp = {this.state.temp}
                    country = {this.state.country}
                    max_temp = {this.state.max_temp}
                    weather= {this.state.weather}
                    min_temp = {this.state.min_temp}
                    img = {this.state.img}
                    err_message = {this.state.err_message}
                    /> 
                    :<div></div>
                     
                }
                 
            </div>
            
        )
    }
}

export default App;