import React from "react";
import { createRoot } from "react-dom/client";
import Feed from "./Feed";

//feed Url
const feedUrl =
  "http://image-server-prod.eba-jqccpzay.us-west-2.elasticbeanstalk.com/images";

// App consists of one feed
const App = () => {
  return (
    <div style={styles.container}>
      <Feed feedUrl={feedUrl}/> 
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
};

// Render an <App> component to the #app div in the body
// if container is truthy render
const container = document.getElementById("app");
if (container) {
  createRoot(container).render(<App />);
}
