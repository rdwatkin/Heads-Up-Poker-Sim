class GameState {
    constructor(p1, p2) {    
        // MAIN VARIABLES   
        this.players = [p1, p2];
        this.curPlayer = 0;
        this.curTurn = "Player 1";
        
        // CHIP VARIABLES
        this.pot = 0;
        this.pChips = [1000, 1000];
        
        // CARD VARIABLES
        this.middle_cards = [];
        this.pHands = [];
        for (var i = 0; i < 2; i++){
            this.pHands[i] = [];
        }
    }

    // FUNCTIONS TO COPY OVER LATER
    /*
        update_turn()
        game_control()
    */

    // Update the cards in the game
    distribute_cards(cards){
        for(var i = 0; i < 9; i++){
            if(i < 5){
                this.middle_cards[i] = cards[i];
            }
            else if(i < 7){
                this.pHands[0][i-5] = cards[i];
            }
            else{
                this.pHands[1][i-7] = cards[i];
            }
        }
    }

    // Returns the player's hand
    get_hand(player){
        if(player == this.players[0])
            return this.p1Hand;
        return this.p2Hand;
    }

    get_chips(player){
        if(player == this.players[0])
            return this.pChips[0];
        return this.pChips[1];
    }

}
 
module.exports = GameState;