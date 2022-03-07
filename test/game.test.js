const Game = require('../src/game')

describe('Game', () => {
  it('given a new game when started then it prints the welcome message', () => {
    // ARRANGE
    const mockTerminal = { print: sinon.stub(), readInput: sinon.stub() }
    const newGame = new Game({ terminal: mockTerminal })

    // ACT
    newGame.start()

    // ASSERT
    const welcomeMessage = 'Let’s a goooooo!'
    expect(mockTerminal.print).to.have.been.calledOnceWith(welcomeMessage)
  })

  it('given a new game when started then it asks for yellow player to start', () => {
    // ARRANGE
    const mockTerminal = { print: sinon.stub(), readInput: sinon.stub() }
    mockTerminal.print.resolves()
    mockTerminal.readInput.resolves(1)

    const newGame = new Game({ terminal: mockTerminal })

    // ACT
    newGame.start()

    // ASSERT
    const yellowTurnMessage = 'It’s Yellow’s turn to play: '
    expect(mockTerminal.readInput).to.have.been.calledOnceWith(yellowTurnMessage)
  })
})
