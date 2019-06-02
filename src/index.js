import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'https://core-graphql.dev.waldo.photos/pizza'
});

const client = new ApolloClient({ cache, link });
const Root = () => {
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    );
};
ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
