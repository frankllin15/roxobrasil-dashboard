import { ApolloProvider } from "@apollo/client";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContex/AuthProvider";
import { initializeApollo, useApollo } from "./lib/apolloClient";
import AppRoutes from "./routes";

const App: React.FC = () => {
  const client = initializeApollo({});

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
