import React, { Component } from 'react';
import '../styles/history.css';

class History extends Component {
  state = {
    recentOrigins: [],
    recentDestinations: [],
    viewHistory: false,
    reselectOrigin: '',
    reselectDestination: ''
  };
  render() {
    const { recentOrigins, recentDestinations, viewHistory } = this.state;

    return (
      <div className="history">
        <button onClick={this.handleShowHistory}>
          View History <ion-icon name="book" />
        </button>
        {viewHistory && (
          <div>
            <h2>View recent places</h2>
            <div className="container">
              <div className="origins">
                {this.state.recentOrigins.length > 0 && <h3>Origins</h3>}
                <ul>
                  {recentOrigins.map(location => {
                    return (
                      <li key={location}>
                        <button
                          onClick={() => this.handleReselectOrigin(location)}
                          className="link"
                        >
                          {location}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="destinations">
                {this.state.recentDestinations.length > 0 && (
                  <h3>Destinations</h3>
                )}
                <ul>
                  {recentDestinations.map(location => {
                    return (
                      <li key={location}>
                        <button
                          className="link"
                          onClick={() =>
                            this.handleReselectDestination(location)
                          }
                        >
                          {location}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  componentWillMount = () => {
    localStorage.getItem('recent') &&
      this.setState({
        recentOrigins: JSON.parse(localStorage.getItem('recent')).recentOrigins,
        recentDestinations: JSON.parse(localStorage.getItem('recent'))
          .recentDestinations
      });
  };
  componenetWillUpdate = (nextProps, nextState) => {};
  componentDidUpdate = (prevProps, prevState) => {
    const { recentOrigins, recentDestinations } = this.state;
    const {
      data: { destination, origin }
    } = this.props;

    if (
      recentOrigins.findIndex(location => location === origin) === -1 &&
      origin !== ''
    ) {
      this.setState(
        prevState => ({
          recentOrigins: prevState.recentOrigins.concat(origin)
        }),
        () => {
          if (
            recentDestinations.findIndex(
              location => location === destination
            ) === -1 &&
            destination !== ''
          ) {
            this.setState(
              prevState => ({
                recentDestinations: prevState.recentDestinations.concat(
                  destination
                )
              }),
              () => {
                localStorage.setItem('recent', JSON.stringify(this.state));
              }
            );
          }
        }
      );
    }
  };
  handleShowHistory = () => {
    this.setState(prevState => ({
      viewHistory: !prevState.viewHistory
    }));
  };
  handleReselectOrigin = location => {
    const { handleReselectDestination } = this.props;
    this.setState(
      {
        reselectOrigin: location
      },
      () => {
        handleReselectDestination(location);
      }
    );
  };
  handleReselectDestination = location => {
    const { handleReselectOrigin } = this.props;
    this.setState(
      {
        reselectDestination: location
      },
      () => {
        handleReselectOrigin(location);
      }
    );
  };
}

export default History;
