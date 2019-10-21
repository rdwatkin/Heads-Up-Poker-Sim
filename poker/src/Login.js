import React from 'react';
import fire from './config/fire';
import cards from './images/cards.png';

class login extends React.Component {


    login() {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
    
        fire.auth().signInWithEmailAndPassword(email, password)
            .then((u) => {
                console.log("Successfully Logged in");
            })
            .catch((err) => {
                console.log("Error: " + err.toString());
            })
    }

    signUp() {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
    
        fire.auth().createUserWithEmailAndPassword(email, password)
            .then((u) => {
                console.log("Successfully Signed Up");
            })
            .catch((err) => {
                console.log("Error: " + err.toString());
            })
    }


    //Code from https://github.com/kriscfoster/react-firebase-authentication/blob/master/src/Login.js
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <div>
                    <div>Email</div>
                    <input id="email" placeholder="Enter Email.." type="text"/>
                </div>
                <div>
                    <div>Password</div>
                    <input id="password" placeholder="Enter Password.." type="text"/>
                </div>
                <button style={{margin: '10px'}} onClick={this.login}>Login</button>
                <button style={{margin: '10px'}} onClick={this.signUp}>Sign Up</button>

                <img src={cards} 
                    style={{position: "absolute", 
                        bottom: 0, right: 0,
                        height: "15em", 
                        marginRight: "1 em",
                        marginBottom: "1 em"}}/>
            </div>
        )
    }
}

export default login;