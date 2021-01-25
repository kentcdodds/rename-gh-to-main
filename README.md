# Rename GH default branches from "master" to "main"

[Why?](https://www.theserverside.com/feature/Why-GitHub-renamed-its-master-branch-to-main)

This is a Cypress "test" that allows you to quickly rename all your GitHub
repository default branches from `master` to `main`.

Steps:

1. clone this repo
2. `npm install`
3. create repos.json file (see `create-repos-file.js` for help making that)
   which is an array of URLs to all the repos you want to rename
4. Run `npm run cy`
5. Run the test "rename"
6. Login with your credentials and then press "resume"
7. Watch it all run!

Woo!

Watch the live stream of this being built here:
https://www.youtube.com/watch?v=xD5ArlskA1w
