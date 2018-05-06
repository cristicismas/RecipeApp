import React, {Component} from 'react';
import '../styles/Navbar.css';

class Navbar extends Component {
	
  render() {
    return(
      <header>
        <h1>RecipeApp</h1>
        <a onClick={this.props.onNewRecipe}><h3>New Recipe</h3></a>
      </header>
    );
  }
}

export default Navbar;


// WEBPACK FOOTER //
// ./src/Navbar.jsx