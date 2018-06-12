
import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import ReactPlayer from 'react-player'
import TextTruncate from "react-text-truncate";
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import moment from 'moment';


export default class FeedItem extends React.Component {
  constructor() {
    super()
    this.state = {
      playvideo: false
    }
  }
  playVideo(e) {
    e.preventDefault();
    this.setState({ playvideo: !this.state.playvideo })
  }
  render() {
    const post = this.props.post;
    const embedStyle = {
      minHeight: '160px',
      maxWidth: '640px',
      height: '360px',
    };
    let media // <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing />
    if (this.state.playvideo) {
      media = <CardMedia style={embedStyle}><ReactPlayer
        onClick={this.playVideo.bind(this)}

        url={post.link}
        title={post.name}
        width='100%'
        height='100%'
        playing
        controls='false'
      /></CardMedia>
    } else {
      media = <CardMedia
        onClick={this.playVideo.bind(this)}
        style={embedStyle}
        image={post.pictures.sizes[4].link}
        title={post.name}
      />
    }

    return (
      <Card style={{ marginTop: 10, marginBottom: 10 }}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="User"
              alt={post.user.name}
              src={post.user.pictures === null ? '//via.placeholder.com/75x75?text=N/A' : post.user.pictures.sizes[1].link}
            />
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={post.user.name}
          subheader={moment(post.release_time).format('lll')}
        />
        {media}
        <CardContent>
          <Typography component="article">
            <TextTruncate
              line={2}
              truncateText=" …"
              text={post.description}
            />
          </Typography>
          <Divider light />
          {post.categories.map((cat, i) => {
            return (
              <Chip
                key={i}
                label={cat.name}
              />
            );
          })}
        </CardContent>
        <Divider light />
        <CardActions disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          {post.metadata.connections.likes.total}
          <IconButton aria-label="Share">
            <CommentIcon />
          </IconButton>
          {post.metadata.connections.comments.total}
        </CardActions>
      </Card>)

  }
}
