import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink,
    split,
    Operation
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

import reportWebVitals from './reportWebVitals';
import "./styles/index.css";
import { App } from './App';


const uri    =   "http://localhost:9000/api"
const wsUrl  =   "ws://localhost:9000/api"; 

const httpLink = createHttpLink({
    uri: uri,
    credentials: "include",
});


const wsLink = new WebSocketLink(
    new SubscriptionClient(wsUrl, {
        reconnect: true,
        lazy: true,
        connectionParams: {
            xCsrfToken: sessionStorage.getItem("token") || "",
        },
    })
);

const tokenLink = setContext((_, { headers }) => {
    // get the X-CSRF-TOKEN token from session storage if it exists
    const token = sessionStorage.getItem("token");
    console.log(token)
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            "X-CSRF-TOKEN": sessionStorage.getItem("token") || "",
        },
    };
});

function isSubscription(operation: Operation) {
    const definition = getMainDefinition(operation.query);
    return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
    );
}

const splitLink = split(
    isSubscription,
    wsLink,
    tokenLink.concat(httpLink)
);


const client = new ApolloClient({
    link: splitLink,
    credentials: 'include',
    cache: new InMemoryCache(),
});



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

 

root.render(
 
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
       
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
