import React, { Component } from 'react';

class TravelModes extends Component {
  state = {
    mode: ''
  };
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.handleTravelMode('driving');
          }}
        >
          <ion-icon name="car" class="driving" />
        </button>
        <button
          onClick={() => {
            this.handleTravelMode('walking');
          }}
        >
          <ion-icon name="walk" class="" />
        </button>
        <button
          onClick={() => {
            this.handleTravelMode('bycycling');
          }}
        >
          <ion-icon name="bicycle" class="" />
        </button>
      </div>
    );
  }
  handleTravelMode = mode => {
    const { handleEmitTravelMode } = this.props;

    this.setState(
      {
        mode
      },
      () => {
        handleEmitTravelMode(mode);
      }
    );
  };
}

export default TravelModes;
