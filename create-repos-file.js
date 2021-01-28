// run this with: node ./create-repos-file.js
const fs = require('fs')

// create these files using:

// curl "https://api.github.com/users/USERNAME/repos?type=sources&per_page=100&page=1" > page1.json
// etc... or make this more useful I guess...

const allTheThings = [
  ...require('./page1.json'),
  ...require('./page2.json'),
  ...require('./page3.json'),
  ...require('./page4.json'),
  ...require('./page5.json'),
  ...require('./page6.json'),
  ...require('./page7.json'),
]

const desiredRepos = allTheThings
  .filter(
    b =>
      !b.fork &&
      !b.archived &&
      !b.disabled &&
      b.default_branch === 'master'
  )
  .map(b => b.html_url)

// write the relevant repos to ./repos.json
fs.writeFileSync('./repos.json', JSON.stringify(desiredRepos, null, 2))
