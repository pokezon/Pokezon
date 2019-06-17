import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gettingCart} from '../store/cart'
import CartItem from './cartItem'

export class Checkout extends Component {
  render() {
    // console.log('----- CartItem -----', CartItem)
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
          Merchandise Details:
          <p>Merch sub-total: ${totalMerchCost.toFixed(2)}</p>
          <p>Tax: ${salesTax}</p>
          <p>Total: ${totalPrice}</p>
        </div>
        <div>Shipping Details:</div>
        <div>
          <form
            onSubmit={e => this.props.confirmCheckout(this.props.cartItems, e)}
          >
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

const dispatchToProps = dispatch => ({
  getCartItems: () => dispatch(gettingCart())
})

export default connect(null, dispatchToProps)(Checkout)
