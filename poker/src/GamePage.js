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
                      P2chips: "", pot: "", currTurn: "", P1: "", P2: "", Me: "",
                      num_call: "", num_checks: "", where_in_game: "", cards_dealt: "" }
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
                num_call: 0,
                cards_dealt: this.deal_nine_cards,
                where_in_game: "start"
            }, this.begin_hand )
        })
    }


//------------------------------------Button Actions Below ---------------------------------------

    //for now, going to make it bet 50 by default
    bet(){
        //adjust chips and pot size
        if (this.state.currTurn == this.state.Me){
            this.state.P1chips -= 50;
            this.update_P1chips();
            this.state.pot += 50;
            this.update_pot();
        } else {
            this.state.P2chips -= 50;
            this.update_P2chips();
            this.state.pot += 50;
            this.update_pot();
        }
        //adjust turn
        this.update_turn();
    }

    //need to edit
    raise(){
        if (this.state.currTurn == this.state.Me){
            this.state.P1chips -= 150;
            this.update_P1chips();
            this.state.pot += 150;
            this.update_pot();
        } else {
            this.state.P2chips -= 150;
            this.update_P2chips();
            this.state.pot += 150;
            this.update_pot();
        }
        this.update_turn();
    }

    call(){
        if(this.state.where_in_game == "start"){
            //put chips in pot
            if (this.state.currTurn == this.state.Me){
                this.state.P1chips -= 50;
                this.update_P1chips();
                this.state.pot += 50;
                this.update_pot();
            } else {
                this.state.P2chips -= 50;
                this.update_P2chips();
                this.state.pot += 50;
                this.update_pot();
            }
            //show flop
            this.updateFlop()
            //update where_in game
            this.state.where_in_game = "flop";
            this.update_where_in_game();
        } else if(this.state.where_in_game == "flop"){
            //put chips in pot
            if (this.state.currTurn == this.state.Me){
                this.state.P1chips -= 50;
                this.update_P1chips();
                this.state.pot += 50;
                this.update_pot();
            } else {
                this.state.P2chips -= 50;
                this.update_P2chips();
                this.state.pot += 50;
                this.update_pot();
            }
            //show turn
            this.updateTurn()
            //update where_in game
            this.state.where_in_game = "turn";
            this.update_where_in_game();
        } else if (this.state.where_in_game == "turn"){
           //put chips in pot
           if (this.state.currTurn == this.state.Me){
                this.state.P1chips -= 50;
                this.update_P1chips();
                this.state.pot += 50;
                this.update_pot();
            } else {
                this.state.P2chips -= 50;
                this.update_P2chips();
                this.state.pot += 50;
                this.update_pot();
            }
            //show river
            this.updateRiver()
            //update where_in game
            this.state.where_in_game = "river";
            this.update_where_in_game();
        } else if (this.state.where_in_game == "river"){
            //compare hands

        }
        //reset num_checks
        this.state.num_checks = 0;
        this.update_num_checks();
        //update turn;
        this.update_turn();
    }

    check(){
        this.state.num_checks ++;
        this.update_num_checks();
        console.log(this.state.num_checks);
        if (this.state.num_checks == 2){
            if (this.state.where_in_game == "start"){
                console.log("wtf");
                //show flop
                this.updateFlop();
                console.log("test");
                //update where_in game
                this.state.where_in_game = "flop";
                this.update_where_in_game();
            } else if (this.state.where_in_game == "flop"){
                //show turn
                this.updateTurn();
                //update where_in game
                this.state.where_in_game = "turn";
                this.update_where_in_game();
            } else if (this.state.where_in_game == "turn"){
                //show river
                this.updateRiver()
                //update where_in game
                this.state.where_in_game = "river";
                this.update_where_in_game();
            } else if (this.state.where_in_game == "river"){
                //compare hands

            }

            //reset num_checks
            //this.state.num_checks = 0;
            this.update_num_checks();
        }
        this.update_turn();
    }

    fold(){
        //give pot to other player
        if (this.state.currTurn == this.state.Me){
            this.state.P1chips += this.state.pot;
            this.update_P1chips();
        } else {
            this.state.P2chips += this.state.pot;
            this.update_P2chips();
        }
        //reset pot
        this.state.pot = 0;
        this.update_pot();
        //end hand, flip cards. Will need to re deal
        this.state.Ca1 = "back";
        this.state.Ca2 = "back";
        this.state.Ca3 = "back";
        this.state.Ca4 = "back";
        this.state.Ca5 = "back";
        this.state.where_in_game = "end";
        this.update_where_in_game();
        this.update_turn();
    }

//------------------------------------Button Actions Above ---------------------------------------



