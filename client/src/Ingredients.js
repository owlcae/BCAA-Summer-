import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {Link} from "react-router-dom";

export function IngredientsComponent() {
  const [ingredients, setIngredients] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function fetchIngredients() {
      try {
        const request = await fetch('http://localhost:8000/ingredients/list');
        const ingredientsData = await request.json();
        const ingredientsWithSelection = ingredientsData.map((ingredient) => ({
          ...ingredient,
          selected: false
        }));
        setIngredients(ingredientsWithSelection);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    }
    fetchIngredients().then(r => {
    });
  }, []);

  const handleIngredientSelect = (id) => {
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
          .filter((ingredient) => ingredient.selected)
          .map((ingredient) => ingredient.id);

      console.log('Selected Ingredient IDs:', selectedIngredientIds);

      const response = await axios.post('http://localhost:8000/search', {
        ingredientIds: selectedIngredientIds
      });

      console.log('Response:', response.data);
      setSearchedRecipes(response.data);
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
    setLoading(false);
  };

  const groupedIngredients = ingredients.reduce((acc, ingredient) => {
    if (!acc[ingredient.group]) {
      acc[ingredient.group] = [];
    }
    acc[ingredient.group].push(ingredient);
    return acc;
  }, {});

  return (
      <PageWrapper>
        <ContentWrapper>
          <HeroTitle>All ingredients</HeroTitle>
          {Object.keys(groupedIngredients).map((groupName) => (
              <Category key={groupName}>
                <CategoryTitle>{groupName}</CategoryTitle>
                <ul>
                  {groupedIngredients[groupName].map((ingredient) => (
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
        <RecipeWrapper>
          <RecipesList>
            {searchedRecipes.length > 0 && searchedRecipes.map((recipe, index) => (
                <RecipeItem key={index}>
                  <StyledLink to={`/recipe/${recipe.title}`}>
                    <RecipeCard>
                      <RecipeTitle>{recipe.title}</RecipeTitle>
                      <RecipeInstructions>
                        <p>{recipe.instructions}</p>
                      </RecipeInstructions>
                      <RecipeImagesWrapper>
                      <RecipeImage src={recipe.image} alt={recipe.title} />
                      </RecipeImagesWrapper>
                    </RecipeCard>
                  </StyledLink>
                </RecipeItem>
            ))}
          </RecipesList>
        </RecipeWrapper>
      </PageWrapper>
  );
}

const PageWrapper = styled.div`
  background-color: #fff;
  color: #000;
  font-size: 15px;
  font-weight: 400;
  padding: 10px 60px 80px;
  overflow-x: hidden;

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
  overflow-x: hidden;
`;

const Category = styled.div`
  flex: 0 0 auto;
  width: 350px;
  margin: 20px;
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
    width: calc(50% - 10px);
  }

  @media (max-width: 768px) {
    width: calc(100% - 10px);
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
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
`;

export const Checkbox = styled.input`
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

export const Label = styled.label`
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
  box-shadow: 0 4px 9px 0 rgba(0, 0, 0, 0.25);
  padding: 10px 20px;
  background-color: white;
  color: black;
  cursor: pointer;
  display: block;
  margin: 20px auto 0;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const RecipeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  padding: 0 10px;
  margin: auto;
  overflow-x: hidden;
`;

const RecipesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const RecipeItem = styled.li`
  margin-bottom: 50px;

  @media (max-width: 991px) {
    margin-bottom: 40px;
  }
`;

const RecipeCard = styled.div`
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.11);
  box-shadow: 0 4px 9px 0 rgba(0, 0, 0, 0.25);
  padding: 29px;
  text-align: center;
  height: 450px;  // Set a fixed height for the card
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RecipeTitle = styled.h2`
  font-size: 20px;
`;

const RecipeImagesWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  overflow: hidden;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RecipeInstructions = styled.div`
  font-family: 'Montserrat', sans-serif;
  color: black;
  font-size: 18px;
  display: block;
  cursor: pointer;
  height: 100px;  // Set a fixed height for the description
  overflow: hidden;  // Hide overflow text
  text-overflow: ellipsis;  // Add ellipsis to overflow text
  display: -webkit-box;
  -webkit-line-clamp: 5;  // Limit to 5 lines
  -webkit-box-orient: vertical;
`;

export default IngredientsComponent;
