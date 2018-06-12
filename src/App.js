import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import logo from './logo.svg';
import './App.css';
import Posts from './Components/Posts.jsx';
import axios from 'axios';
import config from './vimeoApiConfig.json'; // get vimeo api config.
axios.defaults.baseURL = config.apiUri;
axios.defaults.headers.common['Authorization'] = 'basic ' + btoa(config.clientId + ":" + config.clientSecret);

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

  componentWillMount() {
    this.fetchFeed();
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            <Posts posts={this.state.posts} />
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
