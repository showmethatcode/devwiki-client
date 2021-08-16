const fs = require('fs')
const path = require('path')
const modules = fs.readdirSync(path.join(__dirname, 'src')).map((value) => {
  return path.basename(value, path.extname(value))
})

module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@emotion/babel-preset-css-prop',
    '@babel/typescript',
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      },
    ],
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
