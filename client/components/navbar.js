import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, resettingCart} from '../store'

export const Navbar = ({handleLogOut, isLoggedIn, cart}) => (
  <div>
    <a
      href="https://poke-zon.herokuapp.com/"
      id="brand-name"
      className="text-dark"
    >
      <h2>
        {' '}
        <img
          src="https://ui-ex.com/images/pokeball-transparent-6.png"
          width="3%"
        />{' '}
        pokezon.
      </h2>
    </a>
    <div>
      {isLoggedIn ? (
        <div className="nav">
          {/* The navbar will show these links after you log in */}
          <Link to="/" id="brand-name">
            Home
          </Link>
          <Link to="/home" id="brand-name">
            Your Profile
          </Link>
          <Link to="/products" id="brand-name">
            Our Pokemon
          </Link>
          <Link to="/cart" id="brand-name" className="righty">
            Your Cart
          </Link>
          <div>
            <a href="#" onClick={handleLogOut} id="brand-name">
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div className="nav">
          {/* The navbar will show these links before you log in */}
          <Link to="/" id="brand-name">
            Home
          </Link>
          <Link to="/products" id="brand-name">
            Our Pokemon
          </Link>
          <Link to="/cart" id="brand-name">
            Your Cart
          </Link>
          <Link to="/login" id="brand-name">
            Login
          </Link>
          <Link to="/signup" id="brand-name">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  </div>
)

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
