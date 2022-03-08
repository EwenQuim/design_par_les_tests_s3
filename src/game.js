class Game {
  constructor({ terminal }) {
    this.terminal = terminal
  }

  start() {
    this.terminal.print('Let’s a goooooo!')
    this.terminal.readInput('It’s Yellow’s turn to play: ')
  }
}

module.exports = Game