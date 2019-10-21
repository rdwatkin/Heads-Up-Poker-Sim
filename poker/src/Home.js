import React from 'react';
import fire from './config/fire';
import cards from './images/cards.png';

class Home extends React.Component {

    logout() {
        fire.auth().signOut();
    }
    
    render() {
        return (
            <div align="center">
                <div>
                    <h1>You are logged in..</h1>
                    <button style={{margin: '10px'}} onClick={this.logout}>Logout</button>
                </div>
                <div>
                    <button style={{margin: '10px'}} onClick={this.login}>PvP</button>
                    <button style={{margin: '10px'}} onClick={this.login}>PvE</button>
                </div>
                
                <img src={cards} 
                    style={{position: "relative", 
                        bottom: 0, center: 0,
                        height: "15em", 
                        marginRight: "1 em",
                        marginBottom: "1 em"}}/>
            </div>
        )
    }

}

export default Home;
