const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const webpack = require('webpack')

module.exports = defineConfig({
  transpileDependencies: true,

  // CSS/SASS configuration
  css: {
    extract: {
      ignoreOrder: true // Fixes font ordering warnings
    },
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        sassOptions: {
          indentedSyntax: true
        }
      },
      postcss: {
        postcssOptions: {
          plugins: [
            require('autoprefixer')()
          ]
        }
      }
    }
  },

  // Webpack configuration
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.txt$/,
          use: 'raw-loader'
        },
        // Font files (excluding SVGs)
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext][query]'
          }
        },
        // Image files
        {
          test: /\.(png|jpe?g|gif|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name][ext][query]'
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@img': path.resolve(__dirname, 'src/assets/img'),
        '@styles': path.resolve(__dirname, 'src/assets/styles'),
        '@fonts': path.resolve(__dirname, 'src/assets/styles/fonts')
      }
    }
  },

  // Webpack chaining for optimized asset handling
  chainWebpack: config => {
    // Clear existing SVG rules
    config.module.rules.delete('svg')

    // Rule for regular SVGs (components/icons)
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .exclude.add(path.resolve(__dirname, 'src/assets/styles/fonts'))
      .end()
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('svg-to-vue-component')
      .loader('svg-to-vue-component')
      .options({
        svgo: {
          plugins: [
            { removeDoctype: true },
            { removeComments: true },
            { removeViewBox: false }
          ]
        }
      })

    // Rule for font SVGs (simpler handling)
    config.module
      .rule('font-svg')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, 'src/assets/styles/fonts'))
      .end()
      .type('asset/resource')
      .set('generator', {
        filename: 'fonts/[name][ext][query]'
      })

    // SASS loader configuration
    config.module
      .rule('sass')
      .oneOf('normal')
      .use('sass-loader')
      .tap(options => ({
        ...options,
        implementation: require('sass'),
        sassOptions: {
          indentedSyntax: true,
          includePaths: [
            path.resolve(__dirname, 'src/assets/styles')
          ]
        }
      }))

    // Improve asset module handling
    config.module
      .rule('fonts')
      .test(/\.(woff|woff2|eot|ttf|otf)$/)
      .set('type', 'asset/resource')
      .set('generator', {
        filename: 'fonts/[name][ext][query]'
      })
  },

  // Production optimizations
  productionSourceMap: false,
  filenameHashing: true
})
// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
// const webpack = require('webpack')
// module.exports = {
//   configureWebpack: {
//     plugins: [
//       new webpack.DefinePlugin({
//         __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
//       })
//     ]
//   }
// }
// // vue.config.js
// module.exports = {
//   css: {
//     loaderOptions: {
//       sass: {
//         additionalData: '@import \'@assets/styles/_var.sass\''
//       }
//     }
//   }
// }
