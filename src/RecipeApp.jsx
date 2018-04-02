import React, { Component } from 'react';
import Navbar from './Navbar';
import RecipeList from './RecipeList';
import RecipeInput from './RecipeInput';
import './RecipeApp.css';

class RecipeApp extends Component {
	constructor(props) {
		super(props);
		
		// Initialize a recipes item in localStorage to avoid errors later.
		if (localStorage.getItem("recipes") === null)
			localStorage.setItem("recipes", "[]");
		
		this.state = {
			recipes: JSON.parse(localStorage.getItem("recipes")),
			// If there are no recipes, set the nextRecipeId to 0, otherwise set it to the last recipe id incremented by one.
			nextRecipeId:
				JSON.parse(localStorage.getItem("recipes")).length === 0
					? 0 
					: JSON.parse(localStorage.getItem("recipes"))[JSON.parse(localStorage.getItem("recipes")).length - 1].id + 1,
			showForm: false
		}
		
		this.handleSave = this.handleSave.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}
	
	handleSave(recipe) {
		this.setState((prevState, props) => {
			const newRecipe = {...recipe, id: this.state.nextRecipeId};
			localStorage.setItem("recipes", JSON.stringify([...this.state.recipes, newRecipe]));
			return {
				recipes: JSON.parse(localStorage.getItem("recipes")),
				nextRecipeId: prevState.nextRecipeId + 1,
				showForm: false
			}
		});
	}
  
	onDelete(id) {
		const recipes = this.state.recipes.filter(r => r.id !== id);
		localStorage.setItem("recipes", JSON.stringify(recipes));
		this.setState({recipes});
	}
	
	render() {
		const {showForm} = this.state;
		return (
			<div className="App">
			<Navbar onNewRecipe={() => this.setState({showForm: true})} />
			{showForm ? 
				<RecipeInput 
					onSave={this.handleSave}
					onClose={() => this.setState({showForm: false})} />
		    	: null}
			<RecipeList 
				onDelete={this.onDelete} 
				uploadedImage={this.state.uploadedImage} 
				recipes={this.state.recipes} />
			</div>
		);
	}
}

export default RecipeApp;



// WEBPACK FOOTER //
// ./src/RecipeApp.jsx