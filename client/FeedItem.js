import React from 'react';

// FeedItem should consist of an image (src contained in the data from the AJAX request)
const FeedItem = () => {
  // put render logic here
  return (
    <div style={styles.container}>
    </div>
  );
}

const styles = {
  container: {
    border: '1px solid black',
    height: '100%',
    width: '100%',
    flex: 1,
  },
};

export default FeedItem;
