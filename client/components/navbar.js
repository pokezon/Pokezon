import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, resettingCart} from '../store'

export const Navbar = ({handleLogOut, isLoggedIn, cart}) => (
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
              <Link to="/" className="text-white bg-dark" id="brand-name">
                Home
              </Link>
              <Link to="/home" className="text-white bg-dark" id="brand-name">
                Your Profile
              </Link>
              <Link
                to="/products"
                className="text-white bg-dark"
                id="brand-name"
              >
                Our Pokemon
              </Link>
              <Link to="/cart" className="text-white bg-dark" id="brand-name">
                Your Cart
              </Link>
              <a
                href="#"
                onClick={handleLogOut}
                className="text-white bg-dark"
                id="brand-name"
              >
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login" className="text-white bg-dark" id="brand-name">
                Login
              </Link>
              <Link to="/signup" className="text-white bg-dark" id="brand-name">
                Sign Up
              </Link>
              <Link to="/" className="text-white bg-dark" id="brand-name">
                Home
              </Link>
              <Link
                to="/products"
                className="text-white bg-dark"
                id="brand-name"
              >
                Our Pokemon
              </Link>
              <Link to="/cart" className="text-white bg-dark" id="brand-name">
                Your Cart
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.cart.cartItems
  }
}

const mapDispatch = dispatch => {
  return {
    handleLogOut() {
      dispatch(logout())
      dispatch(resettingCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
