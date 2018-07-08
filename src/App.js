import React from 'react';
import {
  Paper,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Grid
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import SideBar from './Components/Sidebar';
import Posts from './Components/Posts';
import Header from './Components/Header';
import './app.css';
import logo from './logo.svg';

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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      defaultDisplay: 10,
      categoryName: 'Experimental',
      icon: 'https://i.vimeocdn.com/grab?s=https%3A%2F%2Ff.vimeocdn.com%2Fimages_v6%2Fcategories%2Firis_icon_experimental_64.png%3Fv%3D2&w=180&h=180&r=pad&f=png',
      categories: [],
      category: '',
      display: [1, 10, 25, 50, 100],
      dir: ['asc', 'desc'],
      sort: ['likes']
    };
  }

  onUpdate = (val, c, i) => {
    console.log(val)
    console.log(c)
    console.log(i)
    this.setState({
      posts: val,
      categoryName: c,
      icon: i
    })
  };
  fetchFeed() {
    let self = this;
    axios.get('/categories/experimental/videos', {
      params: {
        page: 1,
        name: 'defaultDisplay',
        per_page: self.state.defaultDisplay,
        sort: 'likes',
        direction: 'desc'
      }
    }).then(function (response) {
      //console.log(response.data.data)
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

        <AppBar position="static" >
          <Toolbar>
            <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <img style={styles.logo} src={logo} className="App-logo" alt="logo" />
            <Typography variant="title" color="inherit" style={styles.flex}>
              Wondeo
              </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>

        <Header category={this.state.categoryName} icon={this.state.icon} />

        <Grid container spacing={24} style={{ paddingTop: '25px' }}>

          <SideBar onUpdate={this.onUpdate} />

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
            <Paper style={{
              padding: '10px',
              width: '100%'
            }}>
              END OF FILE -Pagination placeholder-
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

