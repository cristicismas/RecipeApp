import React, {Component} from 'react';
import Recipe from './Recipe';
import '../styles/RecipeList.css';

class RecipeList extends Component {
	
  render() {
    const {onDelete, onEdit} = this.props;
    const recipes = this.props.recipes.map((r, index) => (
      <Recipe key={r.id} 
              {...r} 
              onDelete={onDelete}
              onEdit={onEdit} />
    ));

    return (
      <div className="recipeList">
        {
          recipes.length > 0 ?
          recipes :
          <div className="center"><h3 id="guide">Click on "New Recipe" to add a new recipe!</h3></div>
        }
      </div>
    );
  }
}

export default RecipeList;


// WEBPACK FOOTER //
// ./src/RecipeList.jsx