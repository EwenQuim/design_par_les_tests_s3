const readline = require('readline')

class Terminal {
  constructor() {
  }

  print({ message }) {
    console.log(message)
    return Promise.resolve()
  }

  readInput({ questionMessage }) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    return new Promise((resolve) => {
      rl.question(questionMessage, function (name) {
        rl.close()
        resolve(name)
      })
    })
  }
}

module.exports = Terminal