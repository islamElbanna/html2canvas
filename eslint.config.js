import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default [
    {
        files: ["src/**/*.ts", "www/src/**/*.ts", "tests/**/*.ts", "scripts/**/*.ts"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json",
                ecmaVersion: 2022,
                sourceType: "module",
            },
        },
        plugins: {
            "@typescript-eslint": typescriptEslint,
            prettier: prettier,
        },
        rules: {
            ...typescriptEslint.configs.recommended.rules,
            ...configPrettier.rules,
            "no-console": ["error", { allow: ["warn", "error"] }],
            "@typescript-eslint/explicit-member-accessibility": ["error", { accessibility: "no-public" }],
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-use-before-define": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "prettier/prettier": "error",
        },
    },
];
