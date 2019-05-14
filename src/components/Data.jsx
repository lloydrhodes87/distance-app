import React, { Component } from 'react';
import '../styles/panel.css';

class Data extends Component {
  render() {
    const {
      mode,
      data: { duration, distance, origin, destination }
    } = this.props;

    return (
      <div>
        <div className="dataPanel">
          <h2>Journey Details</h2>
          <p>Starting From: {origin}</p>
          <p>Destination: {destination}</p>
          <p>Distance: {distance}</p>
          <p>
            Duration: {duration} by {mode}
          </p>
        </div>
      </div>
    );
  }
}

export default Data;
