module.exports = (env = {}, plugins = []) => ({
  plugins: [    
    ...plugins,
    ["macros"],
    ['transform-define', env],
    ["@babel/plugin-proposal-decorators", { "decoratorsBeforeExport": true }],
    "@babel/plugin-proposal-class-properties",
    [
      "import", {
        "libraryName": "antd",
        "style": true
      }
    ],
  ],
  presets: ["next/babel"],
})
