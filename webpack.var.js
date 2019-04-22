const vars = {
  API: '/api'
};

function makeQueryString(obj) {
  let str = '';
  Object.keys(obj).forEach(function (key, index, arr) {
    str += key + '=' + encodeURIComponent(obj[key]) + (index < arr.length ? '&' : '');
  });
  return str;
}

module.exports = {
  vars: vars,
  makeQueryString: makeQueryString,
  devtool: 'inline-source-map',
  publicPath: '/webadmin',
  devServer: {
    contentBase: './dist',
    port: 3001,
    proxy: {
      '/api/**': {
        target: 'http://demo.com/',
        secure: false,
        pathRewrite: { '^/api': '' }
      }
    }
  }
};