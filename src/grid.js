const ColumnIsFullError = require('./errors/column-is-full-error')
const ColumnDoesNotExistError = require('./errors/column-does-not-exist-error')

const EMPTY_CELL = '.'

class Grid {
  constructor() {
    this.state =
      '.......\n' +
      '.......\n' +
      '.......\n' +
      '.......\n' +
      '.......\n' +
      '.......\n'
  }

  addToken({column, token}) {
    const columnIndexIsWrong = column < 0 || column > 6
    if(columnIndexIsWrong) {
      throw new ColumnDoesNotExistError()
    }

    const { newState, tokenInserted } = this.state.split('\n')
      .reduceRight((accumulator, currentRow) => {

        const cellIsEmpty = currentRow[column] === EMPTY_CELL
        const tokenNotInsertedYet = !accumulator.tokenInserted

        if(cellIsEmpty && tokenNotInsertedYet) {
          const rowWithToken = currentRow.substr(0, column) + token + currentRow.substr(column + 1, currentRow.length)
          accumulator.newState = rowWithToken + '\n' + accumulator.newState
          accumulator.tokenInserted = true
        } else {
          accumulator.newState = currentRow + '\n' + accumulator.newState
        }

        return accumulator
      }, { newState: '', tokenInserted: false })

    if(!tokenInserted) {
      throw new ColumnIsFullError()
    }

    this.state = newState.replace('\n\n', '\n')
  }

  toString() {
    return this.state
  }
}

module.exports = Grid