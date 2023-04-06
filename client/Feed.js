import React, { useEffect, useState } from 'react';
import FeedItem from './FeedItem';

// Feed contains multiple FeedItems
// Put AJAX in this Component
const Feed = () => {

  const urls = useState([]);

  // put render logic here
  return (
    <div style={styles.container}>
      <FeedItem />
    </div>
  );
}

const styles = {
  container: {
    border: '1px black solid',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
  },
};

export default Feed;