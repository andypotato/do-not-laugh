module.exports = {
  pages: {
    index: {
      entry: 'src/main.js', //entry for the public page
      template: 'public/index.html', // source template
      filename: 'index.html' // output as dist/*
    },
    worker: {
      entry: 'src/worker.js',
      template: 'public/worker.html',
      filename: 'worker.html'
    }
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /\/index/, to: '/index.html' },
        { from: /\/worker/, to: '/worker.html' }
      ]
    }
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: 'Do not laugh',
        appId: 'xyz.andypotato.demo.donotlaugh',
        linux: {
          target: {
            target: 'appimage',
            arch: ['armv7l']
          }
        }
      }
    }
  }
};
