import React, {Component} from 'react'
import CartItem from './cartItem'
import {connect} from 'react-redux'
import {gettingCart} from '../store/cart'

import {Checkout} from './checkout'
import {Link} from 'react-router-dom'

class Cart extends Component {
  state = {
    checkout: false
  }

  componentDidMount() {
    this.props.getCartItems()
  }

  toggleCheckout = () => {
    this.setState(prevState => ({checkout: !prevState.checkout}))
  }

  render() {
    return (
      <div className="text-center">
        <h1>Checkout</h1>
        {this.props.cartItems.map(item => (
          <CartItem item={item} key={item.id} />
        ))}
        <br />
        <button className="btn btn-success text-white" onClick={this.toggleCheckout}>
          Checkout
        </button>
        <br />
        {this.state.checkout ? (
          <Checkout cartItems={this.props.cartItems} />
        ) : null}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  cartItems: state.cart.cartItems
})

const dispatchToProps = dispatch => ({
  getCartItems: () => dispatch(gettingCart())
})

export default connect(mapStateToProps, dispatchToProps)(Cart)
