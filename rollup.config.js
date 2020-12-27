
import typescript from '@rollup/plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.ts',
    plugins: [
      resolve({ module: true }),
      typescript()
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
      resolve({ module: true }),
      typescript(),
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
