import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  body, html {
    overflow-x: hidden;
  }
`;

function RecipesComponent() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const request = await fetch('http://localhost:8000/recipes/list');
        const recipesData = await request.json();
        setRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
    fetchRecipes().then(r => {});
  }, []);

  return (
    <PageWrapper>
      <GlobalStyle />
      <ContentWrapper> 
        <Heading>All recipes</Heading>
        <RecipesSection>
          <RecipesList>
            {recipes.map((recipe, index) => (
              <RecipeItem key={index}>
                <StyledLink to={`/recipe/${recipe.title}`}>
                  <RecipeCard>
                    <RecipeTitle>{recipe.title}</RecipeTitle>
                    <RecipeDescription>{recipe.instructions}</RecipeDescription>
                    <RecipeImagesWrapper>
                      <RecipeImage key={index} src={recipe.image} alt={recipe.title} />
                    </RecipeImagesWrapper>
                  </RecipeCard>
                </StyledLink>
              </RecipeItem>
            ))}
          </RecipesList>
        </RecipesSection>
      </ContentWrapper>
    </PageWrapper>
  );
}

export const PageWrapper = styled.div`
  background-color: #fff;
  color: #000;
  font-size: 15px;
  font-weight: 400;
  padding: 10px 60px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1400px) {
    padding: 0 20px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1160px;
  margin: auto;
  width: 100%;
  text-align: center;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Heading = styled.h1`
  font-family: Montserrat, sans-serif;
  font-size: 45px;
  text-align: center;
  color: #000;
  margin-bottom: 60px;
  margin-top: 60px;

  @media (max-width: 991px) {
    margin-bottom: 40px;
  }
`;

export const RecipesSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

export const RecipesList = styled.ul`
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

export const RecipeItem = styled.li`
  margin-bottom: 50px;

  @media (max-width: 991px) {
    margin-bottom: 40px;
  }
`;

export const RecipeCard = styled.article`
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.11);
  box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.25);
  padding: 29px;
  text-align: center;
  height: 450px;  // Set a fixed height for the card
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;


export const RecipeTitle = styled.h2`
  font: 700 20px Montserrat, sans-serif;
  color: #000;
  margin-bottom: 20px;
`;

export const RecipeDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  color: black;
  font-size: 18px;
  margin-top: 30px;
  display: block;
  cursor: pointer;
  height: 100px;  // Set a fixed height for the description
  overflow: hidden;  // Hide overflow text
  text-overflow: ellipsis;  // Add ellipsis to overflow text
  display: -webkit-box;
  -webkit-line-clamp: 5;  // Limit to 5 lines
  -webkit-box-orient: vertical;
`;


export const RecipeImagesWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  overflow: hidden;
`;

export const RecipeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default RecipesComponent;
