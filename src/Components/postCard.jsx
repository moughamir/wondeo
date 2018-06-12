
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
import ShareIcon from '@material-ui/icons/Share';
//import TextTruncate from "react-text-truncate";
//import renderHTML from 'react-render-html';


export default class FeedItem extends React.Component {
  constructor() {
    super()
    this.state = {
      playvideo: false
    }
  }
  playVideo(e) {
    e.preventDefault();
    console.log(e.target)
    this.setState({ playvideo: true })
  }
  render() {
    const post = this.props.post;
    const embedStyle = {
      minHeight: '160px',
      maxWidth: '640px',
      height: '360px',
    };
    let media
    if (this.state.playvideo) {
      media = <CardMedia
        style={embedStyle}
        src={"https://player.vimeo.com" + post.uri + "?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=128453"}
        title={post.name}
      />
    } else {
      media = <CardMedia
        onClick={this.playVideo.bind(this)}
        style={embedStyle}
        image={post.pictures.sizes[4].link}
        title={post.name}
      />
    }

    return (
      <Card>
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
          subheader={post.release_time}
        />
        {media}
        <CardContent>
          <Typography component="p">
            {post.description}
          </Typography>
        </CardContent>
        <CardActions disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>)

  }
}
