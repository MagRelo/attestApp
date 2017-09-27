import React, {Component} from 'react'
import { Link } from 'react-router'


import Profile from '../../user/layouts/profile/Profile'


// UI Components
import {HiddenOnlyAuth, VisibleOnlyAuth} from '../../util/wrappers.js'
import LoginButtonContainer from '../../user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from '../../user/ui/logoutbutton/LogoutButtonContainer'

import {generateUniquenessAttestation} from "../../web3/attestationBridge";

import officialSeal from '../../img/Imperial_Seal.png'

const attestFunction = (() => {
  return generateUniquenessAttestation("2ovoofGYUpq6GF6JkN64qgB4hvfRNvyanuv")
})


class Home extends Component {

  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-2">

            <h2> Officials: </h2>
            <h3>Instructions</h3>
            <ol>
              <li>Have the applicant sign in to uPort</li>
              <li>Check that their uPort profile matches their official government-issued id</li>
              <li>Click 'Attest to Uniqueness' to create attestation.</li>
            </ol>

            <div>
              <button className="pure-button pure-button-primary button-xlarge" onClick={attestFunction}> Create Attestation </button>
            </div>

          </div>
          <div className="pure-u-1-2">

            <h2> Applicants: </h2>
            <OnlyGuestDisplay_applicants/>
            <OnlyAuthDisplay_applicants/>

          </div>
        </div>
      </main>
    )
  }
}

export default Home
