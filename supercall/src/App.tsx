import { Component } from "solid-js";
import { HopeProvider } from "@hope-ui/solid";
import { initAuth } from "./scripts/authConfig";
import { hopeConfig } from "./scripts/hopeConfig";
import Layout from "./components/layout/Layout";
import Pages from "./pages/Pages";
import { AuthProvider } from "./components/auth/AuthProvider";

const msalInstance = initAuth();

const App: Component = () => {
  return (
    <HopeProvider config={hopeConfig}>
      <AuthProvider instance={msalInstance}>
        <Layout>
          <Pages />
        </Layout>
      </AuthProvider>
    </HopeProvider>
  );
};

export default App;
