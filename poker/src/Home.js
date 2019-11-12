import React from 'react';
import fire from './config/fire';
import cards from './images/cards.png';
import { Link } from 'react-router-dom';

class Home extends React.Component {

    logout() {
        fire.auth().signOut();
    }

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

    generateInitialGameState(){

    }
   
    render() {
        return (
            <div align="center" className="Home">
                <div>
                    <h1>Welcome!</h1>
                    <button style={{margin: '10px'}} onClick={this.logout}>Logout</button>
                </div>
                <div>
                    <Link to="/playerSelect">
                        <button style={{margin: '10px'}} onClick={this.generateInitialGameState}>Create PvP</button>
                    </Link>
                    <Link to="/gamepage">
                        <button style={{margin: '10px'}} onClick={this.generateInitialGameState}>Join PvP</button>
                    </Link>
                    <button style={{margin: '10px'}}>PvE</button>
                </div>
                
                <img src={cards} 
                    style={{position: "relative", 
                        bottom: 0, center: 0,
                        height: "15em", 
                        marginRight: "1 em",
                        marginBottom: "1 em"}}/>
            </div>
        )
    }

}

export default Home;
