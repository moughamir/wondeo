import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import SideBar from './Components/Sidebar';
import './app.css';
import logo from './logo.svg';
import Posts from './Components/Posts.jsx';
import axios from 'axios';
import config from './vimeoApiConfig.json'; // get vimeo api config.
window.axios = axios;
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

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  fetchFeed() {
    let self = this;
    axios.get('/categories/experimental/videos', {
      params: {
        page: 1,
        per_page: 10,
        sort: 'likes',
        direction: 'desc'
      }
    }).then(function (response) {
      console.log(response.data.data)
      self.setState({
        posts: response.data.data

      });
    }).catch(function (error) {
      console.error('Axios : ' + error);
    });
  }
  getCategories() {
    //let self = this;
    axios.get('/categories', {
      params: {
        direction: 'asc'
      }
    }).then((response) => {
      console.log('Categories : ' + response.data.data)
    })
  }
  componentWillMount() {
    this.fetchFeed();
  }

  render() {
    return (
      <div style={styles.root}>
        <AppBar position="static" style={{ marginBottom: '5px' }}>
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
        <Grid container spacing={24} style={{ paddingTop: '25px' }}>
          <SideBar />
          <Grid container
            item
            alignItems='center'
            justify='center' xs={8}
            style={{
              height: 'calc(100vh - 82px)',
              overflowY: ' scroll',
              overflowX: 'hidden',
              padding: '10px',
            }}>
            <Posts posts={this.state.posts} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

