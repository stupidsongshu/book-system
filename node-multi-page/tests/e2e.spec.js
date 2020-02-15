const Rize = require('rize')

// describe('test github search Node.js', () => {
//   it('test', async () => {
//     const rize = new Rize({ headless: false })
//     rize
//       .goto('https://github.com/')
//       .type('input.header-search-input', 'node')
//       .press('Enter')
//       .waitForNavigation()
//       .assertSee('Node.js')
//     await rize.end() // Don't forget to call `end` function to exit browser!
//   })
// })

const rize = new Rize({ headless: false })
// rize
//   .goto('https://github.com/')
//   .type('input.header-search-input', 'node')
//   .press('Enter')
//   .waitForNavigation()
//   .assertSee('Node.js')
//   .end()  // Don't forget to call `end` function to exit browser!

rize
  .goto('http://localhost/books/list')
  .assertSee('result.data list')
  .end()
