import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import logo from './logo.svg';
import Posts from './Components/Posts.jsx';
import axios from 'axios';
import config from './vimeoApiConfig.json'; // get vimeo api config.
axios.defaults.baseURL = config.apiUri;
axios.defaults.headers.common['Authorization'] = 'basic ' + btoa(config.clientId + ":" + config.clientSecret);


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  logo: {
    width: '56px',
    height: '56px',
    paddingRight: '10px'
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  fetchFeed() {
    let that = this;
    axios.get('/categories/experimental/videos', {
      params: {
        page: 1,
        per_page: 10,
        sort: 'likes',
        direction: 'desc'
      }
    }).then(function (response) {
      console.log(response.data.data)
      that.setState({
        posts: response.data.data

      });
    }).catch(function (error) {
      console.error('Axios : ' + error);
    });
  }

  componentDidMount() {
    this.fetchFeed();
  }

  render() {
    return (
        <div style={styles.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <img style={styles.logo} src={logo} className="App-logo" alt="logo" />
              <Typography variant="title" color="inherit" style={styles.flex}>
                Wondeo
              </Typography>
              <Button color="inherit">Proggile</Button>
            </Toolbar>
          </AppBar>
          <section className="App-intro">
         {
           //<Sidebar/>//
         }
            <Posts posts={this.state.posts} />
          </section>
        </div>
    );
  }
}

export default App;