import { Component, lazy } from "solid-js";
import { HopeProvider, HopeThemeConfig } from "@hope-ui/solid";
import { Routes, Route } from "@solidjs/router";

const config: HopeThemeConfig = {
  initialColorMode: "system",
  lightTheme: {
    colors: {
      primary9: "white",
    },
  },
  darkTheme: {
    colors: {
      primary9: "#07191d",
    },
  },
};

const CallHistory = lazy(() => import("./pages/CallsHistory"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

const App: Component = () => {
  return (
    <HopeProvider config={config}>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/call-history" component={CallHistory} />
        <Route
          path="/about"
          element={<div>This site was made with Solid</div>}
        />
      </Routes>
    </HopeProvider>
  );
};

export default App;
