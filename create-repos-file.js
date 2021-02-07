const fs = require('fs')
const https = require('https')

function startsWithPage(filename) { return filename.startsWith('page') }

function requireFiles(allFiles, file) {
  const contents = require(`./${file}`)
  return [...allFiles, ...contents]
}

let username

const options = {
  host: 'api.github.com',
  method: 'GET',
  headers: { 'user-agent': 'node.js' }
}

try {
  username = process.argv[2].split('=')[1]
  if (!username) throw ('It looks like the correct format wasn\'t used for the username argument.\n')
} catch (e) {
  const errorStr = typeof e === 'string' ? e : ''
  console.error('\n❌ Please pass in your GitHub username.\n', errorStr)
  process.exit(1)
}

function getPage(pageNumber) {
  const path = `/users/${username}/repos?type=sources&per_page=100&page=${pageNumber}`

  https.get({ ...options, path }, res => {
    res.setEncoding('utf-8')

    let body = ''

    if (res.statusCode === 200)
      res
        .on('data', chunk => body += chunk)
        .on('end', () => {
          if (body.length > 2) {
            fs.writeFileSync(`./page${pageNumber}.json`, body)
            getPage(++pageNumber)
          }
        })
        .on('error', console.error)
    else console.log(`GET request to GitHub API failed with a ${res.statusCode}.`)
  })
}

getPage(1)

const pages = fs.readdirSync(process.cwd()).filter(startsWithPage)

const allTheThings = pages.reduce(requireFiles, [])

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
