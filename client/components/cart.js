/* eslint-disable react/no-unsafe */
import React, {Component} from 'react'
import CartItem from './cartItem'
import {connect} from 'react-redux'
import {gettingCart} from '../store/cart'
import products from '../store/products'

class Cart extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.getCartItems()
    } else if (!localStorage.getItem('LocalStorageCart')) {
      let items = []
      localStorage.setItem('LocalStorageCart', JSON.stringify(items))
    }
  }

  render() {
    const cart = this.props.isLoggedIn
      ? this.props.cartItems
      : JSON.parse(localStorage.getItem('LocalStorageCart'))
    return (
      <div className="text-center">
        {cart.length ? '' : <h1>Looks like your cart is empty!</h1>}
        {cart.map(item => <CartItem item={item} key={item.id} />)}
        <br />
        <button className="btn btn-success">Checkout</button>
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
