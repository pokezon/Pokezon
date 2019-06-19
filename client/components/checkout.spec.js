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
  it('calcSalesTax returns number of decimal len 2', () => {
    expect(
      Number.isInteger(checkout.calcSalesTax(totalMerchCost) * 100)
    ).to.equal(true)
  })
  it('totalPrice returns number of decimal len 2', () => {
    expect(
      Number.isInteger(checkout.totalPrice(totalMerchCost) * 100)
    ).to.equal(true)
  })
})
