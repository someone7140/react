module.exports = {
  schema: `${
    process.env.NEXT_PUBLIC_API_GRAPHQL
      ? `${process.env.NEXT_PUBLIC_API_GRAPHQL}/graphql`
      : ""
  }`,
  documents: ["src/query/graphql/**/*.ts"],
  overwrite: true,
  generates: {
    "./src/query/graphqlGen/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        noExport: false,
        wrapFieldDefinitions: true,
        skipTypename: false,
      },
    },
  },
};
