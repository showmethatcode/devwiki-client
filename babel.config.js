const fs = require('fs')
const path = require('path')
const modules = fs.readdirSync(path.join(__dirname, 'src')).map((value) => {
  return path.basename(value, path.extname(value))
})

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/typescript',
    'next/babel',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: modules.reduce(
          (prev, cur) => ({
            ...prev,
            [cur]: `./src/${cur}`,
          }),
          {},
        ),
      },
    ],
  ],
}
