import React from 'react'
import Document, {Head, Main, NextScript} from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import flush from 'styled-jsx/server'

export default (mobileHost) => 
  class MyDocument extends Document {
    static async getInitialProps (ctx) {  
      const { isMobile } = ctx
      if (isMobile) {
        return {
          isMobile
        }
      } else {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage
        ctx.renderPage = () => originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(
            <App {...props} />
          )
        })
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps, styles: [...initialProps.styles, ...sheet.getStyleElement(), flush()]}
        
      }  
    }

    render() {    
      const {isMobile} = this.props
      if (isMobile) {
        return (
          <meta httpEquiv="refresh" content={`0;url="https://${mobileHost}"`} />
        )
      }
      return (
        <html lang="en">
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </html>
      )   
    }
  }
