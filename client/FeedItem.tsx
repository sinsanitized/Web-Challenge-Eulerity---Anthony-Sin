import React, { useState } from "react";

//Interface url
interface FeedItemProps {
  url: string;
}
// FeedItem should consist of an image (src contained in the data from the AJAX request)
const FeedItem = ({ url }) => {
  // put render logic here
  // if image fails to load set invisible null
   const [visible, setVisible] = useState(true);

  if (!visible) return null; // bonus: remove if img fails

  // return the div with feed items from url
  return (
    <div className="feedItem" style={styles.container}>
      <img
        src={url}
        alt="feed item"
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
