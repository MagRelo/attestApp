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
    this.state = {
      passport: '',
      attestLoading: false,
      attestSuccess: false
    }
  }

  handleChange(event) {
    this.setState({passport: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({attestLoading: true});

    if (this.state.passport.length < 2)
    {
      return alert('Please enter passport number')
    }

    generateUniquenessAttestation(this.props.authData.address)
      .then((response)=>{
        this.setState({attestSuccess: response === 'ok'});
        this.setState({attestLoading: false});
        this.setState({passport: ''});
      })

  }

  render() {

    const profileUrl = this.props.authData && this.props.authData.image ?
      'https://ipfs.io' + this.props.authData.image.contentUrl :
      'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'

    const createAttestation = (event) => {
        event.preventDefault();
        this.setState({passport: ''});
        return generateUniquenessAttestation(this.props.authData.address)
    }

    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-xl-1-8"></div>
          <div className="pure-u-1 pure-u-md-1-2 pure-u-xl-3-8">
            <div className="grid-pad">

              <h2> Officials </h2>
              <h3>Instructions:</h3>
              <h4>1. Verify that the applicant has a valid passport.</h4>

              <h4>2. Enter applicant's unique passport number, and click 'Create Attestation'.</h4>

              <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
                <fieldset>
                  <label htmlFor="passport">Passport Number</label>
                  <input id="passport"
                    type="text"
                    value={this.state.passport}
                    onChange={this.handleChange.bind(this)}
                    placeholder="Enter passport number"
                    disabled={this.state.attestLoading || this.state.attestSuccess}>
                  </input>
                </fieldset>
                <button className="pure-button pure-button-primary"
                  type="submit"> Create Attestation
                </button>

                {this.state.attestLoading ?

                  <span>
                    <div className="loader"/>
                    <label className="loading-text">Loading (may take several minutes)... </label>
                  </span>

                : null}
                {this.state.attestSuccess ?

                  <span>
                    <label className="loading-text">Success!</label>
                  </span>

                : null}

              </form>

              <h4>3. Have applicant logout</h4>

            </div>

          </div>
          <div className="pure-u-1 pure-u-md-1-2 pure-u-xl-3-8">
            <div className="grid-pad">
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
        </div>
      </main>
    )
  }
}

export default Profile
