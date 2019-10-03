import React from 'react';
import TokenHandler from './TokenHandler';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

class App extends React.Component {

  state = {
    position: '' 
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ position: `${position.coords.latitude}, ${position.coords.longitude}` })
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
                <h1>Kom Killer<span style={{ fontSize: '10px' }}>beta</span></h1>
                <p>
                  <code>{ this.state.position }</code>
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
