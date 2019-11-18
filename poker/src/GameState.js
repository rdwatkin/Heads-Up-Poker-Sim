class GameState {
    constructor(p1, p2) {    
        // MAIN VARIABLES   
        this.players = [p1, p2];
        this.curPlayer = 0;
        this.curTurn = 0;
        
        // CHIP VARIABLES
        this.pot = 0;
        this.pChips = [1000, 1000];
        
        // CARD VARIABLES
        this.middleCards = [];
        this.pHands = [];

        // Randomly generate cards in the middle
        this.middleCards = []; // GENERATE CARDS HERE WHEN COMBINING CODE LATER
        // Randomly distribute cards to each player
        for (var i = 0; i < 2; i++){
            this.pHands[i] = []; // GENERATE HAND HERE WHEN COMBINING CODE LATER
        }
    }

    // FUNCTIONS TO COPY OVER LATER
    /*
        update_turn()
        game_control()
    */
}
 
module.exports = GameState;