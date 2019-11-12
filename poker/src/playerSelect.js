import React from 'react';
import fire from './config/fire';
import GamePage from './GamePage.js';
import { Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';


class playerSelect extends React.Component {

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

    generateInitialGameState = () => {
        var cards_dealt = this.deal_nine_cards();
        var user1 = this.state.user.uid.toString();
        var user2 = document.querySelector("#email").value;

        fire.database().ref("/Root/GameID/").set({
                C1: cards_dealt[0],
                C2: cards_dealt[1],
                C3: cards_dealt[2],
                C4: cards_dealt[3],
                C5: cards_dealt[4],
        })
        fire.database().ref("/Root/GameID/"+user1).set({
            C1: cards_dealt[5],
            C2: cards_dealt[6],
        });
        fire.database().ref("/Root/GameID/"+user2).set({
            C1: cards_dealt[7],
            C2: cards_dealt[8]
        });
    }

    render() {
        return ( 
            <div align="center" style={{margin: '50px'}}> 
                <input id="email" placeholder="Enter Opponent Username" size="48" type="text"/>
                <Link to="/gamepage">
                    <button style={{margin: '10px'}} onClick={this.generateInitialGameState}>Start</button>
                </Link>
            </div>
        )
    }
}

export default playerSelect;