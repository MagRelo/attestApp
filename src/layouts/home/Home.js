import React, {Component} from 'react'
import { Link } from 'react-router'


import Profile from '../../user/layouts/profile/Profile'


// UI Components
import {HiddenOnlyAuth, VisibleOnlyAuth} from '../../util/wrappers.js'
import LoginButtonContainer from '../../user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from '../../user/ui/logoutbutton/LogoutButtonContainer'

import officialSeal from '../../img/Imperial_Seal.png'

class Home extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {

    const OnlyGuestDisplay_applicants = HiddenOnlyAuth(() =>
      <div  style={{'textAlign': 'center'}}>
        <LoginButtonContainer/>
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
              <div className="pure-u-xl-1-8"></div>
              <div className="pure-u-1 pure-u-md-1-2 pure-u-xl-3-8">

                <div className="grid-pad">
                  <h2> Officials: </h2>
                  <h3>Instructions</h3>
                  <ol>
                    <li>Have the applicant sign in to uPort</li>
                  </ol>
                </div>

              </div>
              <div className="pure-u-1 pure-u-md-1-2 pure-u-xl-3-8">
                <div className="grid-pad">
                  <h2> Applicants: </h2>
                  <OnlyGuestDisplay_applicants/>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    )
  }
}

export default Home
