import React, { Component } from 'react';
import axios from 'axios';
import '../styles/form.css';

class Travel extends Component {
  state = {
    destination: '',
    origin: '',
    data: {}
  };
  render() {
    const { destination, origin } = this.state;

    return (
      <div className="search">
        <form className="form">
          <label htmlFor="origin">Origin</label>
          <input
            onChange={this.handleChange}
            value={origin}
            name="origin"
            type="text"
            id="origin"
          />

          <label htmlFor="destination">Destination</label>
          <input
            onChange={this.handleChange}
            value={destination}
            type="text"
            name="destination"
            id="destination"
          />
          <button type="submit" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
  componentDidUpdate = (prevProps, prevState) => {
    const { oldOrigin, oldDestination } = this.props;
    if (
      prevProps.oldOrigin !== oldOrigin ||
      prevProps.oldDestination !== oldDestination
    ) {
      this.setState({
        origin: oldOrigin,
        destination: oldDestination
      });
    }
  };
  handleChange = event => {
    const { id } = event.target;
    this.setState({ [id]: event.target.value });
  };
  handleSubmit = event => {
    console.log('here');
    event.preventDefault();
    this.getData();

    this.setState({
      destination: '',
      origin: '',
      oldOrigin: '',
      oldDestination: ''
    });
  };
  getData = () => {
    const { destination, origin } = this.state;
    const { getDataFromTravel, mode } = this.props;

    axios
      .get(
        `https://distance-api-lr.herokuapp.com/api/destination?origins=${origin}&destinations=${destination}&mode=${mode}&key=AIzaSyD4reoMLRkzR9Htv4PmIuzAV99pP-P2Lqs`
      )
      .then(({ data }) => {
        getDataFromTravel(data);
        this.setState(
          () => ({
            data,
            err: false
          }),
          () => {
            getDataFromTravel(data, this.state.err);
          }
        );
      })
      .catch(err => {
        this.props.handleError(err);
      });
  };
}

export default Travel;
