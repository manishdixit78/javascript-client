import { InMemoryCache } from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_APOLLO_GRAPHQL_URI,
  options: {
    reconnect: true,
  },
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
&& definition.operation === 'subscription'
    );
  },
  httpLink,
);

const cache = new InMemoryCache();

const setHeaders = (operation) => operation.setContext({ headers: { authorization: localStorage.getItem('token') } });

const client = new ApolloClient({
  link: authLink.concat(link),
  cache,
  request: setHeaders,
});

const initialState = {
  token: '',
};

cache.writeData({ data: initialState });

client.onResetStore(() => cache.writeData({ data: initialState }));

export default client;
