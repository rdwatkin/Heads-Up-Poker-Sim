import React from 'react';
import fire from './config/fire';
import GamePage from './GamePage.js';
import { Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';

class playerSelect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          user1: null,
          user2: null
        }

        this.authListener = this.authListener.bind(this);
        this.eventSource = new EventSource("events");
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        fire.auth().onAuthStateChanged((user1) => {
          if (user1) {
            this.setState({ user1 });
          } else {
            this.setState({ user1: null });
          }
        })
    }

    setUser2 = () => {
        var email = document.querySelector("#email").value;
        const usersRef = fire.database().ref("/Root/RegisteredPlayers").orderByKey();
        usersRef.once('value', snapshot => {
            snapshot.forEach(child=>{
                if(child.val().email == email){
                    console.log(child.val().email+"\n"+child.key)
                    this.setState({user2: child}, () => {
                        console.log("Success!");
                        this.generateInitialGameState()
                    });
                }
            })
        })
    }

    generateInitialGameState = () => {
        var cards_dealt = this.deal_nine_cards();
        var user1 = this.state.user1.uid
        var user2 = this.state.user2.key;
        fire.database().ref("/Root/GameID/").set({
                Player1: user1,
                Player2: user2,
                C1: "back",
                C2: "back",
                C3: "back",
                C4: "back",
                C5: "back",
        })
        fire.database().ref("/Root/GameID/"+user1).set({
            C1: "back",
            C2: "back",
        });
        fire.database().ref("/Root/GameID/"+user2).set({
            C1: "back",
            C2: "back"
        });
        this.props.history.push('./gamepage');
    }

    render() {
        return ( 
            <div align="center" style={{margin: '50px'}}> 
                <input id="email" placeholder="Enter Opponent Username" size="48" type="text"/>
                <button style={{margin: '10px'}} onClick={this.setUser2}>Start</button>
            </div>
        )
    }
}

export default playerSelect;