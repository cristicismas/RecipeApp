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
			recipeToEdit: null,
			// If there are no recipes, set the nextRecipeId to 0, otherwise set it to the last recipe id incremented by one.
			nextRecipeId:
				JSON.parse(localStorage.getItem("recipes")).length === 0
					? 0 
					: JSON.parse(localStorage.getItem("recipes"))[JSON.parse(localStorage.getItem("recipes")).length - 1].id + 1,
			showForm: false
		}
		
		this.onNewRecipe = this.onNewRecipe.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onEdit = this.onEdit.bind(this);
	}
	
	handleSave(recipe) {
		this.setState((prevState, props) => {
			const newRecipe = {...recipe, id: this.state.nextRecipeId};
			try {
              localStorage.setItem("recipes", JSON.stringify([...this.state.recipes, newRecipe]));
            } catch (e) {
              if (e.code === 22) {
                window.alert("Maximum storage has been reached. Cannot save this recipe. Try deleteling other recipes or saving them with lower resolution images.");
              }
            }
			return {
				recipes: JSON.parse(localStorage.getItem("recipes")),
				nextRecipeId: prevState.nextRecipeId + 1,
				showForm: false
			}
		});
		
		if (this.state.recipeToEdit !== null) {
			const {recipes, recipeToEdit} = this.state;
			
			for (let i = 0; i < recipes.length; i++) {
				if (recipes[i].id === recipeToEdit.id) {
					recipes.splice(i, 1);
					localStorage.setItem("recipes", JSON.stringify(recipes));
				}
			}
			
			this.setState({recipeToEdit: null});
		}
	}
	
	onDelete(id) {
		const recipes = this.state.recipes.filter(r => r.id !== id);
		localStorage.setItem("recipes", JSON.stringify(recipes));
		this.setState({recipes});
	}
	
	onEdit(id) {
		this.setState({showForm: true});
		
		// Scroll to top when form opens
		document.body.scrollTop = 0; // For Safari
    	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
		
		const recipes = JSON.parse(localStorage.getItem('recipes'));
		
		for (let i = 0; i < recipes.length; i++) {
			if (recipes[i].id === id) {
				this.setState({recipeToEdit: recipes[i]});
			}
		}
	}
  
    onNewRecipe() {
		let recipesNumber = JSON.parse(localStorage.getItem('recipes')).length;
		
		// Safari only supports 5MB on localStorage, which means ~16 recipes with 300kb images.
		const maxRecipeNumberOnSafari = 16;
		// Chrome and other browsers support 10MB on localStorage, which is ~33 recipes.
		const maxRecipeNumber = 33;
		
		// Check if browser is safari to know the size of localStorage
		if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
			if (recipesNumber < maxRecipeNumberOnSafari) {
				this.setState({showForm: true});
			}
			else {
				window.alert("Maximum recipes number exceeded. Please delete other recipes to make room for another one.");
			}
		} else {
			if (recipesNumber < maxRecipeNumber) {
				this.setState({showForm: true});
			}
			else {
				window.alert("Maximum recipes number exceeded. Please delete other recipes to make room for another one.");
			}
		}
	}
	
	render() {
		const {showForm} = this.state;
		return (
			<div className="App">
			<Navbar onNewRecipe={this.onNewRecipe} />
			{showForm ? 
				<RecipeInput 
					onSave={this.handleSave}
					onClose={() => this.setState({showForm: false})}
	    			recipeToEdit={this.state.recipeToEdit} />
		    	: null}
			<RecipeList 
				onDelete={this.onDelete}
				onEdit={this.onEdit}
				uploadedImage={this.state.uploadedImage} 
				recipes={this.state.recipes} />
			</div>
		);
	}
}

export default RecipeApp;



// WEBPACK FOOTER //
// ./src/RecipeApp.jsx