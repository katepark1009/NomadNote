import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import { ApolloLink } from "apollo-link";
import { typeDefs, defaults, resolvers } from "./clientState";

const cache = new InMemoryCache();

const stateLink = withClientState({
    cache, //!어디다 저장할 것인지 필요
    typeDefs,
    defaults,
    resolvers
})

const client = new ApolloClient({
    cache,
    link: ApolloLink.from([stateLink])
  });

export default client;
