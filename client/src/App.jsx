import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { AuthProvider } from './contexts/AuthContext';
import Chat from './Chat';
import "./assets/scss/index.scss";

const link = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  link,
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});




const App = () => (
  <ApolloProvider client={client}>
    <AuthProvider>
      <Chat />
    </AuthProvider>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("app"));
