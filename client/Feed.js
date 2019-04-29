import React, { Component } from 'react';
import FeedItem from './FeedItem';

// Feed contains multiple FeedItems
// Put AJAX in this Component
class Feed extends Component {

  // feed component shoudld render a div with the ID feed

  constructor() {
    super();

    this.state = {
      urls: [],
    };
  }
  //feed component should make an AJA request to the feed url prop
  componentDidMount() {
    fetch(this.props.feedUrl)
      .then(response => response.json())
      .then(response => {
        this.setState({ urls: [...response] })
      })
  }

  render() {

    // put render logic here
    return (
      <div id='feed' style={styles.container} >
        <FeedItem url={this.state.urls} />
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

module.exports = Feed;
