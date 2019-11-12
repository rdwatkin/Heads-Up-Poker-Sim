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


    /* Bind Functions to Namespace */
    constructor() {
        super()
        this.get_card_img = this.get_card_img.bind(this);
        this.state = {Ca1: "", Ca2: "", Ca3: "", Ca4: "", Ca5: "",
                      P1C1: "", P1C2: "", P2C1: "", P2C2: "", P1chips: "",
                      P2chips: "", pot: ""}
    }

    

    componentWillMount(){
        //Get Cards From Database
        fire.database().ref("/Root/GameID/").once('value', snapshot => {
            var currUser = fire.auth().currentUser.uid;
            var Car1 = snapshot.child("C1").val()
            var Car2 = snapshot.child("C2").val()
            var Car3 = snapshot.child("C3").val()
            var Car4 = snapshot.child("C4").val()
            var Car5 = snapshot.child("C5").val()
            var P1Ca1 = snapshot.child(currUser).child("C1").val()
            var P1Ca2 = snapshot.child(currUser).child("C2").val()
            //var Player1chips = 100;
            //var Player2chips = 100;
            /* Set State Variables */
            this.setState({
                Ca1: Car1,
                Ca2: Car2,
                Ca3: Car3,
                Ca4: Car4,
                Ca5: Car5,
                P1C1: P1Ca1,
                P1C2: P1Ca2,
                P1chips: 1000,
                P2chips: 1000,
                pot: 0,
            })
        })
    }

    upload_value_to_database(path, name, value){
        return function() {
            fire.database().ref(path).set({
                name: value
            });
        }
    }
 
    logout() {
        fire.auth().signOut();
    }

    get_card_img(card){
        if (card == ""){
            card = "back";
        }
        let imgsrc = images('./'+card+'.png');
        return <img src={imgsrc} style={{height: "10em", marginRight: '10px'}}/>;
    }



/*
    get_value(card){
        var val = card.slice(0, card.length);
        if(val == "1")
            return 14;
        else if(val == "J")
            return 11;
        else if(val == "Q")
            return 12;
        else if(val == "K")
            return 13;
        return parseInt(val);
    }

    get_suit(card){
        return  card.slice(card.length-1, card.length);
    }

    hand_check(){
        var hand = [Ca1, Ca2, Ca3, Ca4, Ca5, P1C1, P1C2];
        if(royal_flush_check(hand)){
            return "royal flush";
        }
    }

    royal_flush_check(current_cards){
        royals_check = false;
        same_suit_check = false
        sorted_hand = current_cards.sort(function(a, b) {return a-b;});
        if(get_value(sorted_hand[3]) == 10 && get_value(sorted_hand[4]) == 11 && get_value(sorted_hand[5]) == 12 && get_value(sorted_hand[6]) == 13 && get_value(sorted_hand[7]) == 14){
            royals_check = true;
        }
        if(get_suit(sorted_hand[3]) == get_suit(sorted_hand[4]) == get_suit(sorted_hand[5]) == get_suit(sorted_hand[6]) == get_suit(sorted_hand[7])){
            same_suit_check = true;
        } 
        if(royals_check == true && same_suit_check == true){
            return true;
        }
        else{
            return false;
        }
    }
*/

    //main, control action of the game: whos turn, pot size/winner, flips cards when needed
    game_control() {
        //initialize variables
        var gameover = false;
        var action_complete = false;
        var pot = 0;
        //var P1chips = 1000;
        //var P2chips = 1000;
        var smallblind = "start";
        var bigblind = "temp";
        //while niether player has 0 chips
        while (gameover == false) {
            //switch blinds
            if (smallblind == "P1"){
                smallblind = "P2";
            } else {
                smallblind = "P1";
            }
            //remove blinds from players: 25 for small blind, 50 for big blind
            if (smallblind == "P1"){
                this.state.P1chips -= 25;
                this.state.P2chips -= 50;
                //update on display
                
            } else {
                this.state.P1chips -= 50;
                this.state.P2chips -= 25;
                //update on display

            }
            //add blinds to the pot
            this.state.pot = 75;
            //update on display

            //show each player their cards, while having opponets flipped

//Pre Flop            
            while(action_complete == false){
                //Allow small blind to have action
            

                //Give Big blind action
                
            }
            //reset action_complete
            action_complete = false;


            //When action is complete, show flop to both players


//Flop            
            while(action_complete == false){
                //Allow small blind to have action
            
                //Give Big blind action
                
            }
            //reset action_complete
            action_complete = false;
            //when action is complete, show turn to both players

//Turn
            while(action_complete == false){
                //Allow small blind to have action
            

                //Give Big blind action
                
            }
            //reset action_complete
            action_complete = false;
            //when action is complete, show river to both players

            

//River
            while(action_complete == false){
                //Allow small blind to have action
            

                //Give Big blind action
                
            }
            //reset action_complete
            action_complete = false;
            //When action is complete, show both players cards, and award pot to winner. Reset


            //call function to determine winner


            //Determine if game is over
            if (this.state.P1chips == 0 || this.state.P2chips == 0){
                gameover = true;
            }
        }
        //game is over

    }

    render() {
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'center', height: "50%", margin: '50px'}}>
                    <h1 style={{textAlign: "center", margin: '30px', marginLeft: '210px'}}>
                        Opponent Stack<br/> {this.state.P2chips} </h1>
                    { this.get_card_img("back") }
                    { this.get_card_img("back") }
                </div>
 
                <div style={{display: 'flex', justifyContent: 'center', height: "50%", margin: '10px'}}>
                <h1 style={{textAlign: "center", margin: '30px'}}>Pot<br/> {this.state.pot}</h1>
                    { this.get_card_img(this.state.Ca1) }
                    { this.get_card_img(this.state.Ca2) }
                    { this.get_card_img(this.state.Ca3) }
                    { this.get_card_img(this.state.Ca4) }
                    { this.get_card_img(this.state.Ca5) }
                </div>
 
                <div style={{display: 'flex', justifyContent: 'center', height: "100%", margin: '50px'}}>
                    <h1 style={{textAlign: "center", margin: '30px', marginLeft: '300px'}}>
                        My Stack<br/> {this.state.P1chips} </h1>
                    { this.get_card_img(this.state.P1C1) }
                    { this.get_card_img(this.state.P1C2) }
 
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
