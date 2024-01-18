module.exports = {
  schema: [
    {
      [`${process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT ?? ""}`]: {
        headers: {
          "x-hasura-admin-secret": `${process.env.HASURA_ADMIN_SECRET ?? ""}`,
        },
      },
    },
  ],
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
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};
