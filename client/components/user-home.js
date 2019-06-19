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
      <h2>
        -----<img
          src="https://cdn.freebiesupply.com/images/large/1x/master-ball-pokemon-n82.png"
          width="12%"
        />-----
      </h2>
      <div className="userProfile">
        <br />
        <img src="https://cdn.bulbagarden.net/upload/d/db/Shuffle025FiredUp.png" />
        <br />
        <div className="userProfileInfo">
          <h2>-- {username} --</h2>
          <br />
          <div className="icons">
            <h5>
              <img
                src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_history_48px-512.png"
                width="50"
              />: Order History
            </h5>
            <h5>
              <img
                src="https://static.thenounproject.com/png/561090-200.png"
                width="50"
              />: Shipping
            </h5>
            {/* <img src="https://static.thenounproject.com/png/551641-200.png" /> */}
            <h5>
              <img
                src="https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-1/135/_Coin-512.png"
                width="50"
              />: Credit
            </h5>
          </div>
        </div>

        <br />
        <Link to="/home/settings">
          <button
            type="button"
            className="btn btn-warning text-white"
            id="brand-name"
          >
            Update Profile
          </button>
        </Link>
      </div>
      <br />
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
