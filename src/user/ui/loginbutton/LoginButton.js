import React from 'react'

// Images
import uPortLogo from '../../../img/uport-logo.svg'

const LoginButton = ({ onLoginUserClick }) => {
  return(
    <button
      className="pure-button pure-button-primary uport-logo"
      onClick={(event) => onLoginUserClick(event)}>

      <img className="uport-logo" src={uPortLogo} alt="uPort Logo" />
      Login with uPort
    </button>
  )
}

export default LoginButton
