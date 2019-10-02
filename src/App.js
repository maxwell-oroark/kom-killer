import React from 'react';
import TokenHandler from './TokenHandler';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(position => {
      console.log('users position:', position) 
    }) 
  }

  connectStrava = () => {
    const clientId = `39086`;
    const redirectUri = `http://localhost:3000/token`;
    const responseType = `code`;
    window.location = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=read`
  }

  render(){
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
                <button onClick={this.connectStrava} >Connect Strava Account</button>
              </header>
            </div>
          </Route>
          <Route exact path='/token'>
            <TokenHandler />
          </Route>
        </Switch>
      </Router>
    );
  
  }
}

export default App;
