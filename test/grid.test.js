const Grid = require('../src/grid')
const ColumnIsFullError = require('../src/errors/column-is-full-error')
const ColumnDoesNotExistError = require('../src/errors/column-does-not-exist-error')
const { YELLOW } = require('../src/token')
const { expect } = require('./test-helper')


describe('Grid', () => {
  it('should be a empty grid when empty', () => {
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

  it('should show a token in first column when one added to that column', () => {
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

  it('should show a three tokens in first column when two added to that column', () => {
    // ARRANGE
    const grid = new Grid()

    // ACT
    grid.addToken({ column: 0, token: YELLOW })
    grid.addToken({ column: 0, token: YELLOW })
    grid.addToken({ column: 0, token: YELLOW })

    // ASSERT
    const serializedGrid = grid.toString()
    const expectedSerializedGrid =
      '.......\n' +
      '.......\n' +
      '.......\n' +
      `${YELLOW}......\n` +
      `${YELLOW}......\n` +
      `${YELLOW}......\n`

    expect(serializedGrid).to.be.equal(expectedSerializedGrid)
  })

  it('should show a six tokens in first column when six added to that column', () => {
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

  it('should throw an error if a seventh token is inserted in the same column', () => {
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
    expect(() => grid.addToken({ column: 0, token: YELLOW })).to.throw(ColumnIsFullError)
  })

  it('should throw an error if a token is inserted in not existing columns', () => {
    // ARRANGE
    const grid = new Grid()

    // ACT
    expect(() => grid.addToken({ column: -1, token: YELLOW })).to.throw(ColumnDoesNotExistError)
    expect(() => grid.addToken({ column: 7, token: YELLOW })).to.throw(ColumnDoesNotExistError)
  })

  it('should not throw an error if a token inserted in the seventh column', () => {
    // ARRANGE
    const grid = new Grid()

    // ACT
    expect(() => grid.addToken({ column: 6, token: YELLOW })).to.not.throw()
  })
})
