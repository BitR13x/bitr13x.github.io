const definition = require('./package.json')
const dependencies = Object.keys(definition.dependencies)
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

export default {
  input: 'assets/scripts/main.js',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    nodeResolve({
       extensions: ['.js', '.jsx']
    }),
    babel({
      presets: ['@babel/preset-react']
    }),
    commonjs({
      include: ['node_modules/**']
    }),
    resolve({
      jsnext: true,
      module: true,
    }),
    postcss({
	  extensions: [ '.css' ],
    }),
  ],
  output: {
    file: 'dist/ctfhtml.js',
    format: 'umd',
    sourcemap: true
  }
};
