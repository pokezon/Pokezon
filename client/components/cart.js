/* eslint-disable react/no-unsafe */
import React, {Component} from 'react'
import CartItem from './cartItem'
import {connect} from 'react-redux'
import {gettingCart, updatingCartItem} from '../store/cart'
import products from '../store/products'
import {Checkout} from './checkout'

const crypto = require('crypto')

class Cart extends Component {
  state = {
    checkout: false,
    localCart: []
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.getCartItems()
    } else {
      this.setState({
        localCart: JSON.parse(localStorage.getItem('LocalStorageCart'))
      })
    }
  }

  toggleCheckout = () => {
    this.setState(prevState => ({checkout: !prevState.checkout}))
  }

  confirmCheckout = (cart, e) => {
    const shippingAddress = {
      recipientName: e.target.inputName.value,
      addressLine1: e.target.inputAddress.value,
      addressLine2: e.target.inputAddress2.value || '',
      city: e.target.inputCity.value,
      state: e.target.inputState.value,
      zipCode: e.target.inputZip.value
    }

    const generatedOrderId = crypto.randomBytes(16).toString('base64')
    const thisOrderId = generatedOrderId
    cart.forEach(cartItem =>
      this.props.updateCart({
        id: cartItem.id,
        completedFlag: true,
        completedOrderId: thisOrderId,
        shippingAddress: JSON.stringify(shippingAddress)
      })
    )
  }

  deleteLocalCartItem = id => {
    const {localCart} = this.state
    this.setState(prevState => ({
      checkout: false,
      localCart: prevState.localCart.filter(item => item.id !== id)
    }))
    localStorage.setItem(
      'LocalStorageCart',
      JSON.stringify(localCart.filter(item => item.id !== id))
    )
  }

  combinedSameProductQuants = cartItems => {
    const itemIdHashMap = {}
    return cartItems.reduce((accum, item) => {
      if (itemIdHashMap[item.product.id] === undefined) {
        itemIdHashMap[item.product.id] = true
        return accum.concat(item)
      } else {
        const increaseQItem = accum.find(
          obj => obj.product.id === item.product.id
        )
        increaseQItem.quantity += item.quantity
      }
      return accum
    }, [])
  }

  render() {
    let cart = this.props.isLoggedIn
      ? this.props.cartItems
      : this.state.localCart
    cart = this.combinedSameProductQuants(cart)
    return (
      <div className="text-center">
        {cart.length ? '' : <h1>Looks like your cart is empty!</h1>}
        {cart.map(item => (
          <CartItem
            item={item}
            key={item.id}
            isLoggedIn={this.props.isLoggedIn}
            checkout={this.state.checkout}
            deleteLocalCartItem={this.deleteLocalCartItem}
            // resetLocalCart={this.resetLocalCart}
          />
        ))}
        <br />
        <button
          className="btn btn-success text-white"
          onClick={this.toggleCheckout}
          type="button"
        >
          Checkout
        </button>
        <br />
        {this.state.checkout ? (
          <Checkout cartItems={cart} confirmCheckout={this.confirmCheckout} />
        ) : null}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  cartItems: state.cart.cartItems,
  isLoggedIn: !!state.user.id
})

const dispatchToProps = dispatch => ({
  getCartItems: () => dispatch(gettingCart()),
  updateCart: item => dispatch(updatingCartItem(item))
})

export default connect(mapStateToProps, dispatchToProps)(Cart)
