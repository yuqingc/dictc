module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        'last 2 versions',
        '> 5%',
        'Firefox > 55',
        'ie >= 10',
        'iOS >= 8',
        'Android >= 4',
        'Safari >= 10',
        'Chrome >= 54',
      ]
    })
  ]
}
