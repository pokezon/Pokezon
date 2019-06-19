/* eslint-disable react/no-unsafe */
import React, {Component} from 'react'
import CartItem from './cartItem'
import {connect} from 'react-redux'
import {updatingCartItem} from '../store/cart'
import {Link} from 'react-router-dom'

export class Cart extends Component {
  state = {
    localCart: []
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.setState({
        localCart: JSON.parse(localStorage.getItem('LocalStorageCart'))
      })
    }
  }

  deleteLocalCartItem = id => {
    const {localCart} = this.state
    this.setState(prevState => ({
      localCart: prevState.localCart.filter(item => item.id !== id)
    }))
    localStorage.setItem(
      'LocalStorageCart',
      JSON.stringify(localCart.filter(item => item.id !== id))
    )
  }

  render() {
    let cart
    let checkOutButtonLink = ''
    let checkOutButtonLinkText = ''
    if (this.props.isLoggedIn) {
      cart = this.props.cartItems
      checkOutButtonLink = cart.length ? '/cart/checkout' : '/products'
      checkOutButtonLinkText = cart.length
        ? 'Go to Checkout'
        : 'Browse Our Pokemon'
    } else {
      cart = this.state.localCart
      checkOutButtonLink = cart.length ? '/signup' : '/products'
      checkOutButtonLinkText = cart.length
        ? 'Sign Up To Checkout'
        : 'Browse Our Pokemon'
    }

    return (
      <div className="text-center">
        <br />
        <h1>
          {' '}
          -{' '}
          <img
            src="https://www.foothillsiga.com/wp-content/uploads/2016/05/shop-langing-cart-icon.png"
            width="4%"
          />{' '}
          -{' '}
        </h1>
        <br />
        {cart.length ? (
          ''
        ) : (
          <h1 id="brand-name">Looks like your cart is empty!</h1>
        )}
        {cart.map(item => (
          <CartItem
            item={item}
            key={item.id}
            isLoggedIn={this.props.isLoggedIn}
            deleteLocalCartItem={this.deleteLocalCartItem}
          />
        ))}
        <br />
        <Link to={checkOutButtonLink}>
          <img
            src="https://i.ya-webdesign.com/images/open-pokeball-png-8.png"
            width="3%"
          />
          <button
            type="button"
            className={
              cart.length
                ? 'btn btn-warning text-white'
                : 'btn btn-success text-white'
            }
            id="brand-name"
          >
            {checkOutButtonLinkText}
          </button>
        </Link>
        <br />
        <br />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  cartItems: state.cart.cartItems,
  isLoggedIn: !!state.user.id
})

const dispatchToProps = dispatch => ({
  updateCart: item => dispatch(updatingCartItem(item))
})

export default connect(mapStateToProps, dispatchToProps)(Cart)
