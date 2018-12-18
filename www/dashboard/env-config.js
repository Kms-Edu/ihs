const not_now = !process.env.NOW_REGION
const web_host = not_now ? 'http://localhost:3000' : process.env.WEB_HOST
const api_host = not_now ? 'http://localhost:3001' : process.env.API_HOST
const mobile_host = process.env.MOBILE_HOST

module.exports = {
  'process.env.NOW_REGION': process.env.NOW_REGION,
  'process.env.BASE_URL': not_now ? 'http://localhost:3000' : process.env.NOW_URL,
  'process.env.GRAPHQL_HOST': not_now ?  'edu-1.herokuapp.com/v1alpha1/graphql' : process.env.GRAPHQL_HOST,
  'process.env.NODE_ENV': process.env.NODE_ENV,
  'process.env.GOOGLE_CLIENT_ID': not_now ? '348227035708-ter7nr3ckok77jn08h1sjtircno59jkj.apps.googleusercontent.com' : process.env.GOOGLE_CLIENT_ID,
  'process.env.WEB_HOST': web_host,
  'process.env.API_HOST': api_host,
  'process.env.MOBILE_HOST': mobile_host,
}
