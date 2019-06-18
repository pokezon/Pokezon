const pokeData = require('./pokedex.json')

// mapping through an array of object(pokemon) and destructuring out specify key values that we need.
// returning object with values and creating values from json

const padToThree = number => {
  if (number <= 9) return `00${number}`
  else if (number <= 99) return `0${number}`
  return number
}

const pokemon = pokeData.map(
  ({id, name: {english}, type, base: {HP, Attack, Defense}}) => ({
    id,
    name: english,
    type: type[0],
    price: +(Math.random() * 100).toFixed(2),
    description: `A Pokemon of ${
      type[0]
    } type with the base HP of ${HP}. With its ${Attack} Attack and ${Defense} Defense, this Pokémon will be a great asset to your collection!`,
    imageUrl: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${padToThree(
      id
    ) + english}.png`,
    quantity: Math.floor(Math.random() * 100)
  })
)

module.exports = {pokemon}
