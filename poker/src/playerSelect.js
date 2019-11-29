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
          user2: null,
          P1email: null,
          P2email: null
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
            const usersRef = fire.database().ref("/Root/RegisteredPlayers");
            usersRef.once('value', snapshot => {
                var key = snapshot.child(this.state.user1.uid+"/email").val();
                this.setState({P1email: key})
                console.log("user1 email = ", this.state.P1email)
            })
            console.log("user1 = ", this.state.user1.uid)
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

                    console.log(child.val())
                    console.log(child.val().email+"\n"+child.key)
                    var val = child.val().email;
                    this.setState({user2: child}, () => {
                    });
                    this.setState({P2email: val}, () =>{
                        console.log("P2 email= ", this.state.P2email)
                        this.generateInitialGameState()
                    })
                }
            })
        })
    }

    generateInitialGameState = () => {
        var user1 = this.state.user1.uid;
        var user2 = this.state.user2.key;
        var user1e = this.state.P1email;
        var user2e = this.state.P2email;
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
        fire.database().ref("/Root/GameID/Player1_Email").set({
            email: user1e
        });
        fire.database().ref("/Root/GameID/Player2_Email").set({
            email: user2e
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