import React, {Component} from 'react';
import './Recipe.css';

function validateImageURL(url) {
  // Regex for normal image extention
  var imgExp = /^.*\.(jpg|jpeg|gif|JPG|png|PNG)$/;

  // Regex for uploaded image
  var uploadExp = /data:image\/([a-zA-Z]*);base64,([^"]*)/;
  return imgExp.test(url) || uploadExp.test(url);  
}

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showConfirmation: false
    }

    this.changeShowConfirmation = this.changeShowConfirmation.bind(this);
  }

  changeShowConfirmation() {
    let {showConfirmation} = this.state;

    if (showConfirmation) {
      this.setState({showConfirmation: false});
    } else {
      this.setState({showConfirmation: true});
    }
  }

  render() {
    const {title, img, instructions, id} = this.props;

    const RecipeImage = () => (
      <div className="recipe-card-image">
        {validateImageURL(img) ? <img src={img} alt={title}></img> : ''}
      </div>
    );

    const ingredients = this.props.ingredients.map((ing, index) => (
      <li key={index}>● {ing}</li>
    ));

    const DeleteConfirmation = () => (
      <div className="delete-confirmation">
        <p>Are you sure you want to delete this recipe?</p>
        <div className="answers">
          <button 
            type="button" 
            id="deny-confirmation" 
            onClick={() => this.setState({showConfirmation: false})}
            >No</button>
          <button 
            type="button" 
            id="accept-confirmation" 
            onClick={() => this.props.onDelete(id)}
            >Yes</button>
        </div>
      </div>
    );

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

          <hr />
          <div className="action-buttons">
            <button type="button" onClick={() => this.setState({showConfirmation: true})}>DELETE</button>
            <button type="button" onClick={() => this.props.onEdit(id)}>EDIT</button>
          </div>

          {this.state.showConfirmation ? <DeleteConfirmation /> : ''}
        </div>
      </div>
    );
  }
}

export default Recipe;


// WEBPACK FOOTER //
// ./src/Recipe.jsx