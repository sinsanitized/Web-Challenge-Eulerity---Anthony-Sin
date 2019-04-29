import React, { Component } from 'react';

// FeedItem should consist of an image (src contained in the data from the AJAX request)
class FeedItem extends Component {
  render() {
    // put render logic here
    let arrayOfFeeds = [];
    this.props.url.forEach((item) => {
      arrayOfFeeds.push(<div className='feedItem'><img key={item.toString()} src={item}></img></div>)
    })
    return (
      <div style={styles.container}>
        {arrayOfFeeds}
      </div>
    );
  }
}

const styles = {
  container: {
    border: '1px solid black',
    height: 100,
    width: '100%',
    flex: 1,
  },
};

module.exports = FeedItem;
