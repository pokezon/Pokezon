import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updatingCartItem} from '../store/cart'
const crypto = require('crypto')

class Checkout extends Component {
  generateShippingAddressObj = e => {
    return {
      recipientName: e.target.inputName.value,
      addressLine1: e.target.inputAddress.value,
      addressLine2: e.target.inputAddress2.value || '',
      city: e.target.inputCity.value,
      state: e.target.inputState.value,
      zipCode: e.target.inputZip.value
    }
  }

  generateOrderId = () => {
    return crypto.randomBytes(16).toString('base64')
  }

  confirmCheckout = (cart, e) => {
    const shippingAddressJSON = JSON.stringify(
      this.generateShippingAddressObj(e)
    )

    const thisOrderId = this.generateOrderId()

    cart.forEach(cartItem =>
      this.props.updateCart({
        id: cartItem.id,
        completedFlag: true,
        completedOrderId: thisOrderId,
        shippingAddress: shippingAddressJSON
      })
    )
  }

  totalMerchCost = cart =>
    cart.reduce(
      (accum, {quantity, product}) => accum + quantity * product.price,
      0
    ) || 0

  calcSalesTax = totalMerchCost => +(totalMerchCost * 0.07).toFixed(2)

  totalPrice = totalMerchCost => +(totalMerchCost * 1.07).toFixed(2)

  render() {
    let cart = this.props.isLoggedIn
      ? this.props.cartItems
      : JSON.parse(localStorage.getItem('LocalStorageCart'))

    return (
      <>
        CheckoutPage
        <div>
          Merchandise Details:
          <p>Merch sub-total: ${this.totalMerchCost(cart).toFixed(2)}</p>
          <p>Tax: ${this.calcSalesTax(this.totalMerchCost(cart))}</p>
          <p>Total: ${this.totalPrice(this.totalMerchCost(cart))}</p>
        </div>
        <div>Shipping Details:</div>
        <div>
          <form onSubmit={e => this.confirmCheckout(cart, e)}>
            <div className="form-row">
              <label htmlFor="inputName">Recipient Name:</label>
              <input
                name="inputName"
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Recipient Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress">Address</label>
              <input
                name="inputAddress"
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress2">Address 2</label>
              <input
                name="inputAddress2"
                type="text"
                className="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCity">City</label>
                <input
                  name="inputCity"
                  type="text"
                  className="form-control"
                  id="inputCity"
                  placeholder="City"
                  required
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputState">State</label>
                <input
                  name="inputState"
                  type="text"
                  className="form-control"
                  id="inputState"
                  placeholder="State"
                  required
                />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="inputZip">Zip</label>
                <input
                  name="inputZip"
                  type="text"
                  className="form-control"
                  id="inputZip"
                  placeholder="Zip Code"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Confirm
            </button>
          </form>
        </div>
      </>
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

export default connect(mapStateToProps, dispatchToProps)(Checkout)
