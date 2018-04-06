import React, {Component} from 'react';
import './RecipeInput.css';

class RecipeInput extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      instructions: '',
      ingredients: [''],
      img: ''
    };
    
    this.clearUrlInput = this.clearUrlInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isSpaceLeft = this.isSpaceLeft.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
    this.handleNewIngredient = this.handleNewIngredient.bind(this);
    this.handleChangeIng = this.handleChangeIng.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidMount() {
    const {recipeToEdit} = this.props;
    
    if (recipeToEdit !== null) {
      this.clearUrlInput();
      
      this.setState({ 
        title: recipeToEdit.title,
        instructions: recipeToEdit.instructions,
        ingredients: recipeToEdit.ingredients,
        img: recipeToEdit.img
      });
    }
  }
  
  clearUrlInput() {
    this.setState({img: ''});
  }
  
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  
  // Checks to see if there is space left for the image in localStorage
  isSpaceLeft(image) {
    try {
      localStorage.setItem("test", image);
      localStorage.removeItem("test");
      return true;
    } catch (e) {
      return false;
    }
  }
  
  handleImageUpload(e) {
    const MAX_IMAGE_SIZE = 300000; // 300kb
    let fileInput = document.getElementById('img-file-input');
    let file = fileInput.files[0];
    let thisContext = this;

    // limit uploaded image size
    if (file.size < MAX_IMAGE_SIZE) {
      // Make sure image is jpeg / jpg / png
      if (/\.(jpe?g|png)$/i.test(file.name)) {
        const reader = new FileReader();

        reader.onload = function(e) {
          if (thisContext.isSpaceLeft(e.target.result)) {
            thisContext.clearUrlInput();
            thisContext.setState({img: e.target.result});
          } else {
            window.alert("No more space left. Please consider deleting other recipes to make room for another one.")
          }
        }
        reader.readAsDataURL(file);
      }
    } else {
      window.alert("Image size is too big. Try compressing it or selecting another image.");
    }
    
  }

  handleRemoveIngredient(e) {
    const {ingredients} = this.state;
	if (ingredients.length > 1) {
      this.setState({ingredients: ingredients.slice(0, -1)});
    }
  }

  handleNewIngredient(e) {
    const ING_LIMIT = 50;
    const {ingredients} = this.state;
    if (ingredients.length < ING_LIMIT)
      this.setState({ingredients: [...ingredients, '']});
  }
  
  handleChangeIng(e) {
    const index = Number(e.target.name.split('-')[1]);
    const ingredients = this.state.ingredients.map((ing, i) => (
      i === index ? e.target.value : ing
    ));
    this.setState({ingredients});
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSave({...this.state});
    this.setState({
      title: '',
      instructions: '',
      ingredients: [''],
      img: ''
    });
  }
  
  render() {
    const {title, instructions, img, ingredients} = this.state;
    const {onClose} = this.props;
    
    let inputs = ingredients.map((ing, i) => (
      <div
        className="recipe-form-line"
        key={`ingredient-${i}`}
      >
        <label>{i+1}.
          <input
            type="text"
            name={`ingredient-${i}`}
            value={ing}
            size={45}
            autoComplete="off"
            placeholder=" Ingredient"
            onChange={this.handleChangeIng}
            required />
        </label>
      </div>
    ));
    
    return (
      <div className="recipe-form-container">
        <form className='recipe-form' onSubmit={this.handleSubmit}>
          <button
            type="button"
            className="close-button"
            onClick={onClose}
          >
            X
          </button>
          <div className='recipe-form-line'>
            <label htmlFor='recipe-title-input'>Title</label>
            <input
              id='recipe-title-input'
              key='title'
              name='title'
              type='text'
              value={title}
              size={42}
              autoComplete="off"
              onChange={this.handleChange}
              required />
          </div>
          <label
            htmlFor='recipe-instructions-input'
            style={{marginTop: '5px'}}
          >
            Instructions
          </label>
          <textarea
            key='instructions'
            id='recipe-instructions-input'
            type='Instructions'
            name='instructions'
            rows='8'
            cols='50'
            autoComplete='off'
            value={instructions}
            onChange={this.handleChange} 
            required />
            
          <label>Ingredients</label>
          <div className="delete-and-insert-ing-buttons">
            <button
              type="button"
              onClick={this.handleRemoveIngredient}
              className="buttons"
            >
              -
            </button>
            <button
              type="button"
              onClick={this.handleNewIngredient}
              className="buttons"
            >
              +
            </button>
          </div>
          {inputs}
          
          <div className='recipe-form-line'>
            <label htmlFor='recipe-img-input'>Image Url</label>
            <input
              id='recipe-img-input'
              type='text'
              placeholder=''
              name='img'
              value={img}
              size={36}
              autoComplete='off'
              onChange={this.handleChange} />
            <button
              type="button"
              id="clear-url-input"
              onClick={() => this.setState({img: ''})}
            >X</button>
          </div>
          <div className="recipe-form-line">
          	<p>Or pick an image from your own device: </p>
            <input
              id="img-file-input"
              type="file"
              onChange={this.handleImageUpload} />
          </div>
          <button
            type="submit"
            className="buttons"
            style={{alignSelf: 'flex-end', marginRight: 0}}
          >
            SAVE
          </button>
        </form>
      </div>
    )
  }
}

export default RecipeInput;


// WEBPACK FOOTER //
// ./src/RecipeInput.jsx