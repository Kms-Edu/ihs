import React from 'react'
const protocol = (process.env.NOW_REGION || process.env.NOW) ? 'https://' : 'http://'
export default (App) => {
  return class MobileDetectApp extends React.Component {
    static displayName = 'withMobileDetect(App)'
    static async getInitialProps (appContext) {
      const {req, res} = appContext.ctx
      if (req) {
        let MobileDetect = require('mobile-detect')
        const md = new MobileDetect(req.headers['user-agent']);
        if (md.mobile()) {
          const redirectUrl = `${protocol}${req.headers['host']}/m`
          console.log(redirectUrl)
          res.writeHead(301, {
            Location: redirectUrl
          })
          res.end()
          return {}
        }
      } 
      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      return {
        ...appProps,
      }
    }

    render () {
      return <App {...this.props} />
    }
  }
}