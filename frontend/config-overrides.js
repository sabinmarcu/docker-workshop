const {
  override, addDecoratorsLegacy, disableEsLint, addWebpackAlias, addBabelPlugin,
} = require('customize-cra');
const nested = require('postcss-nested');

module.exports = override(
  addBabelPlugin([
    'babel-plugin-dotenv',
    {
      configDir: '../',
      replacedModuleName: 'dotenv',
      matchPrefix: 'RC_',
      includeProcessEnv: {
        DEBUG: 'log:*,error:*',
        NODE_ENV: 'development',
        RC_BACKEND_PORT: 3000,
        RC_AUTH_PORT: 'null',
      },
    },
  ]),
  (config) => {
    config.module.rules[2].oneOf.filter(it => `${it.test}`.includes('.css')).forEach((postcss) => {
      postcss.use.filter(it => it.loader && it.loader.includes('postcss')).forEach((loader) => {
        const { plugins } = loader.options;
        loader.options.plugins = () => [ // eslint-disable-line
          nested(),
          ...plugins(),
        ];
      });
    });
    // console.log(config.module.rules[2].oneOf[3].use[2].options.plugins());
    // process.exit(0);
    return config;
  },
  addDecoratorsLegacy(),
  disableEsLint(),
  addBabelPlugin('@babel/plugin-transform-flow-strip-types'),
  addBabelPlugin('babel-plugin-ramda'),
  addWebpackAlias({
    mobx: `${__dirname}/node_modules/mobx/lib/mobx.es6.js`,
  }),
);
