import { Route, Routes } from "@solidjs/router";
import { lazy } from "solid-js";

const CallHistory = lazy(() => import("./CallsHistory"));
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const Profile = lazy(() => import("./Profile"));
const AllMeetings = lazy(() => import("./AllMeetings"));
const AllTasks = lazy(() => import("./AllTasks"));
const TopicOfInterestsTags = lazy(() => import("./TopicOfInterestsTags"));
const TopicOfInterest = lazy(() => import("./TopicOfInterest"));

const Pages = () => {
  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/call-history" component={CallHistory} />
      <Route path="/about" component={About} />
      <Route path="/profile" component={Profile} />
      <Route path="/tasks" component={AllTasks} />
      <Route path="/meetings" component={AllMeetings} />
      <Route path="/brain-dump" component={TopicOfInterestsTags} />
      <Route path="/brain-dump/{:topicId}" component={TopicOfInterest} />
      <Route path="/mental-notes" component={Profile} />
    </Routes>
  );
};

export default Pages;
