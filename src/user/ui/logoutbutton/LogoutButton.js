import React from 'react'

import uPortLogo from '../../../img/uport-logo.svg'

const LogoutButton = ({ onLogoutUserClick }) => {
  return(
    <button className="pure-button pure-button-primary uport-logo" onClick={(event) => onLogoutUserClick(event)}>
      <img className="uport-logo" src={uPortLogo} alt="UPort Logo" />
      Logout
    </button>
  )
}

export default LogoutButton
