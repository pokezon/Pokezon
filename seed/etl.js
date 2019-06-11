const pokeData = require('./pokedex.json')

// mapping through an array of object(pokemon) and destruction out specify key values that we need.
// returning object with values and created values from json
const pokemon = pokeData.map(({id, name: {english}, type, base: {HP}}) => ({
  id,
  name: english,
  type: type[0],
  price: +(Math.random() * 100).toFixed(2),
  description: `A Pokemon of ${type[0]} type with the base HP of ${HP}`
}))

console.log(pokemon)
