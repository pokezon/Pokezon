import React, {Component} from 'react'
import {gettingProduct} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addingCartItem, gettingCart, updatingCartItem} from '../store/cart'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
    if (this.props.isLoggedIn) {
      this.props.gettingCart()
    }
  }

  addItem = product => {
    if (this.props.isLoggedIn) {
      const foundItemInCart = this.props.cart.find(
        cartItem => cartItem.productId === product.id
      )
      if (foundItemInCart) {
        this.props.updatingCartItem({
          id: foundItemInCart.id,
          quantity: foundItemInCart.quantity + 1
        })
      } else {
        this.props.addCartItem(product)
      }
      // that is dispatch
    } else {
      let localStorageCart = JSON.parse(
        localStorage.getItem('LocalStorageCart')
      )
      const foundItemInCart = localStorageCart.find(
        cartItem => cartItem.product.id === product.id
      )
      if (foundItemInCart) {
        localStorageCart = localStorageCart.map(item => {
          if (item.id === foundItemInCart.id) {
            return {
              id: item.id,
              product: product,
              quantity: 1 + foundItemInCart.quantity
            }
          }
          return item
        })
      } else {
        localStorageCart.push({
          id: localStorageCart.length,
          product: product,
          quantity: 1
        })
      }

      localStorage.setItem('LocalStorageCart', JSON.stringify(localStorageCart))
    }
  }

  render() {
    const product = this.props.product
    if (!product) {
      return (
        <div>
          <h1>NOT DISCOVERED YET</h1>
        </div>
      )
    } else {
      return (
        <div align="center">
          <br />
          <br />
          <div className="singleProductContainer test">
            <div className="singleProductImage">
              <img src={product.imageUrl} width="100%" />
            </div>
            <div className="singleProductInfoBox">
              <h1>
                {product.name}: The {product.type} Pokémon
              </h1>
              <h3>
                <img
                  src="https://cdn0.iconfinder.com/data/icons/pokemon-go-vol-1/135/_Coin-512.png"
                  width="8%"
                />{' '}
                ${product.price}
              </h3>
              <br />
              <h4>{product.description}</h4>
              <div>
                <br />
                <img
                  src="https://i.ya-webdesign.com/images/open-pokeball-png-8.png"
                  width="8%"
                />
                <button
                  className="btn btn-primary"
                  onClick={() => this.addItem(product)}
                  type="button"
                  id="brand-name"
                >
                  Add To Cart
                </button>
              </div>
              <br />
              <Link to="/products">
                <button className="btn btn-dark" type="button" id="brand-name">
                  Back to All Products{' '}
                </button>
              </Link>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  product: state.products.selectedProduct,
  isLoggedIn: !!state.user.id,
  cart: state.cart.cartItems
})

const mapDispatchToProps = dispatch => ({
  getProduct: id => dispatch(gettingProduct(id)),
  addCartItem: product => dispatch(addingCartItem(product)),
  gettingCart: () => dispatch(gettingCart()),
  updatingCartItem: item => dispatch(updatingCartItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
