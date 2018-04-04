import React, {Component} from 'react';
import './Navbar.css';

class Navbar extends Component {
	
	render() {
		const recipesLeft = this.props.maxRecipes - this.props.recipesStored;
		
		return(
			<header>
				<h1>RecipeApp</h1>
				{recipesLeft > 0
					? <div className="wrapper"><h4>Recipes left: <span id="recipes-left-number">{recipesLeft}</span></h4></div>
					: <div className="wrapper"><h3 id="no-recipes-left">NO RECIPES LEFT</h3></div>}
				<a onClick={this.props.onNewRecipe}><h3>New Recipe</h3></a>
			</header>
		);
	}
}

export default Navbar;


// WEBPACK FOOTER //
// ./src/Navbar.jsx