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

class GamePage extends React.Component {

    logout() {
        fire.auth().signOut();
    }
    
    render() {
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'left', height: "50%", margin: '10px'}}>
                    <img src={back} style={{height: "10em", margin: '10px'}}/>
                    <img src={back} style={{height: "10em", margin: '10px'}}/>
                </div>


                <div style={{display: 'flex', justifyContent: 'center', height: "50%", margin: '10px'}}>
                    <img src={S2} style={{height: "10em", marginRight: '10px'}}/>
                    <img src={H7} style={{height: "10em", marginRight: '10px'}}/>
                    <img src={C1} style={{height: "10em", marginRight: '10px'}}/>
                    <img src={S10} style={{height: "10em", marginRight: '10px'}}/>
                    <img src={H2} style={{height: "10em", marginRight: '10px'}}/>
                </div>



                <div style={{display: 'flex', justifyContent: 'left', height: "100%", margin: '10px'}}>
                    <img src={H5} style={{height: "10em", margin: '10px'}}/>
                    <img src={C12} style={{height: "10em", margin: '10px'}}/>

                    <div style={{display: 'flex', justifyContent: 'center', height: "100%", flexDirection: 'column'}}>
                        <button style={{margin: '7px', marginTop: '15px'}} onClick={this.login}>CHECK</button>
                        <button style={{margin: '7px'}} onClick={this.login}>BET</button>
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