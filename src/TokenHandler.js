import React from 'react';
import { Link } from 'react-router-dom';

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
