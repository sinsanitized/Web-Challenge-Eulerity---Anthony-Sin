import React, { useState } from "react";

interface FeedItemProps {
  url: string;
}
// FeedItem should consist of an image (src contained in the data from the AJAX request)
const FeedItem = ({ url }) => {
  // put render logic here

   const [visible, setVisible] = useState(true);

  if (!visible) return null; // bonus: remove if img fails

  return (
    <div className="feedItem" style={styles.container}>
      <img
        src={url}
        alt="feed item"
        style={styles.image}
        onError={() => setVisible(false)}
      />
    </div>
  );
};

const styles = {
  container: {
    border: "1px solid black",
    height: "100%",
    width: "100%",
    flex: 1,
  },
};

export default FeedItem;
