
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

const babel = getBabelOutputPlugin({
  presets: ['@babel/preset-env'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining'
  ]
});

export default [
  {
    input: 'src/index.ts',
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript(),
      babel
    ],
    output: [
      {
        dir: "dist/esm",
        format: "esm",
        exports: "named",
        sourcemap: true
      },
      {
        dir: "dist/cjs",
        format: "cjs",
        exports: "named",
        sourcemap: true,
      }
    ]
  },
  {
    input: 'src/index.ts',
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript(),
      babel,
      terser()
    ],
    output: [
      {
        file: "dist/min.js",
        format: "esm"
      }
    ]
  }
];
