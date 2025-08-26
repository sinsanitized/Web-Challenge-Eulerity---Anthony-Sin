import React from "react";
import { createRoot } from "react-dom/client";
import Feed from "./Feed";

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
const container = document.getElementById("app");
if (container) {
  createRoot(container).render(<App />);
}
