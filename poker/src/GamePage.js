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
                      P1C1: "", P1C2: "", P2C1: "", P2C2: "" }
    }

    componentWillMount(){
        // Testing to connect two players
        //var userId = prompt('Username?', 'Guest');
        // Consider adding '/<unique id>' if you have multiple games.
        //var gameRef = new Firebase('https://pleaseWork125.com/');
       // this.WORK(userId);
        

    //   / var userId = prompt('Username?', 'Guest');
    var userId = "asda"
       var playerList = fire.database().ref("/Root/playerList/");
           var temp1, temp2;
           playerList.once('value', snapshot => {
               temp1 = snapshot.child("P1").val();
               temp2 = snapshot.child("P2").val();
               console.log(temp1+ " " + temp2);
           })
           if(temp1 == null){
            playerList.set({
                   P1: userId,
                   P2: null
               })
           }
           else if(temp2 == null){
               alert("yes")
               playerList.set({
                   P1: temp1,
                   P2: userId
               })
           }
           
           
   
           playerList.transaction(function(curVal){
              //alert((curVal || 0) + 1);
           })
        
        

        // ----------------------------------------

        this.upload_cards()
        //Get Cards From Database
        fire.database().ref("/Root/GameID/").once('value', snapshot => {
            var Player1 = fire.auth().currentUser;
            console.log("\n\n"+Player1.uid);
            snapshot.child("C1").val()
            var Car1 = snapshot.child("C1").val()
            var Car2 = snapshot.child("C2").val()
            var Car3 = snapshot.child("C3").val()
            var Car4 = snapshot.child("C4").val()
            var Car5 = snapshot.child("C5").val()
            var P1Ca1 = snapshot.child("P1C1").val()
            var P1Ca2 = snapshot.child("P1C2").val()
            var P2Ca1 = snapshot.child("P2C1").val()
            var P2Ca2 = snapshot.child("P2C2").val()
            /* Set State Variables */
            this.setState({
                Ca1: Car1,
                Ca2: Car2,
                Ca3: Car3,
                Ca4: Car4,
                Ca5: Car5,
                P1C1: P1Ca1,
                P1C2: P1Ca2,
                P2C1: P2Ca1,
                P2C2: P2Ca2
            })
        })
    }

    WORK(userId) {
        var playerList = fire.database().ref("/Root/GameID/playerList/");
        var myNum, inGame = false;

        playerList.transaction(function(playerL){
            if(playerL == null){
                playerL = [];
            }

            // Check if the player is in the game already
            for (var i = 0; i < playerL.length; i++) {
                alert("check2");
                if (playerL[i] == userId){
                    inGame = true;
                    myNum = i;
                    return;
                }
            }

            if(i < 2){
                alert("check");
                playerL[i] = userId;
                myNum = i;
                return playerL;
            }
            myNum = null;
        }, function (error, committed){
            if(committed || inGame){
                // play the game
                alert(myNum);
                //var pd = fire.database().ref("/Root/GameID/playerList/");
                if(!inGame){
                    alert("signing in");
                    playerList.child(myNum).set({userId: userId, state: 'game state'});
                }
            }
            else{
                alert("failed");
            }
        });
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
    

    upload_cards(){
        var cards_dealt = this.deal_nine_cards();
        fire.database().ref("/Root/GameID/").set({
                C1: cards_dealt[0],
                C2: cards_dealt[1],
                C3: cards_dealt[2],
                C4: cards_dealt[3],
                C5: cards_dealt[4],
                P1C1: cards_dealt[5],
                P1C2: cards_dealt[6],
                P2C1: cards_dealt[7],
                P2C2: cards_dealt[8]
        })
        fire.database().ref()
    }

    get_card_img(card){
        if (card == ""){
            card = "1S";
        }
        let imgsrc = images('./'+card+'.png');
        return <img src={imgsrc} style={{height: "10em", marginRight: '10px'}}/>;
    }



    //main, control action of the game: whos turn, pot size/winner, flips cards when needed
    game_control() {
        //initialize variables
        var gameover = false;
        var action_complete = false;
        var pot = 0;
        var P1chips = 1000;
        var P2chips = 1000;
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
                P1chips -= 25;
                P2chips -= 50;
                //update on display
                
            } else {
                P1chips -= 50;
                P2chips -= 25;
                //update on display

            }
            //add blinds to the pot
            pot = 75;
            //update on display

            //show each player their cards, while having opponets flipped

            while(action_complete == false){
                //Allow small blind to have action
            

                //Give Big blind action
                
            }
            //reset action_complete
            action_complete = false;


            //When action is complete, show flop to both players


            while(action_complete == false){
                //Allow small blind to have action
            

                //Give Big blind action
                
            }
            //reset action_complete
            action_complete = false;
            //when action is complete, show turn to both players


            while(action_complete == false){
                //Allow small blind to have action
            

                //Give Big blind action
                
            }
            //reset action_complete
            action_complete = false;
            //when action is complete, show river to both players

            


            while(action_complete == false){
                //Allow small blind to have action
            

                //Give Big blind action
                
            }
            //reset action_complete
            action_complete = false;
            //When action is complete, show both players cards, and award pot to winner. Reset


            //call function to determine winner


            //Determine if game is over
            if (P1chips == 0 || P2chips == 0){
                gameover = true;
            }
        }
        //game is over

    }



 
    render() {
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'center', height: "50%", margin: '50px'}}>
                    { this.get_card_img(this.state.P2C1) }
                    { this.get_card_img(this.state.P2C2) }
                </div>
 
                <div style={{display: 'flex', justifyContent: 'center', height: "50%", margin: '10px'}}>
                    { this.get_card_img(this.state.Ca1) }
                    { this.get_card_img(this.state.Ca2) }
                    { this.get_card_img(this.state.Ca3) }
                    { this.get_card_img(this.state.Ca4) }
                    { this.get_card_img(this.state.Ca5) }
                </div>
 
                <div style={{display: 'flex', justifyContent: 'center', height: "100%", margin: '50px'}}>
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