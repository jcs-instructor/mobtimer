import React, { Component } from 'react';
import './App.css'
import JoinMob from './components/JoinMob';
import JoinMobHeading from './components/JoinMobHeading';

class App extends Component {

  state = {
    users: [],
    loading: ''
  };

  handleRequest = (e) => {

    e.preventDefault();
    const mobName = e.target.elements.mobname.value;
    this.setState({ loading: "loading...." });

    if (mobName) {
      alert(`You entered ${mobName}`);
    } else {
      alert("Please Enter a Mob Name");
    }
  }

  render() {
    return (
      <div className="app">
        <JoinMobHeading />
        <JoinMob handleRequest={this.handleRequest} />
      </div>
    )
  }
}

export default App