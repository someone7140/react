module.exports = {
  schema: `${
    process.env.NEXT_PUBLIC_API_DOMAIN
      ? `${process.env.NEXT_PUBLIC_API_DOMAIN}/graphql`
      : ""
  }`,
  documents: ["src/graphql/query/**/*.ts"],
  overwrite: true,
  generates: {
    "./src/graphql/gen/graphql.tsx": {
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
        useTypeImports: true,
        scalars: {
          DateTime: "Date",
          Upload: "File",
        },
      },
    },
  },
};