//------------------------------------Data Base Control Below ---------------------------------------


    update_where_in_game(){
        fire.database().ref("/Root/GameID/where_in_game").update({
           where_in_game: this.state.where_in_game
        })
        fire.database().ref()
    }

    update_num_checks(){
        fire.database().ref("/Root/GameID/num_checks").update({
            num_checks: this.state.num_checks
        })
        fire.database().ref()
    }

    update_num_call(){
        fire.database().ref("/Root/GameID/num_call").update({
            num_call: this.state.num_call
        })
        fire.database().ref()
    }

    update_pot(){
        fire.database().ref("/Root/GameID/pot").update({
            pot: this.state.pot
        })
        fire.database().ref()
    }

    update_P1chips(P1chips){
        fire.database().ref("/Root/GameID/P1chips").update({
            P1chips: this.state.P1chips
        })
        fire.database().ref()
    }

    update_P2chips(){
        fire.database().ref("/Root/GameID/P2chips").update({
            P2chips: this.state.P2chips
        })
        fire.database().ref()
    }

    upload_turn(){
        var whos_turn = "Player 1";
        fire.database().ref("/Root/GameID/turn").set({
            currTurn: whos_turn
        })
        fire.database().ref()
    }

    update_turn(){
        //update values from firebase
        fire.database().ref("/Root/GameID/").on('value', snapshot => {
            var P2Chips = snapshot.child("P2chips").child("P2chips").val()
            var P1Chips = snapshot.child("P1chips").child("P1chips").val()
            var where = snapshot.child("where_in_game").child("where_in_game").val()
            var sPOT = snapshot.child("pot").child("pot").val()
            var ncall = snapshot.child("num_call").child("num_call").val()
            var nchecks = snapshot.child("num_checks").child("num_checks").val()
                this.setState({
                    P2chips: P2Chips,
                    P1chips: P1Chips,
                    where_in_game: where,
                    pot: sPOT,
                    num_call: ncall,
                    num_checks: nchecks
                })
        })
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

        
        /*
        //hide buttons when not your turn
        if (this.state.Me != this.state.currTurn){
            document.getElementById('Check').style.visibility='hidden';
            document.getElementById('Bet').style.visibility='hidden';
            document.getElementById('Call').style.visibility='hidden';
            document.getElementById('Raise').style.visibility='hidden';
            document.getElementById('Fold').style.visibility='hidden';
        //show buttons when your turn
        } else {
            document.getElementById('Check').style.visibility='visible';
            document.getElementById('Bet').style.visibility='visible';
            document.getElementById('Call').style.visibility='visible';
            document.getElementById('Raise').style.visibility='visible';
            document.getElementById('Fold').style.visibility='visible';
        }
        */
        
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

//------------------------------------Data Base Control Above ---------------------------------------



//------------------------------------Hand Comparisons Below ---------------------------------------
    
    updateFlop(){
        fire.database().ref("/Root/GameID/").set({
                C1: this.state.cards_dealt[0],
                C2: this.state.cards_dealt[1],
                C3: this.state.cards_dealt[2],
        })
    }

    updateTurn(){
        fire.database().ref("/Root/GameID/").set({
                C4: this.state.cards_dealt[3]
        })
    }

    updateRiver(){
        fire.database().ref("/Root/GameID/").set({
                C5: this.state.cards_dealt[4]
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

//------------------------------------Hand Comparisons Above ---------------------------------------



begin_hand(){
    var smallblind = "start";
    //show back of all cards at the begginning of the hand
    this.state.Ca1 = "back";
    this.state.Ca2 = "back";
    this.state.Ca3 = "back";
    this.state.Ca4 = "back";
    this.state.Ca5 = "back";
    this.state.where_in_game = "start";
    this.update_where_in_game();
    this.state.num_checks = 0;
    this.update_num_checks();
    this.state.num_call = 0;
    this.update_num_call();
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
        this.update_P1chips();
        this.state.P2chips -= 50;
        this.update_P2chips();
    } else {
        //update on display
        this.state.P1chips -= 50;
        this.update_P1chips();
        this.state.P2chips -= 25;
        this.update_P2chips();
    }
    //add blinds to the pot
    this.state.pot = 75;
    this.update_pot();
    //update values from firebase
    fire.database().ref("/Root/GameID/").on('value', snapshot => {
        var P2Chips = snapshot.child("P2chips").child("P2chips").val()
        var P1Chips = snapshot.child("P1chips").child("P1chips").val()
        var where = snapshot.child("where_in_game").child("where_in_game").val()
        var sPOT = snapshot.child("pot").child("pot").val()
        var ncall = snapshot.child("num_call").child("num_call").val()
        var nchecks = snapshot.child("num_checks").child("num_checks").val()
        var Nturn = snapshot.child("turn").child("currTurn").val()
        var Car1 = snapshot.child("C1").val()
        var Car2 = snapshot.child("C2").val()
        var Car3 = snapshot.child("C3").val()
        var Car4 = snapshot.child("C4").val()
        var Car5 = snapshot.child("C5").val()
        
            this.setState({
                Ca1: Car1,
                Ca2: Car2,
                Ca3: Car3,
                Ca4: Car4,
                Ca5: Car5,
                P2chips: P2Chips,
                P1chips: P1Chips,
                where_in_game: where,
                pot: sPOT,
                num_call: ncall,
                num_checks: nchecks,
                currTurn: Nturn
            })
    })    
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
                        <button id ="Check" style={{margin: '7px', marginTop: '15px'}} onClick={() => {this.check()}}>CHECK</button>
                        <button id ="Bet" style={{margin: '7px'}} onClick={() => {this.bet()}}>BET</button>
                        <button id = "Raise" style={{margin: '7px'}} onClick={() => {this.raise()}}>RAISE</button>
                        <button id = "Call" style={{margin: '7px'}} onClick={() => {this.call()}}>CALL</button>
                        <button id = "Fold" style={{margin: '7px'}} onClick={() => {this.fold()}}>FOLD</button>
                    </div>
                </div>
   
            </div>
        )
    }
}
 
export default GamePage;
