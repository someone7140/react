import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/graphql/schema.graphqls",
  documents: ["src/graphql/query/**/*.ts"],
  overwrite: true,
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/graphql/gen/graphql.tsx": {
      plugins: ["typescript", "typescript-operations", "typescript-urql"],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        noExport: false,
        wrapFieldDefinitions: true,
        useTypeImports: true,
        scalars: {
          Map: "object",
          Time: "Date",
        },
      },
    },
    "./src/graphql/gen/introspection.json": {
      plugins: ["introspection"],
      config: {
        minify: true,
      },
    },
  },
};

export default config;
