import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import * as recipeStyle from './Recipes';
import * as infredientStyle from './RecipeTemplate'

const GlobalStyle = createGlobalStyle`
  body, html {
    font-family: 'Montserrat', sans-serif;
    color: #000;
    background-color: #fff;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
  }
`;

function IngredientsComponent() {
  const [ingredients, setIngredients] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const request = await fetch('http://localhost:8000/ingredients/list');
        const ingredientsData = await request.json();
        // Добавляем свойство "selected" для отслеживания выбранных ингредиентов
        const ingredientsWithSelection = ingredientsData.map(ingredient => ({
          ...ingredient,
          selected: false
        }));
        setIngredients(ingredientsWithSelection);
        console.log("Ingredients data fetch: " + JSON.stringify(ingredientsWithSelection));
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    }
    fetchIngredients();
  }, []); // вызываем один раз при монтировании

  // Обработчик изменения состояния выбора ингредиента
  const handleIngredientSelect = id => {
    setIngredients(prevIngredients =>
      prevIngredients.map(ingredient =>
        ingredient.id === id ? { ...ingredient, selected: !ingredient.selected } : ingredient
      )
    );
  };

  const handleSearchRecipes = async () => {
    setLoading(true);
    try {
      const selectedIngredientIds = ingredients
        .filter(ingredient => ingredient.selected)
        .map(ingredient => ingredient.id);

      const response = await axios.post('http://localhost:8000/recipes/search/', {
        ingredientIds: selectedIngredientIds
      });

      setSearchedRecipes(response.data);
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
    setLoading(false);
  };


  // Группировка ингредиентов по их группам
  const groupedIngredients = ingredients.reduce((acc, ingredient) => {
    if (!acc[ingredient.group]) {
      acc[ingredient.group] = [];
    }
    acc[ingredient.group].push(ingredient);
    return acc;
  }, {});

  return (
    <PageWrapper>
      <GlobalStyle />
      <ContentWrapper>
        <HeroTitle>All ingredients</HeroTitle>
        {Object.keys(groupedIngredients).map(groupName => (
          <Category key={groupName}>
            <CategoryTitle>{groupName}</CategoryTitle>
            <ul>
              {groupedIngredients[groupName].map(ingredient => (
                <li key={ingredient.id}>
                  <Label>
                    <Checkbox
                      type="checkbox"
                      checked={ingredient.selected}
                      onChange={() => handleIngredientSelect(ingredient.id)}
                    />
                    {ingredient.name}
                  </Label>
                </li>
              ))}
            </ul>
          </Category>
        ))}
      </ContentWrapper>
      <ButtonContainer>
        <SearchButton onClick={handleSearchRecipes} disabled={loading}>
          {loading ? 'Searching...' : 'Search Recipes'}
        </SearchButton>
      </ButtonContainer>
      <infredientStyle.RecipeWrapper>
        {searchedRecipes.length > 0 ? (
          searchedRecipes.map(recipe => (
            <recipeStyle.RecipeCard key={recipe.id}>
              <recipeStyle.RecipeTitle>{recipe.title}</recipeStyle.RecipeTitle>
              <recipeStyle.RecipeImage src={recipe.image} alt={recipe.title} />
              <RecipeIngredients>
                <h3>Ingredients:</h3>
                <ul>
                  {recipe.ingredients.map(ingredient => (
                    <li key={ingredient.id}>
                      {ingredient.quantity} {ingredient.unit} of {ingredient.name}
                    </li>
                  ))}
                </ul>
              </RecipeIngredients>
              <RecipeInstructions>
                <h3>Instructions:</h3>
                <p>{recipe.instructions}</p>
              </RecipeInstructions>
              <RecipeTotalTime>
                <h3>Total Time:</h3>
                <p>{recipe.totalTime}</p>
              </RecipeTotalTime>
            </recipeStyle.RecipeCard>
          ))
        ) : (
          null
        )}
      </infredientStyle.RecipeWrapper>
    </PageWrapper>
  );
}

// Styled Components
const PageWrapper = styled.div`
  background-color: #fff;
  color: #000;
  font-size: 15px;
  font-weight: 400;
  padding: 10px 60px 80px;

  @media (max-width: 1400px) {
    padding: 0 20px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  padding: 0 10px;
  margin: auto;
`;

const Category = styled.div`
  flex: 1 1 20%;
  margin: 5px;
  padding: 10px;
  background-color: #fff;
  box-sizing: border-box;

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 5px;
  }

  @media (max-width: 1200px) {
    flex: 1 1 45%;
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

const HeroTitle = styled.h1`
  font-family: Montserrat, sans-serif;
  font-size: 45px;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
`;

const CategoryTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 30px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.11);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
`;

const Checkbox = styled.input`
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-right: 10px;
  appearance: none;
  background: white;
  border: 1px solid black;
  border-radius: 8px;
  transition: background-color 0.3s, border-color 0.3s;

  &:checked {
    background-color: #000;
    border-color: #000;
  }

  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 60px;
`;

const SearchButton = styled.button`
  font-family: Montserrat, sans-serif;
  font-size: 18px;
  border: none;
  border-radius: 100px;
  box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.25);
  padding: 10px 20px;
  background-color: white;
  color: black;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  margin-top: 20px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const RecipeIngredients = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px; /* Добавляем нижний отступ для разделения от следующего элемента */
`;

const RecipeInstructions = styled.p`
  font-size: 16px;
  line-height: 1.6; /* Задаем межстрочный интервал для лучшей читаемости */
  margin-bottom: 20px; /* Добавляем нижний отступ для разделения от следующего элемента */
`;

const RecipeTotalTime = styled.p`
  font-size: 16px;
  font-weight: bold; /* Выделяем текст */
  margin-bottom: 20px; /* Добавляем нижний отступ для разделения от следующего элемента */
`;

export default IngredientsComponent;
