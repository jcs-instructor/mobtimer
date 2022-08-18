import React, { Component } from 'react';
import './App.css'
import JoinMob from './components/JoinMob';
import JoinMobHeading from './components/JoinMobHeading';

// todo: Extend HTMLFormElement
export type JoinMobEvent = {
  preventDefault: () => void;
  target: {
    elements: {
      mobname: {
        value: string;
      };
    };
  };
};

class App extends Component {

  state = {
    users: [],
    loading: ''
  };

  handleRequest = (event: JoinMobEvent) => {

    event.preventDefault();
    const mobName = event.target.elements.mobname.value;
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