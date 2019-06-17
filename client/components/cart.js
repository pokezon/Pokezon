/* eslint-disable react/no-unsafe */
import React, {Component} from 'react'
import CartItem from './cartItem'
import {connect} from 'react-redux'
import {gettingCart} from '../store/cart'
import {Checkout} from './checkout'

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

  // resetLocalCart = () => {
  //   this.setState({
  //     localCart: []
  //   })
  // }

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
        {this.state.checkout ? <Checkout cartItems={cart} /> : null}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  cartItems: state.cart.cartItems,
  isLoggedIn: !!state.user.id
})

const dispatchToProps = dispatch => ({
  getCartItems: () => dispatch(gettingCart())
})

export default connect(mapStateToProps, dispatchToProps)(Cart)
