import React from 'react';
import fire from './config/fire';
import cards from './images/cards.png';
 
// Importing all 52 cards
import back from './images/back.png';
import S1 from './images/1S.png';   import H1 from './images/1H.png';   import D1 from './images/1D.png';   import C1 from './images/1C.png';
import S2 from './images/2S.png';   import H2 from './images/2H.png';   import D2 from './images/2D.png';   import C2 from './images/2C.png';
import S3 from './images/3S.png';   import H3 from './images/3H.png';   import D3 from './images/3D.png';   import C3 from './images/3C.png';
import S4 from './images/4S.png';   import H4 from './images/4H.png';   import D4 from './images/4D.png';   import C4 from './images/4C.png';
import S5 from './images/5S.png';   import H5 from './images/5H.png';   import D5 from './images/5D.png';   import C5 from './images/5C.png';
import S6 from './images/6S.png';   import H6 from './images/6H.png';   import D6 from './images/6D.png';   import C6 from './images/6C.png';
import S7 from './images/7S.png';   import H7 from './images/7H.png';   import D7 from './images/7D.png';   import C7 from './images/7C.png';
import S8 from './images/8S.png';   import H8 from './images/8H.png';   import D8 from './images/8D.png';   import C8 from './images/8C.png';
import S9 from './images/9S.png';   import H9 from './images/9H.png';   import D9 from './images/9D.png';   import C9 from './images/9C.png';
import S10 from './images/10S.png'; import H10 from './images/10H.png'; import D10 from './images/10D.png'; import C10 from './images/10C.png';
import S11 from './images/JS.png';  import H11 from './images/JH.png';   import D11 from './images/JD.png'; import C11 from './images/JC.png';
import S12 from './images/QS.png';  import H12 from './images/QH.png';  import D12 from './images/QD.png';  import C12 from './images/QC.png';
import S13 from './images/KS.png';  import H13 from './images/KH.png';  import D13 from './images/KD.png';  import C13 from './images/KC.png';
 
const images = require.context('./images', true);

class GamePage extends React.Component {
    
    constructor() {
        super()
        this.deal_to_players = this.deal_to_players.bind(this);
        this.deal_random_card = this.deal_random_card.bind(this);
        this.get_card_img = this.get_card_img.bind(this);
        this.state = {Ca1: "", Ca2: "", Ca3: ""}
    }

    componentWillMount(){
        this.upload_flop()
        fire.database().ref("/Root/GameID/flop").once('value', snapshot => {
                var Car1 = snapshot.child("C1").val()
                var Car2 = snapshot.child("C2").val()
                var Car3 = snapshot.child("C3").val()
                console.log("\n\n" + Car1);
                this.setState({
                    Ca1: Car1,
                    Ca2: Car2,
                    Ca3: Car3
                })
            })
    }
    
    upload_card_to_database(path, name, card){
        return function() {
            fire.database().ref(path).set({
                name: card
            });
        }
    }
 
    logout() {
        fire.auth().signOut();
    }

