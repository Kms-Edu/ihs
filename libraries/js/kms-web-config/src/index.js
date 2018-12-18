import babelConfig from './lib/babel'
//const not_now = !(process.env.NOW_REGION || process.env.NOW)
//const prefix = not_now ? '' : process.env.MOBILE_HOME_PREFIX
import nextConfig from './lib/next'

export default {
  nextConfig,
  babelConfig,
}
