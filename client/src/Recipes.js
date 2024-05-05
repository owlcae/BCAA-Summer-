import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GlobalStyle = createGlobalStyle`
  body, html {
    overflow-x: hidden;
  }
`;

const request = await fetch("http://localhost:8000/recipes/list");
const recipes = await request.json;

//   {
//     name: "Plov",
//     description:
//       "Plov (also known as pilaf) is a popular dish in Central Asian cuisine, known for its aromatic combination of rice, meat, and vegetables. Here's a classic recipe for making Uzbek-style plov:",
//     images: ["https://cdn.builder.io/api/v1/image/assets/TEMP/a5c2f3f62d2853d1e9128f08a8e13bcefd386eae766dd0ec8ac7caf506aa245d?apiKey=9b12d59bfff844d1ab390f3fa02ebad3&"],
//   },
//   {
//     name: "Beshparmak",
//     description:
//       'Beshbarmak is a traditional dish from Central Asia, particularly popular in Kazakhstan and Kyrgyzstan. The name means "five fingers" because the dish is traditionally eaten with the hands.',
//     images: ["https://cdn.builder.io/api/v1/image/assets/TEMP/a5c2f3f62d2853d1e9128f08a8e13bcefd386eae766dd0ec8ac7caf506aa245d?apiKey=9b12d59bfff844d1ab390f3fa02ebad3&"],
//   },
//   {
//     name: "Plov",
//     description:
//       "Plov (also known as pilaf) is a popular dish in Central Asian cuisine, known for its aromatic combination of rice, meat, and vegetables. Here's a classic recipe for making Uzbek-style plov:",
//     images: ["https://cdn.builder.io/api/v1/image/assets/TEMP/a5c2f3f62d2853d1e9128f08a8e13bcefd386eae766dd0ec8ac7caf506aa245d?apiKey=9b12d59bfff844d1ab390f3fa02ebad3&"],
//   },
//   {
//     name: "Beshparmak",
//     description:
//       'Beshbarmak is a traditional dish from Central Asia, particularly popular in Kazakhstan and Kyrgyzstan. The name means "five fingers" because the dish is traditionally eaten with the hands.',
//     images: ["https://cdn.builder.io/api/v1/image/assets/TEMP/a5c2f3f62d2853d1e9128f08a8e13bcefd386eae766dd0ec8ac7caf506aa245d?apiKey=9b12d59bfff844d1ab390f3fa02ebad3&"],
//   },
// ];

function RecipesComponent() {
  return (
    <PageWrapper>
      <GlobalStyle />
      <ContentWrapper>
        <Heading>All recipes</Heading>
        <RecipesSection>
          <RecipesList>
            {recipes.map((recipe, index) => (
              <RecipeItem key={index}>
                <StyledLink to={`/recipe/${recipe.name}`}>
                  <RecipeCard>
                    <RecipeTitle>{recipe.name}</RecipeTitle>
                    <RecipeDescription>{recipe.description}</RecipeDescription>
                    <RecipeImagesWrapper>
                      {recipe.images.map((image, i) => (
                        <RecipeImage key={i} src={image} alt={recipe.name} />
                      ))}
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