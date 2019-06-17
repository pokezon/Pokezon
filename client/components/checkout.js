import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gettingCart} from '../store/cart'
import CartItem from './cartItem'

export class Checkout extends Component {
  render() {
    console.log('----- CartItem -----', CartItem)
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
          <p>Merch sub-total: ${totalMerchCost}</p>
          <p>Tax: ${salesTax}</p>
          <p>Total: ${totalPrice}</p>
        </div>
        <div>Shipping Details:</div>
        <div>
          <form>
            <div className="form-row">
              <label htmlFor="inputName">Recipient Name:</label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Recipient Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress">Address</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress2">Address 2</label>
              <input
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
                  type="text"
                  className="form-control"
                  id="inputCity"
                  placeholder="City"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputState">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputState"
                  placeholder="State"
                />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="inputZip">Zip</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputZip"
                  placeholder="Zip Code"
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
