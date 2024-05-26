import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const RecipePage = () => {
  const { recipeTitle } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const [isNewRecipe, setIsNewRecipe] = useState(false);

  useEffect(() => {
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

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <RecipeWrapper>
      <RecipeImage src={recipe.image} alt={recipe.title} />
      <RecipeTitle>{recipe.title}</RecipeTitle>
      <RecipeDescription>{recipe.description}</RecipeDescription>
      <IngredientsList>
        {recipe.ingredients.map((ingredient, index) => (
          <Ingredient key={index}>
              {ingredient.name}
          </Ingredient>
        ))}
      </IngredientsList>
      <Instructions>
        {recipe.instructions}
      </Instructions>
    </RecipeWrapper>
  );
};

export const RecipeWrapper = styled.section`
  padding: 20px;
  background-color: #fff;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RecipeImage = styled.img`
  width: 300px; 
  height: 300px;
  object-fit: cover;
  object-position: center;
  border-radius: 0;
  margin-bottom: 20px;
`;

export const RecipeTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
`;

export const RecipeDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  margin-top: 10px;
`;

export const IngredientsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Ingredient = styled.li`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  padding: 5px 0;
`;

export const Instructions = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  margin-top: 20px;
  text-align: center;
`;

export const LoadingWrapper = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  margin-top: 20px;
`;

export default RecipePage;
