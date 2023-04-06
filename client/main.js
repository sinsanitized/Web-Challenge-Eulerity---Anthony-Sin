import React from 'react';
import ReactDOM from 'react-dom';
import Feed from './Feed';

const url =
  'http://image-server-prod.eba-jqccpzay.us-west-2.elasticbeanstalk.com/images';


// App consists of one feed
const App = () => {
  return (
    <div style={styles.container}>
      <Feed />
    </div>
  );
}


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
};

// Render an <App> component to the #app div in the body
ReactDOM.render(<App />, document.getElementById('app'));
