
const getToken = (ctx) => {
  try {
    if (ctx && ctx.req) {
      const cookie = require('cookie');
      const cookies = cookie.parse(ctx.req.headers.cookie)
      return cookies.token
    } else {
      return localStorage.getItem('token')
    }
  } catch (error) {
    return null
  }
}

export default getToken
