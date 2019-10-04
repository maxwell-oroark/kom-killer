import React from 'react';
import settings from './settings';
import { ReactComponent as Logo } from './logo.svg'
import { Redirect } from 'react-router-dom';
import './App.css';

class TokenHandler extends React.Component {

  state = {
    code: '',
    strava: null
  }

  async componentDidMount(){
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code')
    try {
      const response = await fetch(`${settings.AWS_BACKEND}?code=${code}`).then(res => res.json())
      await this.props.processStrava(response);
      this.setState({ strava: response })
    } catch(error) {
      console.log(error) 
    }
  }

  render(){
    return (
      <div className="loading-container">
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent:'center', color: 'white' }}>
          <Logo 
            className="App-logo" />
            <h4>Authenticating...</h4>
        </div>
        <div>{ this.state.strava && <Redirect to='/' /> }</div>
      </div>
    ) 
  }
}

export default TokenHandler;
