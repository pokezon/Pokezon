import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updatingCartItem} from '../store/cart'
import {Link} from 'react-router-dom'
const crypto = require('crypto')

export class Checkout extends Component {
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
        <br />
        <h1 align="center">
          -$<img
            src="https://icons-for-free.com/iconfiles/png/512/coin+game+go+play+pokemon+icon-1320186969869729405.png"
            width="6%"
          />$-
        </h1>
        <div className="checkoutPage">
          <div>
            <h3>Merchandise Details:</h3>
            <br />
            <div>
              <h4>
                <img
                  src="https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-1/135/_Coin-512.png"
                  width="8%"
                />{' '}
                Merch sub-total: ${this.totalMerchCost(cart).toFixed(2)}
              </h4>
              <h4>
                <img
                  src="https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-1/135/_Coin-512.png"
                  width="8%"
                />{' '}
                Tax: ${this.calcSalesTax(this.totalMerchCost(cart))}
              </h4>
            </div>
            <br />
            <h4>
              <img
                src="https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-1/135/_Coin-512.png"
                width="8%"
              />{' '}
              Total: ${this.totalPrice(this.totalMerchCost(cart))}
            </h4>

            <br />
            <img
              src="https://pbs.twimg.com/media/DT8tZgwXUAEcM6q.png:large"
              width="60%"
            />
            <img
              src="https://icons-for-free.com/iconfiles/png/512/coin+game+go+play+pokemon+icon-1320186969869729405.png"
              width="25%"
            />
          </div>

          {/* <div>Shipping Details:</div> */}
          <div>
            <h3>Shipping Details:</h3>
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
              <div className="form-row">
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
              <div className="form-row">
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
                <label htmlFor="inputCity">City</label>
                <input
                  name="inputCity"
                  type="text"
                  className="form-control"
                  id="inputCity"
                  placeholder="City"
                  required
                />
                <div className="form-row col-md-4">
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
                <div className="form-group col-md-4">
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
              <br />
              <div className="checkoutButtons">
                <button type="submit" className="btn btn-success">
                  Confirm
                </button>
                <Link to="/cart">
                  <button className="btn btn-primary">Back to Cart</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
        <br />
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
