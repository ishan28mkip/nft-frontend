/** @type {import('next').NextConfig} */

// next.config.js
const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  // modifyVars: { "@primary-color": "#04f" }, // optional
  // lessVarsFilePath: "./src/styles/variables.less", // optional
  // lessVarsFilePathAppendToEndOfContent: false, // optional
  // optional https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {
    // mode: "local",
    // exportLocalsConvention: "camelCase",
    // exportOnlyLocals: false,
  },
  reactStrictMode: true,

  webpack(config) {
    return config;
  },
});
