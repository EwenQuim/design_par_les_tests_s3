const analyser = require('../src/analyser')
const Grid = require('../src/grid')
const { YELLOW } = require('../src/token')
const { expect } = require('./test-helper')

describe('analyser', () => {
  describe('isGridWon', () => {
    it('given an empty grid then it returns did not win', () => {
      // ARRANGE
      const emptyGrid = new Grid()

      // ACT
      const result = analyser.isGridWon({ grid: emptyGrid })

      // ASSERT
      expect(result).to.be.false
    })

    it('given a grid with for yellow token on first column then it returns did win', () => {
      // ARRANGE
      const grid = new Grid()
      grid.addToken({ column: 0, token: YELLOW })
      grid.addToken({ column: 1, token: YELLOW })
      grid.addToken({ column: 2, token: YELLOW })
      grid.addToken({ column: 3, token: YELLOW })

      // ACT
      const result = analyser.isGridWon({ grid })

      // ASSERT
      expect(result).to.be.true
    })
  })
})
