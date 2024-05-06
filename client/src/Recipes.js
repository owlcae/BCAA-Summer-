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
        console.log("Recipes data fetch: " + JSON.stringify(recipesData));
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
    fetchRecipes();
  }, []); // вызываем один раз при монтировании

  return (
    <PageWrapper>
      <GlobalStyle />
      <ContentWrapper>
        <Heading>All recipes</Heading>
        <RecipesSection>
          <RecipesList>
            {recipes.map((recipe, index) => {
              console.log("Recipe at index", index, ":", recipe);
              return (
                <RecipeItem key={index}>
                  <StyledLink to={`/recipe/${recipe.title}`}>
                    <RecipeCard>
                      <RecipeTitle>{recipe.title}</RecipeTitle>
                      <RecipeDescription>{recipe.instructions}</RecipeDescription>
                      <RecipeImagesWrapper>
                      <RecipeImage key={index} src={recipe.image} alt={recipe.title} />
                        {/* {recipe.images.map((image, i) => {
                          console.log("Image at index", i, ":", image);
                          return (
                            <RecipeImage key={i} src={image} alt={recipe.name} />
                          );
                        })} */}
                      </RecipeImagesWrapper>
                    </RecipeCard>
                  </StyledLink>
                </RecipeItem>
              );
            })}
          </RecipesList>
        </RecipesSection>
      </ContentWrapper>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  background-color: #fff;
  color: #000;
  font-size: 15px;
  font-weight: 400;
  padding: 10px 60px 80px; // Ensure padding does not cause overflow
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; // Control width to avoid overflow
  box-sizing: border-box; // Include padding and border in the element's total width

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
  text-align: center; /* добавляем центрирование для содержимого */

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
  text-align: center;

  @media (max-width: 991px) {
    margin-bottom: 40px;
  }
`;

const RecipesSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none; // Убирает подчеркивание
  color: inherit; // Наследует цвет текста от родительского элемента
  &:hover {
    text-decoration: none; // Убирает подчеркивание при наведении
    color: inherit; // Можно изменить цвет при наведении если нужно
  }
`;

const RecipesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 100%; // Ensure it occupies only available space

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;


const RecipeItem = styled.li`
  margin-bottom: 50px;

  @media (max-width: 991px) {
    margin-bottom: 40px;
  }
`;

const RecipeCard = styled.article`
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.11);
  box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.25);
  padding: 29px;
  text-align: center;
`;

const RecipeTitle = styled.h2`
  font: 700 20px Montserrat, sans-serif;
  color: #000;
  margin-bottom: 20px;
`;

const RecipeDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  color: black; // Цвет текста, если дефолтный не подходит
  font-size: 18px; // Размер шрифта увеличен для лучшей видимости
  margin-top: 30px; // Увеличенный вертикальный отступ для разделения
  display: block; // Ссылки ведут себя как блочные элементы
  cursor: pointer; //
`;

const RecipeImagesWrapper = styled.div`
  position: relative;
  width: 450px;
  min-height: 185px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const RecipeImage = styled.img`
  width: 100%; /* Установить ширину изображения на 100% контейнера */
  min-height: 185px;
  margin-top: 20px;
  margin-left: 20px;
`;

export default RecipesComponent;