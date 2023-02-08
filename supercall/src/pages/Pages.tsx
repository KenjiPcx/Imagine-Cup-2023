import { Route, Routes } from "@solidjs/router";
import { lazy } from "solid-js";

const Pages = () => {
  const CallHistory = lazy(() => import("./CallsHistory"));
  const Home = lazy(() => import("./Home"));
  const About = lazy(() => import("./About"));
  const Profile = lazy(() => import("./Profile"));

  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/call-history" component={CallHistory} />
      <Route path="/about" component={About} />
      <Route path="/profile" component={Profile} />
    </Routes>
  );
};

export default Pages;
