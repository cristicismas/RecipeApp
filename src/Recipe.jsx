import React, {Component} from 'react';
import './Recipe.css';

function validateImageURL(url) {        
	var exp = /^.*\.(jpg|jpeg|gif|JPG|png|PNG)$/;         
	return exp.test(url);  
}

class Recipe extends Component {
	render() {
		const {title, img, instructions, id, onDelete} = this.props;
		
		const RecipeImage = () => (
			<div className="recipe-card-image">
				{validateImageURL(img) ? <img src={img} alt={title}></img> : ""}
			</div>
		);
		
		const ingredients = this.props.ingredients.map((ing, index) => (
			<li key={index}>{ing}</li>
		));
		
		return (
			<div className="recipe-card">
				<RecipeImage />
				<div className="card-content">
					<h3 className="recipe-title">{title}</h3>
					<h4>Ingredients: </h4>
					<ul>
						{ingredients}
					</ul>
					<h4>Instructions:</h4>
					<p>{instructions}</p>
					<button type="button" onClick={() => onDelete(id)}>DELETE</button>
				</div>
			</div>
		);
	}
}

export default Recipe;