import React from "react";
import { Paper } from "@material-ui/core";

// core components
const style = {
  header: {
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    background: '#3f51b5',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Roboto',
    color: '#f2f2f2',
    textShadow: '3px 3px #f009, -3px -3px #00f9',
    fontSize: '4rem',
    padding: '8px'
  },
  logo: {
    width: '150px',
    height: '150px',
    padding: '10px',
    marginLeft: '-323px',
    filter: 'drop-shadow(1px 1px 0 red) drop-shadow(-1px -1px 0 blue)'
  }
}
class Header extends React.Component {

  render() {

    return (
      <Paper>
        <header className='App-Header' style={style.header}>
          <img style={style.logo} src={this.props.icon} alt={this.props.category} />
          <h1 style={style.title}>{this.props.category}</h1>
        </header>
      </Paper>
    );
  }
}



export default Header;
