import React, {Component } from 'react';
import Home from './Home.js';
import Login from './Login.js';
import PlayerSelect from './playerSelect.js';
import fire from './config/fire';
import Router from './Router.js'

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
        {this.state.user ? (<Router/>) : (<Login/>)}
      </div>
    );
  }
}


export default App;
