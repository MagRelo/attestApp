import { uport } from './../../../util/connectors.js'
import { browserHistory } from 'react-router'

export const BEE_TOKEN_CLAIMED = 'BEE_TOKEN_CLAIMED'
function beeTokenClaimed(user) {
  return {
    type: BEE_TOKEN_CLAIMED,
    payload: user
  }
}

export function claimBeeToken() {

  return function(dispatch) {

    //
    beeFaucetBridge.claimBeeToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJzdWIiOiIyb3Zvb2ZHWVVwcTZHRjZKa042NHFnQjRodmZSTnZ5YW51diIsImNsYWltIjp7IlVuaXF1ZW5lc3MiOiJJcyBVbmlxdWUgLyBIYXNoIG9mIHRoZWlyIHBhc3Nwb3J0IG51bWJlciJ9LCJleHAiOjE1MzgwNjE3Njc3NjgsImlzcyI6IjJvdHdrSnF2RzhtNWR0OVJldlFHaUhYR2gzTmV6MWk3S0RXIiwiaWF0IjoxNTA2NTI1NzY3NzY5fQ.fP3lyuSPf1QYOiQmAP3gAN6tpFgJJuRDPnMj9k8AoaWarMgwYym_0QP4nZNI3v1hhToeMbtgdemFvQTIe1mx2w")
      .then(() => {
        console.log("Bee Token Claim tx has been mined (doesn't necessarily mean it has given the user a token though) lets check their balance.")
        return web3Bridge.getUsersAccounts()
      })
      .then(accounts => beeFaucetBridge.getBeeTokenBalance(accounts[0]))
      .then(balance => console.log("Users BEE balance: " + balance))

      console.log(credentials)
      dispatch(userLoggedIn(credentials))




    uport.requestCredentials({
      requested: ['name', 'avatar', 'phone', 'country'],
      notifications: true, // We want this if we want to recieve credentials
      verified: ["Uniqueness"] // We need the JWT field from the object specified here to claim Bee.
    }).then((credentials) => {

      // Check out the console to see what data we get from uPort. We need to save it somewhere for use when we want to claim Bee.




      // Used a manual redirect here as opposed to a wrapper.
      // This way, once logged in a user can still access the home page.
      var currentLocation = browserHistory.getCurrentLocation()

      if ('redirect' in currentLocation.query)
      {
        return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
      }

      console.log("requestCredentials")

      return
    })
  }
}
