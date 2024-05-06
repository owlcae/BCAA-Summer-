import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const RecipePage = () => {
  const { recipeTitle } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const [isNewRecipe, setIsNewRecipe] = useState(false); // Флаг нового рецепта

  useEffect(() => {
    // if (isNewRecipe) {
    //   // Запрос на получение нового рецепта
    //   axios.get('http://localhost:8000/recipes/create')
    //     .then(response => {
    //       setRecipe(response.data);
    //       setError('');
    //     })
    //     .catch(error => {
    //       console.error('Error fetching new recipe:', error);
    //       setError('Failed to fetch new recipe');
    //     });
    // } else {
      // Запрос на получение существующего рецепта
      axios.get(`http://localhost:8000/recipes/${recipeTitle}`)
        .then(response => {
          setRecipe(response.data);
          setError('');
        })
        .catch(error => {
          console.error('Error fetching recipe data:', error);
          setError('Failed to fetch recipe');
        });
  }, [isNewRecipe, recipeTitle]);

  // Если произошла ошибка при загрузке рецепта
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Если рецепт ещё не загружен
  if (!recipe) {
    return <p>Loading...</p>;
  }

  // Отображение рецепта с помощью стилей
  return (
    <RecipeWrapper>
      <RecipeImage src={recipe.image} alt={recipe.title} />
      <RecipeTitle>{recipe.title}</RecipeTitle>
      <RecipeDescription>{recipe.description}</RecipeDescription>
      <IngredientsList>
        {recipe.ingredients.map((ingredient, index) => (
          <Ingredient key={index}>
            {ingredient.quantity} {ingredient.unit} {ingredient.name}
          </Ingredient>
        ))}
      </IngredientsList>
      <Instructions>
        {recipe.instructions}
      </Instructions>
    </RecipeWrapper>
  );
};

const RecipeWrapper = styled.section`
  padding: 20px;
  background-color: #fff;
  color: #000;
`;

const RecipeImage = styled.img`
  width: 100%;
  aspect-ratio: 1.32;
  object-fit: cover;
  object-position: center;
`;

const RecipeTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
`;

const RecipeDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  margin-top: 10px;
`;

const IngredientsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const Ingredient = styled.li`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  padding: 5px 0;
`;

const Instructions = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  margin-top: 20px;
`;

export default RecipePage;
