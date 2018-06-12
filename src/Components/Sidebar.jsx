import React from 'react';
import axios from 'axios'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { Divider } from '@material-ui/core';

export default class Sidebar extends React.Component {
  constructor() {
    super()
    this.state = {
      categories: [],
      category: '',
      display: ['10', '25', '50', '100'],
      defaultDisplay: '10',
      dir: ['asc', 'desc'],
      sort: ['likes']
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.fetchData(event.target.value)
  };

  handleDisplayChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }
  
  fetchData(target){
    let self = this;
    
    axios.get(target + '/videos', {
      params: {
        page: 1,
        per_page: 10,
        sort: 'likes',
        direction: 'desc'
      }
    }).then((response) => {
      console.log(response.data.data)
      self.setState({
        posts: response.data.data
      })
    })

  }

  getCategories() {
    let self = this;
    axios.get('/categories', {
      params: {
        direction: 'asc'
      }
    }).then((response) => {
      console.log('Categories : ' + response.data.data)

      self.setState({
        categories: response.data.data
      })

    })
  }

  componentWillMount() {
    this.getCategories();
  }

  render() {

    const categories = this.state.categories.map((cat, i) => {
      return <MenuItem key={i} value={cat.uri}>{cat.name}</MenuItem>
    })
    const display = this.state.display.map((num, i) => {
      return <MenuItem key={i} value={num}>{num}</MenuItem>
    })
    return (
      <Grid item xs={4}>
        <Paper style={{ height: '100vh' }}>
          <FormControl fullWidth>
          <Divider />
            <InputLabel htmlFor="categories">Categories</InputLabel>
            <Select
              value={this.state.category}
              onChange={this.handleChange}
              inputProps={{
                name: 'category',
                id: 'categories',
              }}
            >
              {categories}
            </Select>
          </FormControl>
          
          <FormControl fullWidth>
          <Divider />
            <InputLabel htmlFor="display">Display</InputLabel>
            <Select
              value={this.state.defaultDisplay}
              onChange={this.handleDisplayChange}
              inputProps={{
                name: 'defaultDisplay',
                id: 'display',
              }}
            >
              {display}
            </Select>
          </FormControl>
        </Paper>
      </Grid>
    )
  }
}
// 
//https://api.vimeo.com/categories