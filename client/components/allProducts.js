import React, {Component} from 'react'
import {gettingAllProducts} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllProducts extends Component {
  async componentDidMount() {
    await this.props.getProducts()
  }
  render() {
    console.log(this.props)
    if (!this.props.allProducts) return 'WEBSITE SEIZED BY THE U.S. GOVERNMENT'
    return (
      <div>
        <h2>Our Wonderful Collection</h2>
        {this.props.allProducts.map(product => {
          return (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <h4>{product.name}</h4>
                <img src={product.imageUrl} />
              </Link>
              <button type="button">Add To Cart</button>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({allProducts: state.allProducts})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(gettingAllProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
