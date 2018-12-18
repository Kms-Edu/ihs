const env = require('./env')
const homePrefix = env['MOBILE_HOME_PREFIX']
const headers = (age) => {
  return {
    "cache-control": `max-age=${age}`
  }
}
const staticNextRoutes = [homePrefix].map(item => {
  return {
    src: `${item}/_next/(.*)`,
    headers: headers(31536000),
    dest: `${item}/_next/$1`
  }
})

module.exports = [  
  { "src": "/favicon.ico", "dest": "/static/favicon.ico" },
  { "src": "/robots.txt", "dest": "/static/robots.txt" },   
  { "src": "/static/logo.png", headers: headers(31536000), "dest": "/static/logo.png" },   
   
  ...staticNextRoutes,
  {
    src: "/",
    headers: headers(600),
    dest: `${homePrefix}/index`
  },
  {
    src: "/about",
    headers: headers(600),
    dest: `${homePrefix}/about`
  },  
  {
    "src": "/service-worker.js",
    "dest": `${homePrefix}/_next/static/service-worker.js`,
    "headers": {
      "cache-control": "public, max-age=43200, immutable",
      "Service-Worker-Allowed": "/"
    }
  },
  {
    "src": "/(.*)",
    "dest": `${homePrefix}/$1`,
    "headers": {
      "cache-control": "public, max-age=43200, immutable",
      "Service-Worker-Allowed": "/"
    }
  },
]
