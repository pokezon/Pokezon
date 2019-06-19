import React, {Component} from 'react'
import {gettingAllProducts} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'

class Featured extends Component {
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    return (
      <div>
        {!this.props.allProducts ? (
          'WEBSITE SEIZED BY OFFICER JENNY'
        ) : (
          <div>
            <br />
            <h1 className=" text-center text-dark">
              <img
                src="https://static.thenounproject.com/png/551642-200.png"
                width="5%"
              />{' '}
              Welcome to pokézon.{' '}
              <img
                src="https://static.thenounproject.com/png/551643-200.png"
                width="5%"
              />
            </h1>
            <div>
              <Carousel className="carousel-text-align">
                <Carousel.Item>
                  <Link to="/products/2">
                    <div>
                      <img
                        src="https://vignette.wikia.nocookie.net/pokemon/images/e/e4/Tierno_Charmander.png/revision/latest?cb=20171128041706"
                        width="55%"
                        alt="First slide"
                      />
                      <Carousel.Caption>
                        <h2 className="text-white text-shadow">
                          MORE CHARMANDERS!
                        </h2>
                        <p className="text-white text-shadow">
                          Due to popular demand. Everyone's favorite lizard is
                          back in stock!
                        </p>
                      </Carousel.Caption>
                    </div>
                  </Link>
                </Carousel.Item>
                <Carousel.Item>
                  <Link to="/products/6">
                    <div>
                      <img
                        src="https://cdna.artstation.com/p/assets/images/images/009/896/578/large/ubeyd-yuruk-screenshot001.jpg?1521473780"
                        width="55%"
                        alt="Second slide"
                      />
                      <Carousel.Caption className="text-dark">
                        <h2 className="text-white text-shadow ">SQUAD UP</h2>
                        <p className="text-white text-shadow ">
                          The boys are back
                        </p>
                      </Carousel.Caption>
                    </div>
                  </Link>
                </Carousel.Item>

                <Carousel.Item>
                  <Link to="/products/128">
                    <div>
                      <img
                        src="https://daily.pokecommunity.com/wp-content/uploads/2016/04/whos_that_pokemon_eevee.png"
                        width="55%"
                        alt="Third slide"
                        border-radius="20px"
                      />

                      <Carousel.Caption className="text-dark text-shadow">
                        <h2 className="text-white text-shadow">
                          And Our Pokemon of the Month is..........!!!
                        </h2>
                        <p className="text-white">
                          Everyone loves this pokemon!
                        </p>
                      </Carousel.Caption>
                    </div>
                  </Link>
                </Carousel.Item>
              </Carousel>
            </div>
            <br />
          </div>
        )}
        <h1 className=" text-center text-dark">
          -{' '}
          <img
            src="https://static.thenounproject.com/png/551641-200.png"
            width="5%"
          />{' '}
          -
        </h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({allProducts: state.products.allProducts})

// FOR ME(AMNEET): PRODUCTS LAYER IS CREATED FROM REDUCER SO U NEED TO GO TO THAT LAYER

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(gettingAllProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Featured)
