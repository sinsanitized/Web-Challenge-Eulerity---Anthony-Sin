import React, { useEffect, useState } from "react";
import FeedItem from "./FeedItem";

interface FeedProps {
  feedUrl: string;
}

// Feed contains multiple FeedItems
// Put AJAX in this Component
const Feed = ({ feedUrl }) => {
  const [urls, setUrls] = useState([]);

  // put render logic here

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(feedUrl);
        const data = await response.json();
        setUrls(data);; // must use key `urls`
      } catch (error) {
        console.error("Oops fetch error:", error);
      }
    };
    fetchData();
  }, [feedUrl]);


  return (
    <div id="feed" style={styles.container}>
      {urls.map((url, index) => (
        <FeedItem key={index} url={url} />
      ))}
    </div>
  );
};

const styles = {
  container: {
    border: "1px black solid",
    width: "50%",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "10px",
  },
};

export default Feed;
