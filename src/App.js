import React, { Component } from 'react'
import { Link } from 'react-router'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import {loadWeb3} from "./web3/getWeb3";
import {createDependencies} from "./web3/dependencies";

// Not sure where the best place to instantiate dependencies is, feel free to move somewhere more appropriate.
loadWeb3
    .then(web3 => createDependencies(web3))

class App extends Component {
  render() {
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <span>
        <li className="pure-menu-item">
          <Link to="/profile" className="pure-menu-link">Profile</Link>
        </li>
        <li className="pure-menu-item">
          <LogoutButtonContainer />
        </li>

      </span>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
      </span>
    )

    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <Link to="/" className="pure-menu-heading pure-menu-link">HiveCommons</Link>
          <ul className="pure-menu-list navbar-right">
            <li className="pure-menu-item">
              <Link className="pure-menu-link" to="/hives">Hives</Link>
            </li>
            <li className="pure-menu-item">
              <Link className="pure-menu-link" to="/faucet/bee">BEE Faucet</Link>
            </li>
            <li className="pure-menu-item">
              <Link className="pure-menu-link" to="/faucet/hny">HNY Faucet</Link>
            </li>
            <OnlyGuestLinks />
            <OnlyAuthLinks />
          </ul>
        </nav>

        {this.props.children}
      </div>
    );
  }
}

export default App
