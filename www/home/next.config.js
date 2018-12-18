const dev = process.env.NODE_ENV !== 'production'
const not_now = !process.env.NOW_REGION
const prefix = not_now ? '' : process.env.WWW_HOME_PREFIX

const { PHASE_PRODUCTION_SERVER } =
  dev
    ? {}
    : not_now // ℹ️ Must be `NOW_REGION`, not `NOW` (my bad)
      ? require('next/constants')
      : require('next-server/constants');

const sharedConfig = {
  assetPrefix: prefix,
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    if (config.mode === 'production') {
      const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
      if (Array.isArray(config.optimization.minimizer)) {
        config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
      }
      
      const Critters = require('critters-webpack-plugin');
      config.plugins.concat([
        new Critters({preload: 'swap'})
      ])
            
    }
    config.module.rules.push(
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      }
    )

    config.output.publicPath = `${prefix}${config.output.publicPath}`;

    return config
  }
}

module.exports = (phase, {defaultConfig}) => {
  if (phase === PHASE_PRODUCTION_SERVER && !not_now) {
    return {
      ...defaultConfig,
      ...sharedConfig,
    }
  }
  const withLess = require('@zeit/next-less')
  const withStyledIcons = require('next-plugin-styled-icons')
  const withMDX = require('@zeit/next-mdx')({
    extension: /\.(md|mdx)$/
  })
  const withCSS = require('@zeit/next-css')

  // fix: prevents error when .less files are required by node
  if (typeof require !== 'undefined') {
    require.extensions['.less'] = (file) => {}
    require.extensions['.css'] = (file) => {}
  }

  const lessToJS = require('less-vars-to-js')
  const fs = require('fs')
  const path = require('path')

  // Where your antd-custom.less file lives
  const themeVariables = lessToJS(
    fs.readFileSync(
      path.resolve(__dirname, './assets/antd-custom.less'),
      'utf8'
    )
  )
  const crittersConfig = {
    assetPrefix: prefix,
    webpack: (config, { isServer, buildId, dev }) => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty'
      }

      config.module.rules.push(
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        }
      )

      config.output.publicPath = `${prefix}${config.output.publicPath}`;

      return config
    }
  }

  const nextConfig = {
    ...defaultConfig,
    ...crittersConfig,
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables,
    },
    pageExtensions: ['js', 'jsx', 'mdx', 'md']
  }
  return withCSS(withLess(withStyledIcons(withMDX(
    nextConfig
  ))))
}
