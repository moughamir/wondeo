import uuid from 'uuid';
import React from 'react';
import Grid from "@material-ui/core/Grid";
import FeedItem from './postCard.jsx';

export default class Posts extends React.Component {
  render() {
    let feedItems;
    if (this.props.posts) {
      feedItems = this.props.posts.map(post => {
        //console.log(post);
        return (
          <FeedItem key={uuid.v1()} post={post} />
          );
        });
      }
      return (
          <Grid item xs={12} sm={4} md={4}>
            {feedItems}
          </Grid >
      );
  }
}