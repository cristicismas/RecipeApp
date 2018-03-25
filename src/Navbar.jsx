import React, {Component} from 'react';
import './Navbar.css';

class Navbar extends Component {
	static defaultProps = {
		onNewRecipe() {}
	}
	
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