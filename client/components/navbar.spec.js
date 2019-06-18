/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Navbar} from './navbar'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Navbar guest', () => {
  let navbar

  beforeEach(() => {
    navbar = shallow(<Navbar isLoggedIn={false} />)
  })

  it('if user is not logged in, it will render a sign', () => {
    expect(
      navbar
        .find('Link')
        .at(1)
        .props().to
    ).to.be.equal('/signup')
  })
})

describe('Navbar user', () => {
  let navbar

  beforeEach(() => {
    navbar = shallow(<Navbar isLoggedIn />)
  })

  it('if user is logged in, it will render a home link first', () => {
    expect(
      navbar
        .find('Link')
        .at(1)
        .props().to
    ).to.be.equal('/home')
  })
})
