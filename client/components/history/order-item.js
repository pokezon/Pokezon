import React from 'react'
import SingleProduct from '../singleProduct'

const OrderItem = ({order}) => {
  // return <SingleProduct />
  return (
    <>
      <p>
        Order Id:
        <span>{order.completedOrderId}</span>
      </p>
      <p>
        Product Name: <span>{order.product.name}</span>
      </p>
      <p>
        Created At:<span>{order.createdAt}</span>
      </p>
    </>
  )
}

export default OrderItem
