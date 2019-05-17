// rollup.config.js
import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import minimist from 'minimist';
import postcss from 'rollup-plugin-postcss';
import pxtorem from 'postcss-pxtorem';

const argv = minimist(process.argv.slice(2));

const baseConfig = {
  input: 'lib/index.js',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    postcss({
      plugins: [
        pxtorem({
          root_value: 50,
          unitPrecision: 6,
          propWhiteList: ['width', 'height', 'min-width', 'min-height', 'font-size', 'line-height', 'letter-spacing', 'text-indent', 'margin', 'margin-bottom', 'margin-top', 'margin-left', 'margin-right', 'padding', 'padding-bottom', 'padding-top', 'padding-left', 'padding-right', 'top', 'bottom', 'left', 'right', 'background-size', 'max-width', 'border-radius', 'border-top-left-radius', 'border-bottom-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border', 'max-height', 'max-width', 'background-position', 'box-shadow'],
          selectorBlackList: ['leave-as-px'],
          replace: process.env.NODE_ENV === 'production',
          mediaQuery: false,
          minPixelValue: 0
        }),
      ],
      minimize: true
    }),
    commonjs(),
    vue({
      css: true,
      compileTemplate: true,
      template: {
        isProduction: true,
      },
    }),
    buble(),
  ],
};

// UMD/IIFE shared settings: externals and output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const external = [
  'vue'
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
];
const globals = {
  vue: 'Vue'
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === 'es') {
  const esConfig = {
    ...baseConfig,
    output: {
      file: 'dist/toast.esm.js',
      format: 'esm',
      exports: 'named',
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        output: {
          ecma: 6,
        },
      }),
    ],
  };
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === 'umd') {
  const umdConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/toast.umd.js',
      format: 'umd',
      name: 'Toast',
      exports: 'named',
      globals,
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        output: {
          ecma: 6,
        },
      }),
    ],
  };
  buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === 'iife') {
  const unpkgConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/toast.min.js',
      format: 'iife',
      name: 'Toast',
      exports: 'named',
      globals,
    },
    plugins: [
      ...baseConfig.plugins,
      terser({
        output: {
          ecma: 5,
        },
      }),
    ],
  };
  buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;
