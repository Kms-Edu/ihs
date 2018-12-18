const env = require('./env')
const homePrefix = env['WWW_HOME_PREFIX']
const blogPrefix = env['WWW_BLOG_PREFIX']
const dashboardPrefix = env['WWW_DASHBOARD_PREFIX']
const headers = (age) => {
  return {
    "cache-control": `max-age=${age}`
  }
}
const staticNextRoutes = [homePrefix, blogPrefix, dashboardPrefix].map(item => {
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
    src: "/dashboard",
    headers: headers(600),
    dest: `${dashboardPrefix}/index`
  },
  {
    src: "/hello-world",
    headers: headers(600),
    dest: `${blogPrefix}/hello-world`
  },
  {
    src: "/archives",
    headers: headers(600),
    dest: `${blogPrefix}/archives`
  },
]
