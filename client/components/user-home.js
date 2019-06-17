import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import SettingsForm from './settingsForm'

/**
 * COMPONENT
 */

// function runSetting (id) {
//   return (
//   <SettingsForm userId={id}/>
//   )
// }

export const UserHome = props => {
  const {username, id} = props

  return (
    <div align="center">
      <br />
      <h1>Welcome Back!</h1>
      <div className="userProfile">
        <br />
        {/* <h3>Welcome, {username}!</h3> */}
        <br />
        {/* <img
        src="https://cdn.bulbagarden.net/upload/3/3a/778Mimikyu_Busted_Dream.png"
      /> */}
        <img src="https://cdn.bulbagarden.net/upload/d/db/Shuffle025FiredUp.png" />
        <br />
        <div className="userProfileInfo">
          <h1>{username}</h1>
          <br />
          <div className="icons">
            {/* <img src="https://static.thenounproject.com/png/567595-200.png" /> */}
            <h4>
              <img
                src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_history_48px-512.png"
                width="50"
              />: Order History
            </h4>
            <h4>
              <img
                src="https://static.thenounproject.com/png/561090-200.png"
                width="50"
              />: Shipping
            </h4>
            {/* <img src="https://static.thenounproject.com/png/551641-200.png" /> */}
            <h4>
              <img
                src="https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-1/135/_Coin-512.png"
                width="50"
              />: Credit
            </h4>
          </div>
        </div>

        <br />
        <Link to="/home/settings">
          <button type="button" className="btn btn-warning text-white">
            Update Profile
          </button>
        </Link>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.user.username,
    id: state.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  username: PropTypes.string
}
