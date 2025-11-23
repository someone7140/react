module.exports = {
  schema: "schema.graphqls",
  documents: ["src/graphql/query/**/*.ts"],
  overwrite: true,
  generates: {
    "./src/graphql/gen/": {
      preset: "client",
      config: {
        useTypeImports: true,
        skipTypename: false,
        withHooks: true,
        documentMode: "documentNode",
      },
    },
  },
};
