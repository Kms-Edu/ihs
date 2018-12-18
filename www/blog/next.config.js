const not_now = !process.env.NOW_REGION
const prefix = not_now ? '' : process.env.WWW_BLOG_PREFIX
module.exports = {
  //useFileSystemPublicRoutes: false,
  assetPrefix: prefix,  
  webpack: config => {
    config.output.publicPath = `${prefix}${config.output.publicPath}`;

    return config
  }
};

