import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1 id="brand-name" className="navbar-brand">
      pokezon.
    </h1>
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-end">
      <div className="container">
        <div className="navbar-header">
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home" className="text-white bg-dark">
                Home
              </Link>
              <Link to="/products" className="text-white bg-dark">
                Our Pokemon
              </Link>
              <Link to="/cart" className="text-white bg-dark">
                Your Cart
              </Link>
              <a href="#" onClick={handleClick} className="text-white bg-dark">
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login" className="text-white bg-dark">
                Login
              </Link>
              <Link to="/signup" className="text-white bg-dark">
                Sign Up
              </Link>
              <Link to="/products" className="text-white bg-dark">
                Our Pokemon
              </Link>
              <Link to="/cart" className="text-white bg-dark">
                Your Cart
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
