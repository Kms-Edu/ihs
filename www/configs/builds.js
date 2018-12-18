module.exports = [
  {
    "src": "home/package.json",
    "use": "@now/next",
    "config": {
      "useBuildUtils": "@now/build-utils@canary",
      "maxLambdaSize": "50mb"
    }
  },
  {
    "src": "blog/next.config.js", "use": "@now/next"
  },
  {
    "src": "dashboard/next.config.js", "use": "@now/next"
  },
  {
    "src": "static/*", "use": "@now/static"
  }
]
