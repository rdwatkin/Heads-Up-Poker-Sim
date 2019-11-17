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
                      P2chips: "", pot: "", currTurn: "", P1: "", P2: "", Me: "" }
    }

    

    componentWillMount(){
        this.upload_turn();
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
            var Player1 = snapshot.child("Player1").val();
            var Player2 = snapshot.child("Player2").val();
            var Fturn = snapshot.child("turn").child("currTurn").val()
            var whoAmI = "";
            if (currUser == Player1){
                whoAmI = "Player1"
            }else{
                whoAmI = "Player2"
            }

            /* Set State Variables */
            this.setState({
                Ca1: Car1,
                Ca2: Car2,
                Ca3: Car3,
                Ca4: Car4,
                Ca5: Car5,
                P1C1: P1Ca1,
                P1C2: P1Ca2,
                P1: Player1,
                P2: Player2,
                P1chips: 1000,
                P2chips: 1000,
                pot: 0,
                currTurn: Fturn,
                Me: whoAmI,
                num_checks: 0,
                num_call: 0
            }, this.game_control )
        })
    }

    //for now, going to make it bet 50 by default
    bet(){
        //adjust chips and pot size
        if (this.state.currTurn == this.state.Me){
            this.state.P1chips -= 50;
            this.state.pot += 50;
        } else {
            this.state.P2chips -= 50;
            this.state.pot += 50;
        }
        //adjust turn
        this.update_turn();
    }

    call(){
        if (this.state.currTurn == this.state.Me){
            this.state.P1chips -= 50;
            this.state.pot += 50;
        } else {
            this.state.P2chips -= 50;
            this.state.pot += 50;
        }
        this.state.num_call ++;
        this.update_turn();
    }

    raise(){
        if (this.state.currTurn == this.state.Me){
            this.state.P1chips -= 50;
            this.state.pot += 50;
        } else {
            this.state.P2chips -= 50;
            this.state.pot += 50;
        }
        this.update_turn();
    }

    check(){
        this.state.num_checks ++;
        this.update_turn();
    }

    fold(){
        //end hand

        //temp
        this.update_turn();
    }


    upload_turn(){
        var whos_turn = "Player 1";
        fire.database().ref("/Root/GameID/turn").set({
            currTurn: whos_turn
        })
        fire.database().ref()
    }

    update_turn(){
        var turn = this.state.currTurn;
        if(turn == "Player 1"){
            var newTurn = "Player 2";
            fire.database().ref("/Root/GameID/turn").update({
                currTurn: newTurn
            })
            fire.database().ref()
            this.setState({
                currTurn: newTurn
            })
        }
        else{
            var newTurn = "Player 1";
            fire.database().ref("/Root/GameID/turn").update({
                currTurn: newTurn
            })
            fire.database().ref()
            this.setState({
                currTurn: newTurn
            })
        }
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
        var hand = [this.state.Ca1, this.state.Ca2, this.state.Ca3, this.state.Ca4, this.state.Ca5, this.state.P1C1, this.state.P1C2];
        if(this.royal_flush_check(hand)){
            return "royal flush";
        }
    }

    royal_flush_check(current_cards){
        var royals_check = false;
        var same_suit_check = false
        var sorted_hand = current_cards.sort(function(a, b) {return a-b;});
        if(this.get_value(sorted_hand[2]) == 10 && this.get_value(sorted_hand[3]) == 11 && this.get_value(sorted_hand[4]) == 12 && this.get_value(sorted_hand[5]) == 13 && this.get_value(sorted_hand[6]) == 14){
            royals_check = true;
        }
        if(this.get_suit(sorted_hand[2]) == this.get_suit(sorted_hand[3]) == this.get_suit(sorted_hand[4]) == this.get_suit(sorted_hand[5]) == this.get_suit(sorted_hand[6])){
            same_suit_check = true;
        } 
        if(royals_check == true && same_suit_check == true){
            return true;
        }
        else{
            return false;
        }
    }


    full_house_check(current_cards){
        var reverse_sorted_hand = current_cards.sort(function(a, b) {return b-a;}); //Reverse sort to find the highest triple/pair first
        var triple_check = false;
        var pair_check = false;
        var triple_count = 0;
        var triple_value = 0;
        var double_count = 0;
        var double_value = 0;
        var temp = 0;
        //Check for the highest triple
        for(var i = 0; i < 7; i++){
            if(temp == this.get_value(reverse_sorted_hand[i])){
                triple_count++;
                if(triple_count == 3){
                    triple_check = true;
                    triple_value = this.get_value(reverse_sorted_hand[i])
                    break;
                }
            }
            else{
                temp = this.get_value(reverse_sorted_hand[i]);
                triple_count = 1;
            }
        }
        if(triple_check = false){
            return [0,0];
        }
        //Check for the highest double, make sure not to count the triple cards though
        temp = 0;
        for(var i = 0; i < 7; i++){
            if(temp == this.get_value(reverse_sorted_hand[i])){
                double_count++;
                if(double_count == 2){
                    if(this.get_value(reverse_sorted_hand[i] == triple_value)){
                        double_count = 1;
                        i++;
                    }
                    else{
                        pair_check = true;
                        double_value = this.get_value(reverse_sorted_hand[i])
                        break;
                    }
                }
            }
            else{
                this.temp = this.get_value(reverse_sorted_hand[i]);
                double_count = 1;
            }

        }
        if(pair_check = false){
            return [0,0]
        }
        return [triple_value, double_value];
    }







    sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
      }


    //main, control action of the game: whos turn, pot size/winner, flips cards when needed
    game_control() {
        //initialize variables
        var gameover = false;
        var action_complete = false;
        var smallblind = "start";
        //while niether player has 0 chips
        while (gameover == false) {
            //show back of all cards at the begginning of the hand
            this.state.Ca1 = "back";
            this.state.Ca2 = "back";
            this.state.Ca3 = "back";
            this.state.Ca4 = "back";
            this.state.Ca5 = "back";
            this.state.num_checks = 0;
            this.state.num_call = 0;
            //switch blinds
            if (smallblind == "P1"){
                smallblind = "P2";
            } else {
                smallblind = "P1";
            }
            //remove blinds from players: 25 for small blind, 50 for big blind
            if (smallblind == "P1"){
                //update on display
                this.state.P1chips -= 25;
                this.state.P2chips -= 50;
            } else {
                //update on display
                this.state.P1chips -= 50;
                this.state.P2chips -= 25;
            }
            //add blinds to the pot
            this.state.pot = 75;
            //show each player their cards, while having opponets flipped
//Pre Flop            
            while(action_complete == false){
                //when there are two checks
                if (this.state.num_checks == 2){
                    action_complete = true;
                }
                //when there is a call
                if (this.state.num_call == 1){
                    action_complete = true;
                }
                //when there is a fold
            }
            //reset action_complete and num_call/checks
            action_complete = false;
            this.state.num_call = 0;
            this.state.num_checks = 0;
            //When action is complete, show flop to both players
            fire.database().ref("/Root/GameID/").once('value', snapshot => {
                var Car1 = snapshot.child("C1").val()
                var Car2 = snapshot.child("C2").val()
                var Car3 = snapshot.child("C3").val()
                    this.setState({
                        Ca1: Car1,
                        Ca2: Car2,
                        Ca3: Car3
                    })
            })
//Flop            
            while(action_complete == false){
                //when there are two checks
                if (this.state.num_checks == 2){
                    action_complete = true;
                }
                //when there is a call
                if (this.state.num_call == 1){
                    action_complete = true;
                }
                //when there is a fold
            }
            //reset action_complete
            action_complete = false;
            this.state.num_call = 0;
            this.state.num_checks = 0;
            //when action is complete, show turn to both players
            fire.database().ref("/Root/GameID/").once('value', snapshot => {
                var Car4 = snapshot.child("C4").val()
                    this.setState({
                        Ca4: Car4
                    })
            })
//Turn
            while(action_complete == false){
                //when there are two checks
                if (this.state.num_checks == 2){
                    action_complete = true;
                }
                //when there is a call
                if (this.state.num_call == 1){
                    action_complete = true;
                }
                //when there is a fold
            }
            //reset action_complete
            action_complete = false;
            this.state.num_call = 0;
            this.state.num_checks = 0;
            //when action is complete, show river to both players
            fire.database().ref("/Root/GameID/").once('value', snapshot => {
                var Car5 = snapshot.child("C5").val()
                    this.setState({
                        Ca5: Car5
                    })
            })
//River
            while(action_complete == false){
                //when there are two checks
                if (this.state.num_checks == 2){
                    action_complete = true;
                }
                //when there is a call
                if (this.state.num_call == 1){
                    action_complete = true;
                }
                //when there is a fold
            }
            //reset action_complete
            action_complete = false;
            this.state.num_call = 0;
            this.state.num_checks = 0;
            //When action is complete, show both players cards, and award pot to winner. Reset


            //call function to determine winner


            //Determine if game is over
            if (this.state.P1chips <= 0 || this.state.P2chips <= 0){
                gameover = true;
            }
            gameover = true;
        }
        //game is over

    }
















    render() {
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'center', height: "50%", margin: '50px'}}>
                    <h1><u>It is {this.state.currTurn}'s turn</u></h1>
                </div>
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
                        <button style={{margin: '7px', marginTop: '15px'}} onClick={() => {this.check()}}>CHECK</button>
                        <button style={{margin: '7px'}} onClick={() => {this.bet()}}>BET</button>
                        <button style={{margin: '7px'}} onClick={() => {this.raise()}}>RAISE</button>
                        <button style={{margin: '7px'}} onClick={() => {this.call()}}>CALL</button>
                        <button style={{margin: '7px'}} onClick={() => {this.fold()}}>FOLD</button>
                    </div>
                </div>
   
            </div>
        )
    }
}
 
export default GamePage;
