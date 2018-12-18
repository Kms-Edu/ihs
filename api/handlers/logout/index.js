const { query } = require('graphqurl');
const dev = process.env.NODE_ENV !== 'production'
const API_HOST = dev ? 'edu-1.herokuapp.com/v1alpha1/graphql' : process.env.API_HOST
const JWT_SECRET = dev ? 'test' : process.env.JWT_SECRET
const jwt = require('jsonwebtoken')
const axios = require('axios')
const Koa = require('koa')
const koaBody = require('koa-body')
const responseTime = require('../../middlewares/response-time')
const errorHandler = require('../../middlewares/error-handler')
const acceptedContentType = require('../../middlewares/accept-content-type')
const not_now = !process.env.NOW_REGION
function createJwtToken({id, active}){
  return jwt.sign({id, active}, JWT_SECRET);
}

function googleVerifyUri(id_token){
  return `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`
}

function setCookie(ctx, token) {
  ctx.cookies.set('token', token, { maxAge: 900000, httpOnly: true, secure: !dev });    
}

function clearCookie(ctx) {
  ctx.cookies.set('token', null)
}
async function createUser(gql, variables) {
  try {
    const data = await query(
      {
        query: gql,
        variables,
        endpoint: `https://${API_HOST}`,
        headers: {
          'x-hasura-access-key': 'tanphong',
        }
      }
    )
    return data
  } catch (error) {
    if (dev) console.log(error)
    return false
  }
}
const gql = `
mutation upsert_user($name:String!, $email:String!, $first_name:String,$last_name:String,$image_url:String,$active:Boolean!) {
  insert_sche_users(
    objects: [
      {name: $name, email:$email, first_name:$first_name, last_name:$last_name, image_url:$image_url,active:$active}        
    ],
    on_conflict: {
      constraint: sche_users_email_key,
      update_columns: [name, first_name, last_name, image_url,active]
    }
  ) {
    affected_rows
    returning{
      id
      active
    }
  }
}
`    

const app = new Koa()
if (not_now) {
  const cors = require('@koa/cors');
  app.use(cors());
}
app.use(koaBody({ jsonLimit: '1kb' }))
app.use(responseTime)
app.use(errorHandler.use)
app.on('Error', errorHandler.on)
app.use(acceptedContentType)

const main = async ctx => {
  const { id_token } = ctx.request.body
  try {
    const { 
      data: { 
        name, 
        email, 
        family_name, 
        given_name, 
        picture, 
      } 
    } = await axios.get(googleVerifyUri(id_token))
    
    const variables = { 
      name, email, first_name:family_name, last_name:given_name, image_url:picture, active: true 
    }
    if (dev) console.log(variables)
    const res = await createUser(gql, variables)
    console.log(res)
    let info1 = res.data.insert_sche_users.returning[0]
    const token = createJwtToken(info1)
    setCookie(ctx, token)
    ctx.body = { token, }    
  } catch (error) {
    if (dev) console.log(error)
    clearCookie(ctx)
    ctx.body = { token: null }
  }
}

app.use(main)

// to test locally, is there a better way?
if (not_now) app.listen(3001)
module.exports = app.callback()
