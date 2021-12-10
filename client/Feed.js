import React, { Component } from 'react';
import FeedItem from './FeedItem';

// Feed contains multiple FeedItems
// Put AJAX in this Component
class Feed extends Component {

  constructor() {
    super();
    
    this.state = {
      urls: [],
    };
  }

  componentDidMount() {
    console.log("mounted")
    fetch(this.props.feedUrl)
    .then((res) => res.json())
    .then((data) => this.setState({ urls: data}))
  }

  render() {
    // put render logic here
    let allFeedItems = this.state.urls.map((item) =>{
      return <FeedItem key={item} url={item} />
    })

    return (
      <div style={styles.container} id="feed">
        {allFeedItems}
      </div>
    );
  }
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