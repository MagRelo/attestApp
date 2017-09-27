import React, {Component} from 'react'
import { Link } from 'react-router'


import Profile from '../../user/layouts/profile/Profile'


// UI Components
import {HiddenOnlyAuth, VisibleOnlyAuth} from '../../util/wrappers.js'
import LoginButtonContainer from '../../user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from '../../user/ui/logoutbutton/LogoutButtonContainer'

import officialSeal from '../../img/Imperial_Seal.png'

class Home extends Component {

  render() {

    const OnlyGuestDisplay_applicants = HiddenOnlyAuth(() =>
      <div  style={{'textAlign': 'center'}}>
        <LoginButtonContainer/>
      </div>
    )

    const OnlyAuthDisplay_officals = VisibleOnlyAuth(() =>
      <div>
        <button className="pure-button pure-button-primary button-xlarge" onClick={attestFunction}> Create Attestation </button>
      </div>
    )


    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">

            <div className="banner">
              <img className="logo" src={officialSeal}></img>
              <h1>Official Uniqueness Application</h1>
              <h2>* For official use only *</h2>
            </div>

            <hr></hr>

            <div className="pure-g">
              <div className="pure-u-1-2">

                <h2> Officials: </h2>
                <h3>Instructions</h3>
                <ol>
                  <li>Have the applicant sign in to uPort</li>
                </ol>

              </div>
              <div className="pure-u-1-2">

                <h2> Applicants: </h2>
                <OnlyGuestDisplay_applicants/>
            </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
