module.exports = {
    arrowParens: "always",
    bracketSpacing: true,
    endOfLine: "auto",
    jsxBracketSameLine: false,
    jsxSingleQuote: false,
    proseWrap: "never",
    semi: true,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: "all",
    useTabs: false,
    printWidth: 160,
    overrides: [
        {
            files: "*.json",
            options: {
                printWidth: 10,
            },
        },
    ],
};
