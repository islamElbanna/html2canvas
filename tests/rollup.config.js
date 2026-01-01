const nodeResolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const sourceMaps = require('rollup-plugin-sourcemaps2');
const typescript = require('@rollup/plugin-typescript');
const json = require('@rollup/plugin-json');
const fs = require('fs');
const path = require('path');

const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8'));

const banner = `/*
 * ${pkg.title} ${pkg.version} <${pkg.homepage}>
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author.name} <${pkg.author.url}>
 * Released under ${pkg.license} License
 */`;

module.exports = {
    input: `tests/testrunner.ts`,
    output: [
        {
            file: path.resolve(__dirname, '../build/testrunner.js'),
            name: 'testrunner',
            format: 'iife',
            banner,
            sourcemap: true
        }
    ],
    external: [],
    watch: {
        include: 'tests/**'
    },
    plugins: [
        // Compile TypeScript files
        typescript({
            tsconfig: path.resolve(__dirname, 'tsconfig.json'),
            include: ['**/*.ts', '../build/**/*.js'],
            declaration: false,
            declarationDir: path.resolve(__dirname, '../build'),
            outDir: path.resolve(__dirname, '../build')
        }),
        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        nodeResolve({
            extensions: ['.ts', '.js']
        }),
        // Allow json resolution
        json.default ? json.default() : json(),
        // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
        commonjs({
            include: 'node_modules/**'
        }),

        // Resolve source maps to the original source
        sourceMaps.default ? sourceMaps.default() : sourceMaps()
    ]
};
