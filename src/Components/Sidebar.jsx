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
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      category: '',
      categoryName: '',
      display: ['1', '10', '25', '50', '100'],
      defaultDisplay: '10',
      dir: ['asc', 'desc'],
      sort: ['likes']
    }
  }

  // update = (e) => {
  //   console.log(e.target.value);
  //   this.props.onUpdate(e.target.value);
  //   this.setState({ fieldVal: e.target.value });
  // };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.fetchData(event.target.value)
  }

handleDisplayChange = event => {
  this.setState({ [event.target.name]: event.target.value })
  this.getMore(event.target.value)
}
setCurrentCat(target) {
  let self = this;
  axios.get(target).then((response) => {
    console.info('setCurrentCat: ' + response.data)
    self.setState({ categoryName: response.data.name, icon: response.data.icon.sizes[8].link })
    
  })
}
getMore(target) {
  let self = this;
  axios.get(self.state.category + '/videos', {
    params: {
      page: 1,
      per_page: target,
      sort: 'likes',
      direction: 'desc'
    }
  }).then((response) => {
    // console.log(response.data.data)
    self.setState({
      posts: response.data.data
    })
    this.props.onUpdate(self.state.posts);
  })
}

fetchData(target) {
  let self = this;
  self.setCurrentCat(target)
  axios.get(target + '/videos', {
    params: {
      page: 1,
      per_page: 10,
      sort: 'likes',
      direction: 'desc'
    }
  }).then((response) => {
    //console.log(response.data.data)
    self.setState({
      posts: response.data.data
    })
  })
  this.props.onUpdate(self.state.posts, self.state.categoryName, self.state.icon);

}

getCategories() {
  let self = this;
  axios.get('/categories', {
    params: {
      direction: 'asc'
    }
  }).then((response) => {
    //console.log('Categories : ' + response.data.data)

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