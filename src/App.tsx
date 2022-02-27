import { ApolloProvider } from "@apollo/client";
import { useState } from "react";
import { BrowserRouter, Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContex/AuthProvider";
import { initializeApollo, useApollo } from "./lib/apolloClient";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  const client = initializeApollo({});

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;
