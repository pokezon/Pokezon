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
      localStorageCart.push({id: localStorageCart.length, product: product})
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
        <div className="text-center">
          <h2>{product.name}</h2>
          <img src={product.imageUrl} width="200" />
          <h2>The {product.type} Pokemon</h2>
          <h4>${product.price}</h4>
          <h3>{product.description}</h3>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => this.addItem(product)}
            >
              Add To Cart
            </button>
          </div>
          <br />
          <Link to="/products">
            <button className="btn btn-dark">Back to All Products </button>
          </Link>
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
