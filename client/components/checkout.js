import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gettingCart} from '../store/cart'

export class Checkout extends Component {
  componentDidMount() {
    this.props.getCartItems()
  }

  render() {
    const totalMerchCost =
      this.props.cartItems.reduce(
        (accum, {quantity, product}) => accum + quantity * product.price,
        0
      ) || 0
    const salesTax = +(totalMerchCost * 0.07).toFixed(2)
    const totalPrice = +(totalMerchCost + salesTax).toFixed(2)
    return (
      <>
        CheckoutPage
        <div>
          Metch Details
          <p>merch: ${totalMerchCost}</p>
          <p>tax: ${salesTax}</p>
          <p>total: ${totalPrice}</p>
        </div>
        <div>Shipping Details</div>
        <p>Need to add a form for inputing shipping addess and pmt info</p>
      </>
    )
  }
}

const mapStateToProps = state => ({
  cartItems: state.cart.cartItems
})

const dispatchToProps = dispatch => ({
  getCartItems: () => dispatch(gettingCart())
})

export default connect(mapStateToProps, dispatchToProps)(Checkout)