const webpack = require('webpack')


const { parsed: myEnv  = { asdasd:"sadasd" }} = require('dotenv').config({
  path:'./.env'
});


module.exports = {
  webpack(config) {
      config.plugins.push(new webpack.EnvironmentPlugin(myEnv))
      return config;
  }
}

const withImages = require('next-images');
