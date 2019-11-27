import React from 'react';
import fire from './config/fire';
import GamePage from './GamePage.js';
import { Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';
const GameState = require('./GameState');

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

    remove_card(deck, index){
        for(var i = index; i <= 52; i++ ){
            deck[i] = deck[i+1];
        }
    }

    deal_nine_cards(){
        var cards_left = 52;
        var dealt_cards = new Array(10);
        var deck = ["1S", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS",
                    "1H", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH",
                    "1D", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD",
                    "1C", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC"];
        var card;
        var index;
        for(var i=0; i<9; i++){
            index = Math.floor(Math.random()*cards_left);
            dealt_cards[i] = deck[index];
            this.remove_card(deck, index);
            cards_left--;
        }
        return dealt_cards;
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
    
        var game = new GameState(this.state.user1.uid, this.state.user2.key);
        game.distribute_cards(cards_dealt);

        fire.database().ref("/Root/GameID/").set({
            GAME: game
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