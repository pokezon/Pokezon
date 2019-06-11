const {pokemon} = require('./etl')
const db = require('../server/db')
const {User, Order, Product} = require('..server/db/models')

console.log(pokemon)

const seed = async () => {
  await db.sync({force: true})

  const [user1] = await Promise.all([
    User.create({
      email: 'j@gamil.com',
      username: 'jMaster',
      password: 'pokemaster'
    })
  ])
  console.log('Seeding success!')
  db.close()
}

seed().catch(err => {
  console.error(red('Oh noes! Something went wrong!'))
  console.error(err)
  db.close()
})

// const pokemon = pokeData.map(({id, name: {english}, type, base: {HP}}) => ({
//     id,
//     name: english,
//     type: type[0],
//     price: +(Math.random() * 100).toFixed(2),
//     description: `A Pokemon of ${type[0]} type with the base HP of ${HP}`,
//     imageUrl: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${padToThree(
//       id
//     ) + english}.png`
//   }))
