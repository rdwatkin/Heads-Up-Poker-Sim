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
                      num_call: "", num_checks: "", where_in_game: "", P1email: "", 
                      P2email: "", Turn_Email: "", smallblind: "", cur_bet: ""}
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
            var PoneEmail = snapshot.child("Player1_Email").child("email").val()
            var PtwoEmail = snapshot.child("Player2_Email").child("email").val()
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
                P1email: PoneEmail,
                P2email: PtwoEmail,
                Turn_Email: PoneEmail,
                smallblind: "Begin",
                cards_dealt: this.deal_nine_cards(),
                where_in_game: "start",
                cur_bet: 0
            }, this.begin_hand )
        })
    }



//------------------------------------Button Actions Below ---------------------------------------

    //for now, going to make it bet 50 by default
    bet(){
        var amount = document.getElementById("Bet_amount").value;
        amount = parseInt(amount);
        this.state.cur_bet = amount;
        fire.database().ref("/Root/GameID/").update({
            cur_bet: amount
        })
        /*
        if (this.state.cur_bet == 0){
            document.getElementById('bet amount').style.visibility='hidden';
            document.getElementById('Fold').style.visibility='hidden';
            document.getElementById('Raise').style.visibility='hidden';
        } else {
            document.getElementById('bet amount').style.visibility='visible';
            document.getElementById('Fold').style.visibility='visible';
            document.getElementById('Raise').style.visibility='visible';
        }
        */
        //adjust chips and pot size
        if (this.state.currTurn == "Player1"){
            this.state.P1chips -= amount;
            this.update_P1chips();
            this.state.pot += amount;
            this.update_pot();
        } else {
            this.state.P2chips -= amount;
            this.update_P2chips();
            this.state.pot += amount;
            this.update_pot();
        }
        //adjust turn
        this.update_turn();
    }

    //need to edit
    raise(){
        var amount = document.getElementById("Raise_amount").value;
        amount = parseInt(amount);
        fire.database().ref("/Root/GameID/").update({
            cur_bet: amount - this.state.cur_bet
        })
        /*
        if (this.state.cur_bet == 0){
            document.getElementById('bet amount').style.visibility='hidden';
            document.getElementById('Fold').style.visibility='hidden';
            document.getElementById('Raise').style.visibility='hidden';
        } else {
            document.getElementById('bet amount').style.visibility='visible';
            document.getElementById('Fold').style.visibility='visible';
            document.getElementById('Raise').style.visibility='visible';
        }
        */
        if (this.state.currTurn == "Player1"){
            this.state.P1chips -= amount;
            this.update_P1chips();
            this.state.pot += amount;
            this.update_pot();
        } else {
            this.state.P2chips -= amount;
            this.update_P2chips();
            this.state.pot += amount
            this.update_pot();
        }
        this.update_turn();
    }

    call(){
        //put chips in pot
        if (this.state.currTurn == "Player1"){
            this.state.P1chips -= this.state.cur_bet;
            this.update_P1chips();
            this.state.pot += this.state.cur_bet;
            this.update_pot();
        } else {
            this.state.P2chips -= this.state.cur_bet;
            this.update_P2chips();
            this.state.pot += this.state.cur_bet;
            this.update_pot();
        }
        if(this.state.where_in_game == "start"){
            //show flop
            this.updateFlop()
            //update where_in game
            this.state.where_in_game = "flop";
            this.update_where_in_game();
        } else if(this.state.where_in_game == "flop"){
            //show turn
            this.updateTurn()
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
            //var winner = "temp";
            //kenneth, can you call your function to determine a winner and have it return Player 1 or 2
            //winner = kenneth_function()
            var p1_hand = this.hand_check(this.state.cards_dealt[5], this.state.cards_dealt[6]);
            var p2_hand = this.hand_check(this.state.cards_dealt[7], this.state.cards_dealt[8]);
            var winner = this.hand_compare(p1_hand, p2_hand);
            //give winner chips
            //if player 1 won
            if (winner == 1){
                this.state.P1chips += this.state.pot;
                this.update_P1chips();
            //if player 2 won
            } else if (winner == 2){
                this.state.P2chips += this.state.pot;
                this.update_P2chips();
            //if a tie
            } else {
                //split the pot
                this.state.P1chips += this.state.pot/2;
                this.update_P1chips();
                this.state.P2chips += this.state.pot/2;
                this.update_P2chips();
            }
            this.state.pot = 0;
            this.update_pot();
            fire.database().ref("/Root/GameID/").once('value', snapshot => {
                /* Set State Variables */
                this.setState({
                    cards_dealt: this.deal_nine_cards(),
                    where_in_game: "start"
                }, this.begin_hand )
            })
        }
        //reset num_checks
        this.state.num_checks = 0;
        this.update_num_checks();
        //update turn;
        this.update_turn();
        this.state.cur_bet = 0;
        fire.database().ref("/Root/GameID/").update({
            cur_bet: 0
        })
        /*
        if (this.state.cur_bet == 0){
            document.getElementById('bet amount').style.visibility='hidden';
            document.getElementById('Fold').style.visibility='hidden';
            document.getElementById('Raise').style.visibility='hidden';
        } else {
            document.getElementById('bet amount').style.visibility='visible';
            document.getElementById('Fold').style.visibility='visible';
            document.getElementById('Raise').style.visibility='visible';
        }
        */
    }

    check(){
        this.state.num_checks ++;
        this.update_num_checks();
        if (this.state.num_checks == 2){
            if (this.state.where_in_game == "start"){
                //show flop
                this.updateFlop();
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
                //kenneth, can you call your function to determine a winner and have it return Player 1 or 2
                //winner = kenneth_function()
                var p1_hand = this.hand_check(this.state.cards_dealt[5], this.state.cards_dealt[6]);
                var p2_hand = this.hand_check(this.state.cards_dealt[7], this.state.cards_dealt[8]);
                var winner = this.hand_compare(p1_hand, p2_hand);
                //give winner chips
                //if player 1 won
                if (winner == 1){
                    this.state.P1chips += this.state.pot;
                    this.update_P1chips();
                //if player 2 won
                } else if (winner == 2){
                    this.state.P2chips += this.state.pot;
                    this.update_P2chips();
                //if a tie
                } else {
                    //split the pot
                    this.state.P1chips += this.state.pot/2;
                    this.update_P1chips();
                    this.state.P2chips += this.state.pot/2;
                    this.update_P2chips();
                }
                this.state.pot = 0;
                this.update_pot();
                fire.database().ref("/Root/GameID/").once('value', snapshot => {
                    /* Set State Variables */
                    this.setState({
                        cards_dealt: this.deal_nine_cards(),
                        where_in_game: "start"
                    }, this.begin_hand )
                })
            }
            //reset num_checks
            this.state.num_checks = 0;
            this.update_num_checks();
        }
        this.update_turn();
    }

    fold(){
        //give pot to other player
        if (this.state.currTurn == "Player2"){
            this.state.P1chips += this.state.pot;
            this.update_P1chips();
        } else {
            this.state.P2chips += this.state.pot;
            this.update_P2chips();
        }
        this.state.cur_bet = 0;
        fire.database().ref("/Root/GameID/").update({
            cur_bet: 0
        })
        /*
        if (this.state.cur_bet == 0){
            document.getElementById('bet amount').style.visibility='hidden';
            document.getElementById('Fold').style.visibility='hidden';
            document.getElementById('Raise').style.visibility='hidden';
        } else {
            document.getElementById('bet amount').style.visibility='visible';
            document.getElementById('Fold').style.visibility='visible';
            document.getElementById('Raise').style.visibility='visible';
        }
        */
        fire.database().ref("/Root/GameID/").once('value', snapshot => {
            /* Set State Variables */
            this.setState({
                cards_dealt: this.deal_nine_cards(),
                where_in_game: "start"
            }, this.begin_hand )
        })
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
        fire.database().ref("/Root/GameID/").update({
            pot: this.state.pot
        })
        fire.database().ref()
    }

    update_P1chips(){
        fire.database().ref("/Root/GameID/").update({
            P1chips: this.state.P1chips
        })
        fire.database().ref()
    }

    update_P2chips(){
        fire.database().ref("/Root/GameID/").update({
            P2chips: this.state.P2chips
        })
        fire.database().ref()
    }

    upload_turn(){
        var whos_turn = "Player1";
        fire.database().ref("/Root/GameID/turn").set({
            currTurn: whos_turn
        })
        fire.database().ref()
    }

    update_turn(){
        var turn = this.state.currTurn;
        var P1 = this.state.P1email;
        var P2 = this.state.P2email;
        if(turn == "Player1"){
            var newTurn = "Player2";
            fire.database().ref("/Root/GameID/turn").update({
                currTurn: newTurn
            })
            fire.database().ref()
            this.setState({
                currTurn: newTurn,
                Turn_Email: P2
            })
        }
        else{
            var newTurn = "Player1";
            fire.database().ref("/Root/GameID/turn").update({
                currTurn: newTurn
            })
            fire.database().ref()
            this.setState({
                currTurn: newTurn,
                Turn_Email: P1
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

    resetBoard(){
        fire.database().ref("/Root/GameID/").update({
            Player1: this.state.P1,
            Player2: this.state.P2,
            C1: "back",
            C2: "back",
            C3: "back",
            C4: "back",
            C5: "back"
        })
        fire.database().ref("/Root/GameID/"+this.state.P1).set({
            C1: "back",
            C2: "back"
        });
        fire.database().ref("/Root/GameID/"+this.state.P2).set({
            C1: "back",
            C2: "back"
        });
    }

    dealPlayers(){
        fire.database().ref("/Root/GameID/" + this.state.P1).update({
            C1: this.state.cards_dealt[5],
            C2: this.state.cards_dealt[6]
    })
        fire.database().ref("/Root/GameID/" + this.state.P2).update({
            C1: this.state.cards_dealt[7],
            C2: this.state.cards_dealt[8]
    })
    }

    updateFlop(){
        //set current turn to small blind
        var P1 = this.state.P1email;
        var P2 = this.state.P2email;
        var SB = this.state.smallblind;
        if(SB == "P2"){
            var newTurn = "Player2";
            fire.database().ref("/Root/GameID/turn").update({
                currTurn: newTurn
            })
            fire.database().ref()
            this.setState({
                currTurn: newTurn,
                Turn_Email: P2
            })
        }
        else{
            var newTurn = "Player1";
            fire.database().ref("/Root/GameID/turn").update({
                currTurn: newTurn
            })
            fire.database().ref()
            this.setState({
                currTurn: newTurn,
                Turn_Email: P1
            })
        }
        fire.database().ref("/Root/GameID/").update({
                C1: this.state.cards_dealt[0],
                C2: this.state.cards_dealt[1],
                C3: this.state.cards_dealt[2],
                C4: "back",
                C5: "back",
                pot: this.state.pot,
                P1chips: this.state.P1chips,
                P2chips: this.state.P2chips
        })
        fire.database().ref("/Root/GameID/" + this.state.P1).set({
            C1: this.state.cards_dealt[5],
            C2: this.state.cards_dealt[6]
         })
        fire.database().ref("/Root/GameID/" + this.state.P2).set({
            C1: this.state.cards_dealt[7],
            C2: this.state.cards_dealt[8]
         })
    }

    updateTurn(){
        //set current turn to small blind
        var P1 = this.state.P1email;
        var P2 = this.state.P2email;
        var SB = this.state.smallblind;
        if(SB == "P2"){
            var newTurn = "Player2";
            fire.database().ref("/Root/GameID/turn").update({
                currTurn: newTurn
            })
            fire.database().ref()
            this.setState({
                currTurn: newTurn,
                Turn_Email: P2
            })
        }
        else{
            var newTurn = "Player1";
            fire.database().ref("/Root/GameID/turn").update({
                currTurn: newTurn
            })
            fire.database().ref()
            this.setState({
                currTurn: newTurn,
                Turn_Email: P1
            })
        }
        fire.database().ref("/Root/GameID/").update({
            C1: this.state.cards_dealt[0],
            C2: this.state.cards_dealt[1],
            C3: this.state.cards_dealt[2],
            C4: this.state.cards_dealt[3],
            C5: "back",
            pot: this.state.pot,
            P1chips: this.state.P1chips,
            P2chips: this.state.P2chips
        })
        fire.database().ref("/Root/GameID/" + this.state.P1).set({
            C1: this.state.cards_dealt[5],
            C2: this.state.cards_dealt[6]
         })
        fire.database().ref("/Root/GameID/" + this.state.P2).set({
            C1: this.state.cards_dealt[7],
            C2: this.state.cards_dealt[8]
        })
    }

    updateRiver(){
        //set current turn to small blind
        var P1 = this.state.P1email;
        var P2 = this.state.P2email;
        var SB = this.state.smallblind;
        if(SB == "P2"){
            var newTurn = "Player2";
            fire.database().ref("/Root/GameID/turn").update({
                currTurn: newTurn
            })
            fire.database().ref()
            this.setState({
                currTurn: newTurn,
                Turn_Email: P2
            })
        }
        else{
            var newTurn = "Player1";
            fire.database().ref("/Root/GameID/turn").update({
                currTurn: newTurn
            })
            fire.database().ref()
            this.setState({
                currTurn: newTurn,
                Turn_Email: P1
            })
        }
        fire.database().ref("/Root/GameID/").update({
            C1: this.state.cards_dealt[0],
            C2: this.state.cards_dealt[1],
            C3: this.state.cards_dealt[2],
            C4: this.state.cards_dealt[3],
            C5: this.state.cards_dealt[4],
            pot: this.state.pot,
            P1chips: this.state.P1chips,
            P2chips: this.state.P2chips
        })
        fire.database().ref("/Root/GameID/" + this.state.P1).set({
            C1: this.state.cards_dealt[5],
            C2: this.state.cards_dealt[6]
         })
        fire.database().ref("/Root/GameID/" + this.state.P2).set({
            C1: this.state.cards_dealt[7],
            C2: this.state.cards_dealt[8]
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

//------------------------------------Data Base Control Above ---------------------------------------



//------------------------------------Hand Comparisons Below ---------------------------------------

    get_value(card){
        var val = card.slice(0, card.length-1);
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

    hand_check(card1, card2){
        var hand = [this.state.Ca1, this.state.Ca2, this.state.Ca3, this.state.Ca4, this.state.Ca5, card1, card2];
        var return_array = [];
        //console.log(this.get_value(card1));
        return_array = this.royal_flush_check(hand);
        if(return_array[0] == 9){
            return return_array;
        }
        console.log("no royal flush");
        return_array = this.straight_flush_check(hand);
        if(return_array[0] == 8){
            return return_array;
        }
        console.log("no straight flush");
        return_array = this.four_kind_check(hand);
        if(return_array[0] == 7){
            console.log(return_array[1]);
            return return_array;
        }
        console.log("no four of a kind");
        return_array = this.full_house_check(hand);
        if(return_array[0] == 6){
            return return_array;
        }
        console.log("no full house");
        return_array = this.flush_check(hand);
        if(return_array[0] == 5){
            return return_array;
        }
        console.log("no flush");
        return_array = this.straight_check(hand);
        if(return_array[0] == 4){
            return return_array;
        }
        console.log("no straihgt");
        return_array = this.triple_check(hand);
        if(return_array[0] == 3){
            return return_array;
        }
        console.log("no triple");
        return_array = this.double_pair_check(hand);
        if(return_array[0] == 2){
            return return_array;
        }
        console.log("no double pair");
        return_array = this.pair_check(hand);
        if(return_array[0] == 1){
            return return_array;
        }
        console.log("no pair");
        var largest_card = 0;
        for(var i = 5; i < 7; i++){
            if(this.get_value(hand[i]) > largest_card){
                largest_card = this.get_value(hand[i]);
            }
        }
        //console.log(largest_card);
        return [0, largest_card];

    }

    hand_compare(hand1, hand2){
        if(hand1[0] > hand2[0]){
            return 1;
        }
        else if(hand1[0] < hand2[0]){
            return 2;
        }
        else{
            if(hand1[0] == 9){
                return 3;
            }
            else if(hand1[0] == 8){
                if(hand1[1] > hand2[1]){
                    return 1;
                }
                else if(hand1[1] < hand2[1]){
                    return 2;
                }
                else{
                    return 3;
                }
            }
            else if(hand1[0] == 7){
                if(hand1[1] > hand2[1]){
                    return 1;
                } 
                else if(hand1[1] < hand2[1]){
                    return 2;
                }
                else{
                    return 3;
                }
            }
            else if(hand1[0] == 6){
                if(hand1[1] > hand2[1]){
                    return 1;
                }
                else if(hand1[1] < hand2[1]){
                    return 2;
                }
                else{
                    if(hand1[2] > hand2[2]){
                        return 1;
                    }
                    else if(hand1[2] < hand2[2]){
                        return 2;
                    }
                    else{
                        return 3;
                    }
                }
            }
            else if(hand1[0] == 5){
                return 3;
            }
            else if(hand1[0] == 4){
                if (hand1[1] > hand2[1]){
                    return 1;
                }
                else if(hand1[1] < hand2[1]){
                    return 2;
                }
                else{
                    return 3;
                }
            }
            else if(hand1[0] == 3){
                if (hand1[1] > hand2[1]){
                    return 1;
                }
                else if(hand1[1] < hand2[1]){
                    return 2;
                }
                else{
                    return 3;
                }
            }
            else if(hand1[0] == 2){
                if (hand1[1] > hand2[1]){
                    return 1;
                }
                else if(hand1[1] < hand2[1]){
                    return 2;
                }
                else{
                    if (hand1[2] > hand2[2]){
                        return 1;
                    }
                    else if(hand1[2] < hand2[2]){
                        return 2;
                    }
                    else{
                        return 3;
                    }

                }

            }
            else if(hand1[0] == 1){
                if (hand1[1] > hand2[1]){
                    return 1;
                }
                else if(hand1[1] < hand2[1]){
                    return 2;
                }
                else{
                    return 3;
                }
            }
            else{
                if (hand1[1] > hand2[1]){
                    return 1;
                }
                else if(hand1[1] < hand2[1]){
                    return 2;
                }
                else{
                    return 3;
                }

            }
        }
    }

    royal_flush_check(current_cards){
        var royals_check = false;
        var same_suit_check = false;
        var sorted_hand_values_temp = [];
        var sorted_hand_suits_temp = [];
        for(var i = 0; i < 7; i++){
            sorted_hand_values_temp[i] = this.get_value(current_cards[i]);
        }
        for(var i = 0; i < 7; i++){
            sorted_hand_suits_temp[i] = this.get_suit(current_cards[i]);
        }
        var list = [];
        for(var j = 0; j < 7; j++){
            list.push({'value': sorted_hand_values_temp[i], 'suit': sorted_hand_suits_temp[i]});
        }
        var sorted_hand = list.sort(function(a, b) {return a.value - b.value});
        if(sorted_hand[2].value == 10 && sorted_hand[3].value == 11 && sorted_hand[4].value == 12 && sorted_hand[5].value == 13 && sorted_hand[6].value == 14){
            royals_check = true;
        }
        if(sorted_hand[2].suit == sorted_hand[3].suit == sorted_hand[4].suit == sorted_hand[5].suit == sorted_hand[6].suit){
            same_suit_check = true;
        } 
        if(royals_check == true && same_suit_check == true){
            return [9];
        }
        else{
            return [0];
        }
    }

    straight_flush_check(current_cards){
        var sorted_hand_values_temp = [];
        var sorted_hand_suits_temp = [];
        for(var i = 0; i < 7; i++){
            sorted_hand_values_temp[i] = this.get_value(current_cards[i]);
        }
        for(var i = 0; i < 7; i++){
            sorted_hand_suits_temp[i] = this.get_suit(current_cards[i]);
        }
        var list = [];
        for(var j = 0; j < 7; j++){
            list.push({'value': sorted_hand_values_temp[i], 'suit': sorted_hand_suits_temp[i]});
        }
        var sorted_hand = list.sort(function(a, b) {return a.value - b.value});

        var straight_count = 1;
        var highest_card_value = sorted_hand[0].value;
        var highest_card_suit = sorted_hand[0].suit;
        var temp = highest_card_value;
        for(var i = 0; i < 7; i++){
            if(i != 6){
                if((sorted_hand[i+1].value == temp - 1) && (sorted_hand[i+1].suit == highest_card_suit)){
                    straight_count++; 
                    temp--;
                } 
                else{
                    straight_count = 1;
                    highest_card_value = sorted_hand[i+1].value;
                    highest_card_suit = sorted_hand[i+1].suit;
                    temp = highest_card_value;
                }
            }
        }
        if(straight_count >= 5){
            return [8, highest_card_value];
        }
        if(sorted_hand[0].value == 14){
            highest_card_value = 5;
            highest_card_suit = sorted_hand[0].suit;
            temp = highest_card_value;
            straight_count = 1;
            for(var i = 3; i < 7; i++){
                if(i != 6){
                    if((sorted_hand[i+1].value == temp - 1) && (highest_card_suit == sorted_hand[i+1].suit)){
                        straight_count++; 
                        temp--;
                    } 
                    else{
                        break;
                    }

                }
            }
        }
        if(straight_count == 4){
            return [8, 5];
        }
        return [0];
    }

    four_kind_check(current_cards){
        var sorted_hand_values_temp = [];
        for(var i = 0; i < 7; i++){
            sorted_hand_values_temp[i] = this.get_value(current_cards[i]);
        }
        var reverse_sorted_hand = [];
        reverse_sorted_hand = sorted_hand_values_temp.sort(function(a, b) {return b-a;});
        var quad_check = false;
        var quad_count = 0;
        var quad_value = 0;
        var temp = 0;
        //Check for the highest triple
        for(var i = 0; i < 7; i++){
            if(temp == reverse_sorted_hand[i]){
                quad_count++;
                if(quad_count == 4){
                    console.log(quad_count);
                    quad_check = true;
                    quad_value = reverse_sorted_hand[i]
                    break;
                }
            }
            else{
                temp = reverse_sorted_hand[i];
                quad_count = 1;
            }
        }
        if(quad_check == false){
            return [0];
        }
        else{
            console.log("why are we in the else statement");
            return [7, quad_value];
        }
 
    }
    full_house_check(current_cards){
        var sorted_hand_values_temp = [];
        for(var i = 0; i < 7; i++){
            sorted_hand_values_temp[i] = this.get_value(current_cards[i]);
        }
        var reverse_sorted_hand = sorted_hand_values_temp.sort(function(a, b) {return b-a;}); //Reverse sort to find the highest triple/pair first
        var triple_check = false;
        var pair_check = false;
        var triple_count = 0;
        var triple_value = 0;
        var double_count = 0;
        var double_value = 0;
        var temp = 0;
        //Check for the highest triple
        for(var i = 0; i < 7; i++){
            if(temp == reverse_sorted_hand[i]){
                triple_count++;
                if(triple_count == 3){
                    triple_check = true;
                    triple_value = reverse_sorted_hand[i];
                    break;
                }
            }
            else{
                temp = reverse_sorted_hand[i];
                triple_count = 1;
            }
        }
        if(triple_check == false){
            console.log("full house triple check false");
            return [0,0];
        }
        console.log(triple_value);
        //Check for the highest double, make sure not to count the triple cards though
        temp = 0;
        for(var i = 0; i < 7; i++){
            if(temp == reverse_sorted_hand[i]){
                double_count++;
                if(double_count == 2){
                    if(reverse_sorted_hand[i] == triple_value){
                        double_count = 1;
                        i++;
                    }
                    else{
                        pair_check = true;
                        double_value = reverse_sorted_hand[i];
                        break;
                    }
                }
            }
            else{
                temp = reverse_sorted_hand[i];
                double_count = 1;
            }
        }
        if(pair_check == false){
            console.log("full house double check false");
            console.log(double_value);
            return [0,0]
        }
        console.log(double_value);
        return [6, triple_value, double_value];
    }

    flush_check(current_cards){
        var flush_check = false;
        var spade_flush_check = 0;
        var club_flush_check = 0;
        var heart_flush_check = 0;
        var diamond_flush_check = 0;
        for(var i = 0; i < 7; i++){
            if(this.get_suit(current_cards[i]) == "S"){
                spade_flush_check++;
           }
        }
        if(spade_flush_check >= 5){
            return [5];
            flush_check = true;
        }
        for(var i = 0; i < 7; i++){
            if(this.get_suit(current_cards[i]) == "C"){
                club_flush_check++;
           }
        }
        if(club_flush_check >= 5){
            return [5];
            flush_check = true;
        }
        for(var i = 0; i < 7; i++){
            if(this.get_suit(current_cards[i]) == "H"){
                heart_flush_check++;
           }
        }
        if(heart_flush_check >= 5){
            return [5];
            flush_check = true;
        }
        for(var i = 0; i < 7; i++){
            if(this.get_suit(current_cards[i]) == "D"){
                diamond_flush_check++;
           }
        }
        if(diamond_flush_check >= 5){
            return [5];
            flush_check = true;
        }
        return [0];
    }

    straight_check(current_cards){
        var sorted_hand_values_temp = [];
        for(var i = 0; i < 7; i++){
            sorted_hand_values_temp[i] = this.get_value(current_cards[i]);
        }
        var reverse_sorted_hand = [];
        reverse_sorted_hand = sorted_hand_values_temp.sort(function(a, b) {return b-a;});
        var straight_count = 1;
        var highest_card = reverse_sorted_hand[0];
        var temp = highest_card;
        for(var i = 0; i < 7; i++){
            if(i != 6){
                if(reverse_sorted_hand[i+1] == temp - 1){
                    straight_count++; 
                    temp--;
                } 
                else{
                    straight_count = 1;
                    highest_card = reverse_sorted_hand[i+1];
                    temp = highest_card;
                }
            }
        }
        if(straight_count >= 5){
            return [4, highest_card];
        }
        if(reverse_sorted_hand[0] == 14){
            highest_card = 5;
            temp = 5;
            straight_count = 1;
            for(var i = 3; i < 7; i++){
                if(i != 6){
                    if(reverse_sorted_hand[i+1] == temp - 1){
                        straight_count++; 
                    } 
                    else{
                        straight_count = 1;
                        highest_card = reverse_sorted_hand[i+1];
                        temp = highest_card;
                    }

                }
            }
        }
        if(straight_count == 4){
            return [4, 5];
        }
        return [0];
    }

    triple_check(current_cards){
        var sorted_hand_values_temp = [];
        for(var i = 0; i < 7; i++){
            sorted_hand_values_temp[i] = this.get_value(current_cards[i]);
        }
        var reverse_sorted_hand = sorted_hand_values_temp.sort(function(a, b) {return b-a;}); 
        var triple_check = false;
        var triple_count = 0;
        var triple_value = 0;
        var temp = 0;
        //Check for the highest triple
        for(var i = 0; i < 7; i++){
            if(temp == reverse_sorted_hand){
                triple_count++;
                if(triple_count == 3){
                    triple_check = true;
                    triple_value = reverse_sorted_hand[i]
                    break;
                }
            }
            else{
                temp = reverse_sorted_hand[i];
                triple_count = 1;
            }
        }
        if(triple_check == false){
            return [0];
        }
        return [3, triple_value];

    }
    
    double_pair_check(current_cards){
        var sorted_hand_values_temp = [];
        for(var i = 0; i < 7; i++){
            sorted_hand_values_temp[i] = this.get_value(current_cards[i]);
        }
        var reverse_sorted_hand = sorted_hand_values_temp.sort(function(a, b) {return b-a;}); //Reverse sort to find the highest triple/pair first
        var double_1_check = false;
        var pair_2_check = false;
        var double_count_1 = 0;
        var double_value_1 = 0;
        var double_count_2 = 0;
        var double_value_2 = 0;
        var temp = 0;
        //Check for the highest double
        for(var i = 0; i < 7; i++){
            if(temp == reverse_sorted_hand[i]){
                double_count_1++;
                if(double_count_1 == 2){
                    double_1_check = true;
                    double_value_1 = reverse_sorted_hand[i];
                    break;
                }
            }
            else{
                temp = reverse_sorted_hand[i];
                double_count_1 = 1;
            }
        }
        if(double_1_check == false){
            return [0];
        }
        //Check for the highest double, make sure not to count the triple cards though
        temp = 0;
        for(var i = 0; i < 7; i++){
            if(temp == reverse_sorted_hand[i]){
                double_count_2++;
                if(double_count_2 == 2){
                    if(reverse_sorted_hand[i] == double_value_1){
                        double_count_2 = 1;
                    }
                    else{
                        pair_2_check = true;
                        double_value_2 = reverse_sorted_hand[i];
                        break;
                    }
                }
            }
            else{
                temp = reverse_sorted_hand[i];
                double_count_2 = 1;
            }
        }
        if(pair_2_check == false){
            return [0]
        }
        return [2, double_value_1, double_value_2];
    }


    pair_check(current_cards){
        var sorted_hand_values_temp = [];
        for(var i = 0; i < 7; i++){
            sorted_hand_values_temp[i] = this.get_value(current_cards[i]);
        }
        var reverse_sorted_hand = sorted_hand_values_temp.sort(function(a, b) {return b-a;}); 
        var double_check = false;
        var double_count = 0;
        var double_value = 0;
        var temp = 0;
        //Check for the highest triple
        for(var i = 0; i < 7; i++){
            if(temp == reverse_sorted_hand[i]){
                double_count++;
                if(double_count == 2){
                    double_check = true;
                    double_value = reverse_sorted_hand[i]
                    break;
                }
            }
            else{
                temp = reverse_sorted_hand[i];
                double_count = 1;
            }
        }
        if(double_check == false){
            return [0];
        }
        return [1, double_value];
    } 
//------------------------------------Hand Comparisons Above ---------------------------------------



//------------------------------------Begin Hand and HTML Below ---------------------------------------

begin_hand(){
    var smallblind = this.state.smallblind;
    //show back of all cards at the begginning of the hand
    this.resetBoard();
    this.dealPlayers();
    fire.database().ref("/Root/GameID/").update({
        cur_bet: 0
    })
    /*
    if (this.state.cur_bet == 0){
        document.getElementById('bet amount').style.visibility='hidden';
        document.getElementById('Fold').style.visibility='hidden';
        document.getElementById('Raise').style.visibility='hidden';
    } else {
        document.getElementById('bet amount').style.visibility='visible';
        document.getElementById('Fold').style.visibility='visible';
        document.getElementById('Raise').style.visibility='visible';
    }
    */
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
        var currUser = fire.auth().currentUser.uid;
        var P2Chips = snapshot.child("P2chips").val()
        var P1Chips = snapshot.child("P1chips").val()
        var current_bet = snapshot.child("cur_bet").val()
        var where = snapshot.child("where_in_game").child("where_in_game").val()
        var sPOT = snapshot.child("pot").val()
        var ncall = snapshot.child("num_call").child("num_call").val()
        var nchecks = snapshot.child("num_checks").child("num_checks").val()
        var Nturn = snapshot.child("turn").child("currTurn").val()
        var Car1 = snapshot.child("C1").val()
        var Car2 = snapshot.child("C2").val()
        var Car3 = snapshot.child("C3").val()
        var Car4 = snapshot.child("C4").val()
        var Car5 = snapshot.child("C5").val()
        var P1Ca1 = snapshot.child(currUser).child("C1").val()
        var P1Ca2 = snapshot.child(currUser).child("C2").val()
            this.setState({
                Ca1: Car1,
                Ca2: Car2,
                Ca3: Car3,
                Ca4: Car4,
                Ca5: Car5,
                P1C1: P1Ca1,
                P1C2: P1Ca2,
                P2chips: P2Chips,
                P1chips: P1Chips,
                where_in_game: where,
                pot: sPOT,
                num_call: ncall,
                num_checks: nchecks,
                currTurn: Nturn,
                cur_bet: current_bet
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
                        Player2's Stack<br/> {this.state.P2chips} </h1>
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
                    <h1 id = "bet amount" style={{textAlign: "center", margin: '30px'}}>Amount to Call<br/> {this.state.cur_bet}</h1>
                    <h1 style={{textAlign: "center", margin: '30px', marginLeft: '300px'}}>
                        Player1's Stack<br/> {this.state.P1chips} </h1>
                    { this.get_card_img(this.state.P1C1) }
                    { this.get_card_img(this.state.P1C2) }
 
                    <div style={{display: 'flex', justifyContent: 'center', height: "100%", flexDirection: 'column'}}>
                        <button id ="Check" style={{margin: '7px', marginTop: '15px'}} onClick={() => {this.check()}}>CHECK</button>
                        <button id ="Bet" style={{margin: '7px'}} onClick={() => {this.bet()}}>BET</button>
                        <button id = "Raise" style={{margin: '7px'}} onClick={() => {this.raise()}}>RAISE</button>
                        <button id = "Call" style={{margin: '7px'}} onClick={() => {this.call()}}>CALL</button>
                        <button id = "Fold" style={{margin: '7px'}} onClick={() => {this.fold()}}>FOLD</button>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', height: "100%", flexDirection: 'column'}}>
                        <input id="Bet_amount" style={{margin: '7px', marginTop: '50px'}} max={this.state.P1chips} min="25" type="number"/>
                        <input id="Raise_amount" style={{margin: '7px'}} min="25" max={this.state.P1chips}  type="number"/>
                    </div>
                </div>
            </div>
        )
    }
}
export default GamePage;
