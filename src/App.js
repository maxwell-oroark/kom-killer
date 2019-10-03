import React from 'react';
import TokenHandler from './TokenHandler';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';

class App extends React.Component {

  state = {
    position: '', 
    athlete: null
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

  processStrava = data => {
    window.localStorage.setItem('accessToken', data.access_token)
    return this.setState({ athlete: data.athlete }) 
  }

  render(){
    console.log(this.state.strava)
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
              </header>
              <section>
                {
                  this.state.athlete
                    ? <div>
                        <h3>Authenticated!</h3>
                        <img src={this.state.athlete.profile_medium} /> 
                        <h5>welcome {this.state.athlete.firstname}</h5>
                        <Link to={'/easykoms'}> See easy KOMs near you</Link>
                    </div>

                    : <button onClick={this.connectStrava} >Connect Strava Account</button>
                }
              </section>
            </div>
          </Route>
          <Route exact path='/token'>
            <TokenHandler 
              processStrava={this.processStrava} 
            />
          </Route>
        </Switch>
      </Router>
    );
  
  }
}

export default App;
