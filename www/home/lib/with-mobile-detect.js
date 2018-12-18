import App, { Container } from 'next/app'

const withMobileDetect = AppContainer =>
  class extends App {
    static async getInitialProps (props) {
      const { ctx, } = props
      const {req} = ctx
      let isMobile = null
      if (req) {
        const MobileDetect = require('mobile-detect')
        const md = new MobileDetect(req.headers['user-agent']);
        isMobile = md.mobile()
        ctx.isMobile = isMobile
      }
      
/*
      const { req } = ctx
      if (req) {
        console.log(`m.${req.headers.host}`)
      }      
*/    
      if (!isMobile) {
        let appProps = {}
        if (AppContainer.getInitialProps) {
          appProps = await AppContainer.getInitialProps(props)
        }
        
        return { ...appProps }
      } else {
        return {
          isMobile
        }
      }
    }

    render () {  
      return (
        <Container>
          <AppContainer {...this.props} />
        </Container>
      )
    }
  }

export default withMobileDetect