    deal_random_card() {
        var deck = ["1S", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS",
                    "1H", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH",
                    "1D", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD",
                    "1C", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC"];
        let card = deck[Math.floor(Math.random()*52)];
        let imgsrc = images('./'+card+'.png');
        return <img src={imgsrc} style={{height: "10em", marginRight: '10px'}}/>
    }

    get_random_card() {
        var deck = ["1S", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS",
                    "1H", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH",
                    "1D", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD",
                    "1C", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC"];
        let card = deck[Math.floor(Math.random()*52)];
        return card;
    }

    upload_flop(){
        fire.database().ref("/Root/GameID/flop").set({
            C1: this.get_random_card(),
            C2: this.get_random_card(),
            C3: this.get_random_card()
        })
    }

    get_card_img(card){
        if (card == ""){
            card = "1S";
        }
        let imgsrc = images('./'+card+'.png');
        return <img src={imgsrc} style={{height: "10em", marginRight: '10px'}}/>;
    }
    
    //deal function, randomly choose a card to assign.
    //returns arary of 9 cards
    deal_nine_cards() {
        //initialize number of cards in the deck
        var cards_left = 52;
        //create data structure that hold all cards
        var deck = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12", "S13",
                    "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "H11", "H12", "H13",
                    "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12", "D13",
                    "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12", "C13"];
        //create array of dealt cards
        var dealt_cards = ["temp1", "temp2", "temp3", "temp4", "temp5", "temp6", "temp7", "temp8", "temp9"];
        //create random1, number between 1 and 52
        var random1 = Math.floor(Math.random() * 52);
        var card1 = deck[random1];
        //add card1 to array of dealt cards
        dealt_cards[0] = card1;
        //choose random2
        var random2 = Math.floor(Math.random() * 52);
        while(random2 == random1){
            random2 = Math.floor(Math.random() * 52);
        }
        var card2 = deck[random2];
        dealt_cards[1] = card2;
        //choose random3
        var random3 = Math.floor(Math.random() * 52);
        while(random3 == random1 || random3 == random2){
            random3 = Math.floor(Math.random() * 52);
        }
        var card3 = deck[random3];
        dealt_cards[2] = card3;
        //choose random4
        var random4 = Math.floor(Math.random() * 52);
        while(random4 == random1 || random4 == random2 || random4 == random3){
            random4 = Math.floor(Math.random() * 52);
        }
        var card4 = deck[random4];
        dealt_cards[3] = card4;
        //choose random5
        var random5 = Math.floor(Math.random() * 52);
        while(random5 == random1 || random5 == random2 || random5 == random3 || random5 == random4){
            random5 = Math.floor(Math.random() * 52);
        }
        var card5 = deck[random5];
        dealt_cards[4] = card5;
        //choose random6
        var random6 = Math.floor(Math.random() * 52);
        while(random6 == random1 || random6 == random2 || random6 == random3 || random6 == random4 || random6 == random5){
            random6 = Math.floor(Math.random() * 52);
        }
        var card6 = deck[random6];
        dealt_cards[5] = card6;
        //choose random7
        var random7 = Math.floor(Math.random() * 52);
        while(random7 == random1 || random7 == random2 || random7 == random3 || random7 == random4 || random7 == random5 || random7 == random6){
            random7 = Math.floor(Math.random() * 52);
        }
        var card7 = deck[random7];
        dealt_cards[6] = card7;
        //choose random8
        var random8 = Math.floor(Math.random() * 52);
        while(random8 == random1 || random8 == random2 || random8 == random3 || random8 == random4 || random8 == random5 || random8 == random6 || random8 == random7){
            random8 = Math.floor(Math.random() * 52);
        }
        var card8 = deck[random8];
        dealt_cards[7] = card8;
        //choose random9
        var random9 = Math.floor(Math.random() * 52);
        while(random9 == random1 || random9 == random2 || random9 == random3 || random9 == random4 || random9 == random5 || random9 == random6 || random9 == random7 || random8){
            random9 = Math.floor(Math.random() * 52);
        }
        var card9 = deck[random9];
        dealt_cards[8] = card9;
        //return dealt cards, as an array
        return dealt_cards;
    }
 
    render() {
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'center', height: "50%", margin: '50px'}}>
                    <img src={back} style={{height: "10em", margin: '10px'}}/>
                    <img src={back} style={{height: "10em", margin: '10px'}}/>
                </div>
 
                <div style={{display: 'flex', justifyContent: 'center', height: "50%", margin: '10px'}}>
                    { this.get_card_img(this.state.Ca1) }
                    { this.get_card_img(this.state.Ca2) }
                    { this.get_card_img(this.state.Ca3) }
                </div>
 
                <div style={{display: 'flex', justifyContent: 'center', height: "100%", margin: '50px'}}>
                    <img src={H6} style={{height: "10em", margin: '10px'}}/>
                    <img src={H7} style={{height: "10em", margin: '10px'}}/>
 
                    <div style={{display: 'flex', justifyContent: 'center', height: "100%", flexDirection: 'column'}}>
                        <button style={{margin: '7px', marginTop: '15px'}} onClick={this.login}>CHECK</button>
                        <button style={{margin: '7px'}} onClick={this.deal_to_players}>BET</button>
                        <button style={{margin: '7px'}} onClick={this.login}>RAISE</button>
                        <button style={{margin: '7px'}} onClick={this.login}>CALL</button>
                        <button style={{margin: '7px'}} onClick={this.login}>FOLD</button>
                    </div>
                </div>
   
            </div>
        )
    }
 
}
 
export default GamePage;