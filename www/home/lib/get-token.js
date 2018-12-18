
const getToken = (ctx) => {
  if (ctx && ctx.req) {
    const cookie = require('cookie');
    const cookies = cookie.parse(ctx.req.headers.cookie)
    return cookies.token
  } else {
    return localStorage.getItem('token')
  }
}

export default getToken
