import {expect} from 'chai'
import {Checkout} from './checkout'

describe('Checkout functions', () => {
  const checkout = new Checkout()
  const totalMerchCost = Math.random() * 100
  it('totalMerchCost returns 0 dollars if passed no items', () => {
    expect(checkout.totalMerchCost([])).to.equal(0)
  })
  it('order id is properly generated', () => {
    expect(checkout.generateOrderId()).to.have.lengthOf.above(5)
  })
  it('calcSalesTax returns number', () => {
    expect(typeof checkout.calcSalesTax(totalMerchCost)).to.equal('number')
  })
  it('totalPrice returns number', () => {
    expect(typeof checkout.totalPrice(totalMerchCost)).to.equal('number')
  })
})
