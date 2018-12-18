const common = require('./common')
const builds = require('./builds')
const routes = require('./routes')
const build = require('./build')
const env = require('./env')
module.exports = {
  ...common,
  builds,
  routes,
  build,
  env,
}
