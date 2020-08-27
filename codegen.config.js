module.exports = {
  schema: [
    {
      [process.env.HASURA_GRAPHQL_API_URL]: {
        headers: {
          'X-Hasura-Admin-Secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
          'X-Hasura-Role': 'user',
        },
      },
    },
  ],
  documents: ['./graphql/**/*.graphql'],
  overwrite: true,
  generates: {
    './graphql/.generated/index.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloReactHooksImportFrom: '@apollo/client',
      },
    },
  },
}
