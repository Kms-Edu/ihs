const not_now = !(process.env.NOW_REGION || process.env.NOW)
const prefix = not_now ? '' : process.env.MOBILE_HOME_PREFIX
const withOffline = moduleExists('next-offline')
  ? require('next-offline')
  : {};
const withCSS = moduleExists("@zeit/next-css") 
  ? require("@zeit/next-css") 
  : {};

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  // eslint-disable-next-line
  require.extensions['.css'] = (file) => {}
}
  
const nextConfig = {
  assetPrefix: prefix,
  registerSwPrefix: prefix,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'networkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
}

module.exports = moduleExists('next-offline') && moduleExists('@zeit/next-css')
  ? withCSS(withOffline(nextConfig))
  : nextConfig

function moduleExists(name) {
  try {
    return require.resolve(name);
  } catch (error) {
    return false;
  }
}
