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
    <div className="text-center">
      <br />
      <h3>Welcome, {username}!</h3>
      <br />
      <img
        src="https://cdn3.iconfinder.com/data/icons/2018-social-media-black-and-white-logos/1000/2018_social_media_popular_app_logo_reddit-512.png"
        width="10%"
      />
      <br />
      <br />
      <Link to="/home/settings">
        <button type="button" className="btn btn-warning text-white">
          Update Profile
        </button>
      </Link>
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
