import React, {Component} from 'react';
import Recipe from './Recipe';
import './RecipeList.css';

class RecipeList extends Component {
	
	render() {
		const {onDelete, onEdit} = this.props;
		const recipes = this.props.recipes.map((r, index) => (
			<Recipe 
				key={r.id} 
				{...r} 
				onDelete={onDelete}
				onEdit={onEdit} />
		));
		
		return (
			<div className="recipeList">
				{recipes}
			</div>
		);
	}
}

export default RecipeList;


// WEBPACK FOOTER //
// ./src/RecipeList.jsx