const { YELLOW } = require('./token')
const { RED } = require('./token')
const analyser = {
  isGridWon({ grid }) {
    const gridString = grid.toString()
    const firstRow = gridString.split('\n')[5]

    const rowWonRegex = new RegExp(`(${RED}${RED}${RED}${RED}|${YELLOW}${YELLOW}${YELLOW}${YELLOW})`)

    return rowWonRegex.test(firstRow)
  },
}

module.exports = analyser