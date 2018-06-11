
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
import TextTruncate from "react-text-truncate";
//import renderHTML from 'react-render-html';



export default class FeedItem extends React.Component {
  render() {
    const post = this.props.post;
    const embedStyle = {
        minHeight: '160px',
        maxWidth: '640px',
        height: '360px',
    };

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
        <CardMedia
          image={post.pictures.sizes[4].link_with_play_button}
          title={post.name}
        />
        <CardContent>
          <Typography component="p">
            <TextTruncate
              line={2}
              truncateText="…"
              text={post.description} />
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
