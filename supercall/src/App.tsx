import { Component, lazy } from "solid-js";
import { HopeProvider, HopeThemeConfig } from "@hope-ui/solid";
import { Routes, Route } from "@solidjs/router";

const config: HopeThemeConfig = {
  initialColorMode: "system",
  lightTheme: {
    colors: {},
  },
  darkTheme: {
    colors: {},
  },
};

const CallHistory = lazy(() => import("./pages/CallsHistory"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Profile = lazy(() => import("./pages/Profile"));

const App: Component = () => {
  return (
    <HopeProvider config={config}>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/call-history" component={CallHistory} />
        <Route path="/about" component={About} />
        <Route path="/profile" component={Profile} />
      </Routes>
    </HopeProvider>
  );
};

export default App;
