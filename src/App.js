import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Travel from './components/Travel';
import Data from './components/Data';
import TravelModes from './components/TravelModes';
import History from './components/History';
import Err from './components/Err';

class App extends Component {
  state = {
    data: {
      distance: '',
      duration: '',
      origin: '',
      destination: '',
      loading: false
    },
    mode: 'driving',
    oldOrigin: '',
    oldDestination: '',
    error: false
  };
  render() {
    const { data, mode, oldDestination, oldOrigin, error } = this.state;

    return (
      <div className="App">
        {error && <Err />}
        <Header />
        <TravelModes handleEmitTravelMode={this.handleEmitTravelMode} />
        <p>You've selected: {mode[0].toUpperCase() + mode.substring(1)}</p>
        <Travel
          getDataFromTravel={this.getDataFromTravel}
          mode={mode}
          oldDestination={oldOrigin}
          oldOrigin={oldDestination}
          handleError={this.handleError}
        />

        <div className="main">
          {data.distance !== '' && (
            <Data data={data} mode={mode} className="data" />
          )}
          <History
            data={data}
            handleReselectDestination={this.handleReselectDestination}
            handleReselectOrigin={this.handleReselectOrigin}
          />
        </div>
      </div>
    );
  }

  getDataFromTravel = data => {
    this.setState({
      data: {
        distance: data.rows[0].elements[0].distance.text,
        duration: data.rows[0].elements[0].duration.text,
        destination: data.destination_addresses[0],
        origin: data.origin_addresses[0],
        loading: false
      }
    });
  };
  handleEmitTravelMode = value => {
    this.setState({
      mode: value
    });
  };
  handleReselectOrigin = origin => {
    this.setState({
      oldOrigin: origin
    });
  };
  handleReselectDestination = destination => {
    this.setState({
      oldDestination: destination
    });
  };
  handleError = err => {
    this.setState({
      err: true
    });
  };
}

export default App;
