import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// link: new HttpLink({ uri: 'http://localhost:3000/graphql' }),
const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://track-sphere-backend.vercel.app/graphql' }),
  cache: new InMemoryCache(),
});

export default client;
