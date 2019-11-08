import React, {Component } from 'react';
import Home from './Home.js';
import Login from './Login.js';
import GamePage from './GamePage.js';
import fire from './config/fire';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    }

    this.authListener = this.authListener.bind(this);
    this.eventSource = new EventSource("events");
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    })
     
  }


  render() {
    return (
      <div>
        {this.state.user ? (<GamePage/>) : (<Login/>)}
      </div>
    );
  }
}


export default App;
