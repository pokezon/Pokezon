/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Cart} from './cart'
import {updatingCartItem} from '../store/cart'
import {CartItem} from './cartItem'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Cart Item will not render with empty cart Items', () => {
  let cart

  beforeEach(() => {
    cart = shallow(
      <Cart isLoggedIn cartItems={[]} updateCart={updatingCartItem} />
    )
  })

  it('if guest has no items, no CartItem components will be rendered', () => {
    expect(cart.find('CartItem').length).to.be.equal(0)
  })
})
