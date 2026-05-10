module.exports = {
  schema: `${
    process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}` : ""
  }`,
  documents: ["graphql/query/**/*.ts"],
  overwrite: true,
  generates: {
    "./graphql/gen/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        useTypeImports: true,
        skipTypename: false,
        withHooks: true,
        documentMode: "documentNode",
      },
    },
    // enumは別ファイルに出力
    "./graphql/gen/enums.ts": {
      plugins: ["typescript"],
      config: {
        onlyEnums: true,
      },
    },
  },
};
