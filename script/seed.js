'use strict'
const {pokemon} = require('../seedData/etl')
const db = require('../server/db')
const {User, Order, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      username: 'cMaster'
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      username: 'murphMaster'
    })
  ])

  const products = await Promise.all(
    pokemon.map(pokemon =>
      Product.create({
        name: pokemon.name,
        type: pokemon.type,
        price: pokemon.price,
        imageUrl: pokemon.imageUrl,
        description: pokemon.description,
        quantity: pokemon.quantity
      })
    )
  )

  const orders = await Promise.all([
    Order.create({
      quantity: 2,
      completedFlag: true,
      userId: users[0].id,
      productId: products[3].id
    }),
    Order.create({
      quantity: 2,
      completedFlag: false,
      userId: users[1].id,
      productId: products[500].id
    }),
    Order.create({
      quantity: 2,
      completedFlag: false,
      userId: users[0].id,
      productId: products[13].id
    }),
    Order.create({
      quantity: 2,
      completedFlag: true,
      userId: users[1].id,
      productId: products[53].id
    }),
    Order.create({
      quantity: 2,
      completedFlag: false,
      userId: users[0].id,
      productId: products[1].id
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
