import React from 'react';
import { Link } from 'react-router-dom';

// TODO embed environment variable in lambda and exchange for real token so I can begin hitting actual API

class TokenHandler extends React.Component {
  state = {
    code: '' 
  }

  componentDidMount(){
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code')
    this.setState({ code })
  }

  render(){
    return (
      <>
        <div><Link to='/'>Home</Link></div>
        <div>token handler</div>
        <div>{this.state.code}</div>
      </>
    ) 
  }
}

export default TokenHandler;
