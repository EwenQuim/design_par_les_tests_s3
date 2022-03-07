const Grid = require('../src/grid')
const ColumnIsFullError = require('../src/errors/column-is-full-error')
const ColumnDoesNotExistError = require('../src/errors/column-does-not-exist-error')
const { YELLOW, RED } = require('../src/token')
const { expect } = require('./test-helper')


describe('Grid', () => {
  it('given an empty grid when displayed it should be empty', () => {
    // ARRANGE
    const emptyGrid = new Grid()

    // ACT
    const result = emptyGrid.toString()

    // ASSERT
    const expectedEmptyGridString =
      '.......\n' +
      '.......\n' +
      '.......\n' +
      '.......\n' +
      '.......\n' +
      '.......\n'

    expect(result).to.be.equal(expectedEmptyGridString)
  })

  it('given an empty grid when a token is added then it should show that token', () => {
    // ARRANGE
    const grid = new Grid()

    // ACT
    grid.addToken({ column: 0, token: YELLOW })

    // ASSERT
    const serializedGrid = grid.toString()
    const expectedSerializedGrid =
      '.......\n' +
      '.......\n' +
      '.......\n' +
      '.......\n' +
      '.......\n' +
      `${YELLOW}......\n`

    expect(serializedGrid).to.be.equal(expectedSerializedGrid)
  })

  it('given a grid with one yellow token when a red token is added then it should show them stacked', () => {
    // ARRANGE
    const grid = new Grid()
    grid.addToken({ column: 0, token: YELLOW })

    // ACT
    grid.addToken({ column: 0, token: RED })

    // ASSERT
    const serializedGrid = grid.toString()
    const expectedSerializedGrid =
      '.......\n' +
      '.......\n' +
      '.......\n' +
      '.......\n' +
      `${RED}......\n` +
      `${YELLOW}......\n`

    expect(serializedGrid).to.be.equal(expectedSerializedGrid)
  })

  it('given an empty grid when six tokens are added then six are shown', () => {
    // ARRANGE
    const grid = new Grid()

    // ACT
    grid.addToken({ column: 0, token: YELLOW })
    grid.addToken({ column: 0, token: YELLOW })
    grid.addToken({ column: 0, token: YELLOW })
    grid.addToken({ column: 0, token: YELLOW })
    grid.addToken({ column: 0, token: YELLOW })
    grid.addToken({ column: 0, token: YELLOW })

    // ASSERT
    const serializedGrid = grid.toString()
    const expectedSerializedGrid =
      `${YELLOW}......\n` +
      `${YELLOW}......\n` +
      `${YELLOW}......\n` +
      `${YELLOW}......\n` +
      `${YELLOW}......\n` +
      `${YELLOW}......\n`

    expect(serializedGrid).to.be.equal(expectedSerializedGrid)
  })

  it('given a grid with six token in a column when another token is added into that column ' +
    'then it throw an error', () => {
    // ARRANGE
    const grid = new Grid()
    grid.addToken({ column: 0, token: YELLOW })
    grid.addToken({ column: 0, token: YELLOW })
    grid.addToken({ column: 0, token: YELLOW })
    grid.addToken({ column: 0, token: YELLOW })
    grid.addToken({ column: 0, token: YELLOW })
    grid.addToken({ column: 0, token: YELLOW })

    // ACT & ASSERT
    expect(() => grid.addToken({ column: 0, token: YELLOW })).to.throw(ColumnIsFullError)
  })

  it('given a grid when a token is inserted in a non existing column then it should throw an error', () => {
    // ARRANGE
    const grid = new Grid()

    // ACT
    expect(() => grid.addToken({ column: -1, token: YELLOW })).to.throw(ColumnDoesNotExistError)
    expect(() => grid.addToken({ column: 7, token: YELLOW })).to.throw(ColumnDoesNotExistError)
  })

  it('given a grid when a token is inserted in the seventh column then it should not throw an error', () => {
    // ARRANGE
    const grid = new Grid()

    // ACT
    expect(() => grid.addToken({ column: 6, token: YELLOW })).to.not.throw()
  })

  it('given a grid with one yellow token in the first column when a red token is added to the column next to it' +
    ' then it should show them side by side', () => {
    // ARRANGE
    const grid = new Grid()
    grid.addToken({ column: 0, token: YELLOW })

    // ACT
    grid.addToken({ column: 1, token: RED })

    // ASSERT
    const serializedGrid = grid.toString()
    const expectedSerializedGrid =
      '.......\n' +
      '.......\n' +
      '.......\n' +
      '.......\n' +
      '.......\n' +
      `${YELLOW}${RED}.....\n`

    expect(serializedGrid).to.be.equal(expectedSerializedGrid)
  })
})
