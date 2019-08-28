'use strict'

const webpack = require('webpack')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

const config = {
  mode: process.env.NODE_ENV,

  entry: './src/index.js',

  output: {
    path: resolve('./spark-ar/scripts'),
    filename: 'script.js'
  },

  externals: {
    Animation: 'commonjs Animation',
    Diagnostics: 'commonjs Diagnostics',
    FaceTracking: 'commonjs FaceTracking',
    Audio: 'commonjs Audio',
    DeviceMotion: 'commonjs DeviceMotion',
    FaceTracking2D: 'commonjs FaceTracking2D',
    FaceGestures: 'commonjs FaceGestures',
    Fonts: 'commonjs Fonts',
    HandTracking: 'commonjs HandTracking',
    Instruction: 'commonjs Instruction',
    IrisTracking: 'commonjs IrisTracking',
    LightingEstimation: 'commonjs LightingEstimation',
    LiveStreaming: 'commonjs LiveStreaming',
    Locale: 'commonjs Locale',
    Patches: 'commonjs Patches',
    NativeUI: 'commonjs NativeUI',
    Persistence: 'commonjs Persistence',
    PersonSegmentation: 'commonjs PersonSegmentation',
    Random: 'commonjs Random',
    Reactive: 'commonjs Reactive',
    Shaders: 'commonjs Shaders',
    Scene: 'commonjs Scene',
    Time: 'commonjs Time',
    TouchGestures: 'commonjs TouchGestures',
    CameraInfo: 'commonjs CameraInfo',
    Materials: 'commonjs Materials',
    Textures: 'commonjs Textures'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/
      }
    ]
  }
}

module.exports = config
