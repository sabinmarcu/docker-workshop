const {
  override, addDecoratorsLegacy, disableEsLint, addWebpackAlias, addBabelPlugin,
} = require('customize-cra');
const nested = require('postcss-nested');

module.exports = override(
  (config) => {
    config.module.rules[2].oneOf.filter(it => `${it.test}`.includes('.css')).forEach((postcss) => {
      postcss.use.filter(it => it.loader && it.loader.includes('postcss')).forEach((loader) => {
        const { plugins } = loader.options;
        loader.options.plugins = () => [
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
