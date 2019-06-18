/* eslint-disable react/no-unsafe */
import React, {Component} from 'react'
import CartItem from './cartItem'
import {connect} from 'react-redux'
import {updatingCartItem} from '../store/cart'
import {Link} from 'react-router-dom'

class Cart extends Component {
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
    let cart = this.props.isLoggedIn
      ? this.props.cartItems
      : this.state.localCart

    return (
      <div className="text-center">
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
        <Link to={cart.length ? '/cart/checkout' : '/products'}>
          <button
            type="button"
            className={
              cart.length
                ? 'btn btn-warning text-white'
                : 'btn btn-success text-white'
            }
            id="brand-name"
          >
            {cart.length ? 'Go to Checkout' : 'Browse Our Pokemon'}
          </button>
        </Link>
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
