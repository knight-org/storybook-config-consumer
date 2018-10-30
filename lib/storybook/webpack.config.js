
import path from 'path'
import babelrcJson from './babelrc.json'
import webpackExtendConfig from './webpack.extend.config'

export default (storybookBaseConfig, configType) => {
  storybookBaseConfig.node = { 'fs': 'empty' }

  storybookBaseConfig.resolve.extensions = storybookBaseConfig.resolve.extensions.concat([ '.ts', '.tsx' ])

  storybookBaseConfig.resolve.alias = {
    '&': path.join(process.cwd(), 'src')
  }

  storybookBaseConfig.module.rules = storybookBaseConfig.module.rules.concat([
    {
      'test': /\.js$/,
      'exclude': /node_modules/,
      'use': [
        { 'loader': 'babel-loader', 'options': babelrcJson }
      ]
    },
    {
      'test': /\.ts|\.tsx$/,
      'loader': 'ts-loader',
      'options': {
        // use 'configFile' must use 'context'
        // https://github.com/TypeStrong/ts-loader#context-string-defaultundefined
        'context': process.cwd(),
        'configFile': require.resolve('./tsconfig.json')
      }
    },
    {
      'test': /\.scss|\.css$/,
      'use': [
        { 'loader': 'style-loader' },
        {
          'loader': 'css-loader',
          'options': { 'importLoaders': 2 },
        },
        {
          'loader': 'postcss-loader',
          'options': {
            plugins: () => [
              require('autoprefixer')({
                'browsers': [ 'last 1 version', 'ie >= 11' ],
              }),
            ],
          },
        },
        {
          'loader': 'sass-loader',
          'options': {
            'includePaths': [ path.resolve(__dirname, '..', 'node_modules') ],
          },
        }
      ]
    },
    {
      'test': /\.less$/,
      'use': [
        { 'loader': 'style-loader' },
        {
          'loader': 'css-loader',
          'options': { 'importLoaders': 2 },
        },
        {
          'loader': 'postcss-loader',
          'options': {
            plugins: () => [
              require('autoprefixer')({
                'browsers': [ 'last 1 version', 'ie >= 11' ],
              }),
            ],
          },
        },
        {
          'loader': 'less-loader'
        }
      ],
    },
    {
      'test': /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      'loader': 'url-loader',
      'options': {
        'limit': 10000,
        'name': 'images/[name].[ext]'
      }
    },
    {
      'test': /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      'loader': 'url-loader',
      'options': {
        'limit': 10000,
        'name': 'media/[name].[hash:7].[ext]'
      }
    },
    {
      'test': /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      'loader': 'url-loader',
      'options': {
        'limit': 10000,
        'name': 'fonts/[name].[hash:7].[ext]'
      }
    }
  ])

  // custom webpack.config.js override
  storybookBaseConfig = webpackExtendConfig(storybookBaseConfig, configType)

  return storybookBaseConfig
}
