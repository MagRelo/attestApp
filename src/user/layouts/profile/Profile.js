import React, { Component } from 'react'

// UI Components
import {HiddenOnlyAuth, VisibleOnlyAuth} from '../../../util/wrappers.js'
import LoginButtonContainer from '../../ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from '../../ui/logoutbutton/LogoutButtonContainer'


import {generateUniquenessAttestation} from "../../../web3/attestationBridge";


class Profile extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {

    const profileUrl = this.props.authData && this.props.authData.image ?
      'https://ipfs.io' + this.props.authData.image.contentUrl :
      'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'

    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-2">

            <h2> Officials </h2>
            <h3>Instructions:</h3>
            <h4>1. Verify that ID is correct.</h4>

            <h4>2. Verify that uPort ID matches:</h4>
            <ul>
              <li>Picture</li>
              <li>Name</li>
              <li>Country</li>
            </ul>

            <h4>3. Create Attestation.</h4>
            <div style={{'textAlign': 'center'}}>
              <button className="pure-button pure-button-primary button-xlarge" onClick={(() => generateUniquenessAttestation(this.props.authData.address))}> Create Attestation </button>
            </div>
            <br></br>
            <em> *Applicant will get a notification on their phone when the attestation is complete.</em>

            <h4>4. Have applicant logout</h4>

          </div>
          <div className="pure-u-1-2">

            <h2> Applicant uPort profile </h2>
            <div className="applicant-section">
              <img className="profile-logo" src={profileUrl}></img>
              <p><strong>Name: </strong>{this.props.authData.name}</p>
              <p><strong>Phone: </strong>{this.props.authData.phone}</p>
              <p><strong>Country: </strong>{this.props.authData.country}</p>
              <LogoutButtonContainer />
            </div>



          </div>
        </div>
      </main>
    )
  }
}

export default Profile
