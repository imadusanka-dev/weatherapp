import React, { Component } from 'react';

const axios = require('axios');

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: null,
            city: null,
            country: null,
            description: null,
            temp: null,
            humidity: null,
            wind: null,
            icon:null,
            clcked:false


        };

        this.getCity = this.getCity.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    getCity(event){
        this.setState({input: event.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({clicked: true});

        var self = this;
        //Call API
        axios.get('https://api.openweathermap.org/data/2.5/weather?q='+this.state.input+'&appid=f3b0ae0088a6552e6e81b86bbfdf0a6b')
            .then(function (response) {
                // handle success
                // Assing response data to states
                self.setState({description: response.data.weather[0].description});
                self.setState({temp: response.data.main.temp});
                self.setState({humidity: response.data.main.humidity});
                self.setState({city: response.data.name});
                self.setState({country: response.data.sys.country});
                self.setState({wind: response.data.wind.speed});
                self.setState({icon: response.data.weather[0].icon});

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });



    }

    result(){
        if (this.state.description != null) {
            var iconurl = `http://openweathermap.org/img/wn/${this.state.icon}.png`;
            return (
                <div>
                    <img src={iconurl} alt="" height={150} width={150}/>
                    <h5>City : {this.state.city}, {this.state.country}</h5>
                    <h5>Weather : {this.state.description}</h5>
                    <h5>Humidity : {this.state.humidity}%</h5>
                    <h5>Temperature : {(this.state.temp - 273.15).toFixed(2)}<sup>o</sup>C</h5>
                    <h5>Wind Speed : {this.state.wind} ms<sup>-1</sup></h5>
                </div>
            );
        }
        if (this.state.clicked && this.state.description == null){
            return(
                <div className="alert alert-danger text-center">
                    <p>Connection Error / Invalid Input.</p>
                </div>
            );
        }


    }

    render(){
        return(
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <a href="" className="navbar-brand">Weather App</a>
                </nav>
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control"
                                           placeholder="City" onChange={this.getCity} required/>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary float-right"
                                    type="sumbit">Search</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-2"></div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8">
                            {this.result()}
                        </div>
                        <div className="col-2"></div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
