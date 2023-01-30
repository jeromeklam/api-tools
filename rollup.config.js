import path from "path";
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import analyze from "rollup-plugin-analyzer";
import sourcemaps from 'rollup-plugin-sourcemaps';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const makeExternalPredicate = (externalArr) => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join("|")})($|/)`);
  return (id) => pattern.test(id);
};

const babelRuntimeVersion = pkg.dependencies["@babel/runtime"].replace(/^[^0-9]*/, "");

const outputOptions = {
  exports: "named",
  preserveModules: true,
  sourcemap: true,
  banner: `/*
 * api-tools
 * https://github.com/jeromeklam/api-tools
 * (c) KLAM Jérôme (jeromeklam@free.fr)
 */`,
};

const config = {
  input: "src/index.js",
  output: [
    {
      dir: "dist/esm",
      format: "esm",
      ...outputOptions,
    },
    {
      dir: "dist/cjs",
      format: "cjs",
      ...outputOptions,
    },
  ],
  external: makeExternalPredicate([
    // Handles both dependencies and peer dependencies so we don't have to manually maintain a list
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ]),
  plugins: [
    alias({
      entries: {
        src: path.resolve(path.resolve(__dirname), "src"),
      },
    }),
    nodeResolve(),
    commonjs({ include: ["node_modules/**"] }),
    babel({
      babelHelpers: "runtime",
      exclude: /node_modules/,
      plugins: [["@babel/plugin-transform-runtime", { version: babelRuntimeVersion }]],
      presets: [
        ["@babel/preset-env", { targets: "defaults" }],
        ["@babel/preset-react", { runtime: "automatic" }],
      ],
    }),
    json(),
    terser(),
    sourcemaps(),
    analyze({
      hideDeps: true,
      limit: 0,
      summaryOnly: true,
    }),
  ],
};

export default config;
