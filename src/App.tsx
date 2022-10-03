import React from "react";
import Navbar from "./components/shared/Navbar";
import Header from "./components/shared/Header";
import { Home } from "./pages/home/Home";
import { Chat } from "./pages/chat/Chat";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

// Initialise Apollo Client
const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:6600/graphql",
  }),
  // uri: 'http://localhost:6600/graphql',
  cache: new InMemoryCache(),
  credentials: "same-origin",
});

function AppRouter() {
  return (
    <div id="background" className="bg-primary">
      <div id="wrapper" className="text-900">
        <Router>
          <Header />
          <div className="bg-white border-round-top">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  );
}

export default App;
