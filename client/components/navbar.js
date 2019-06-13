import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, resettingCart} from '../store'

const Navbar = ({handleLogOut, isLoggedIn, cart}) => (
  <div>
    <h1 id="brand-name" className="navbar-brand">
      pokezon.
    </h1>

    <nav className="navbar navbar-inverse navbar-fixed-top">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/products">Our Pokemon</Link>
          <Link to="/cart">Your Cart ({cart.length})</Link>
          <a href="#" onClick={handleLogOut}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/products">Our Pokemon</Link>
          <Link to="/cart">Your Cart ({cart.length})</Link>
        </div>
      )}
    </nav>
    <hr />
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
