import { ApolloClient, InMemoryCache } from '@apollo/client/core';

// Create an Apollo Client instance
const apolloClient = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/',
  cache: new InMemoryCache(),
});

export default apolloClient;
