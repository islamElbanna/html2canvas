const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const sourceMaps = require('rollup-plugin-sourcemaps2');
const typescript = require('@rollup/plugin-typescript');
const json = require('@rollup/plugin-json');
const fs = require('fs');
const path = require('path');

const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, './package.json'), 'utf8'));

const banner = `/*!
 * ${pkg.title} ${pkg.version} <${pkg.homepage}>
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author.name} <${pkg.author.url}>
 * Released under ${pkg.license} License
 */`;

module.exports = {
    input: `src/index.ts`,
    output: [
        { file: pkg.main, name: pkg.name, format: 'umd', banner, sourcemap: true },
        { file: pkg.module, format: 'esm', banner, sourcemap: true }
    ],
    external: [],
    watch: {
        include: 'src/**'
    },
    plugins: [
        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        resolve.default ? resolve.default() : resolve(),
        // Allow json resolution
        json.default ? json.default() : json(),
        // Compile TypeScript files
        typescript({ sourceMap: true, inlineSources: true, declaration: false, outDir: 'dist' }),
        // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
        commonjs({
            include: 'node_modules/**'
        }),

        // Resolve source maps to the original source
        sourceMaps.default ? sourceMaps.default() : sourceMaps()
    ]
};
