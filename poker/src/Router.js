import React from 'react';
import fire from './config/fire';
import cards from './images/cards.png';
import GamePage from './GamePage.js';
import Home from "./Home.js"
import PlayerSelect from './playerSelect.js'
import { BrowserRouter as BRouter, Link, NavLink, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';

class Router extends React.Component {

    constructor(props) {
        super(props);
    }
 
    render() {
        return (
            <BRouter>
            <div className="Router">
                <Switch>
                    <Route path='/' exact strict component={Home} />
                    <Route path='/gamepage' exact strict component={GamePage} />
                    <Route path='/playerSelect' exact strict component={PlayerSelect} />
                </Switch>
            </div>
            </BRouter>
        )
    }

}

export default Router;
