import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { createUploadLink } from 'apollo-upload-client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const cache = new InMemoryCache();
const uri = 'http://127.0.0.1:8000/graphql/';
const link = createUploadLink({ uri });
const client = new ApolloClient({ cache, link });

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();