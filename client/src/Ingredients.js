import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const request = await fetch("http://localhost:8000/ingredients/list");

const GlobalStyle = createGlobalStyle`
  body, html {
    font-family: 'Montserrat', sans-serif;
    color: #000; // Assuming you want black text
    background-color: #fff; // Ensuring the background is white across all pages
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* Устанавливаем box-sizing на всех элементах */
    overflow-x: hidden;
  }
`; 

const categories = {
    "Spices and Herbs": ["Basil", "Black pepper", "Cilantro", "Cumin", "Dill", "Oregano", "Parsley", "Rosemary", "Salt", "Thyme", "Turmeric"],
    "Dairy Products": ["Butter", "Cheese", "Cream", "Milk", "Yogurt"],
    "Vegetables": ["Broccoli", "Carrots", "Cucumbers", "Garlic", "Onions", "Peppers", "Potatoes", "Tomatoes"],
    "Sweeteners": ["Honey", "Maple syrup", "Sugar"],
    "Oils and Fats": ["Canola oil", "Coconut oil", "Olive oil", "Sesame oil"],
    "Proteins": ["Beef", "Chicken", "Eggs", "Fish", "Lamb", "Lentils", "Pork", "Shellfish", "Tofu"],
    "Grains": ["Barley", "Corn", "Oats", "Rice", "Wheat"],
    "Fruits": ["Apples", "Bananas", "Cherries", "Lemons", "Oranges", "Strawberries"]
  };

  function IngredientsComponent() {
    return (
      <PageWrapper>
        <GlobalStyle />
        <ContentWrapper>
          <HeroTitle>All ingredients</HeroTitle>
          {Object.keys(categories).map(category => (
            <Category key={category}>
              <CategoryTitle>{category}</CategoryTitle>
              <ul>
                {categories[category].map(ingredient => (
                  <li key={ingredient}>
                    <Label>
                      <Checkbox />
                      {ingredient}
                    </Label>
                  </li>
                ))}
              </ul>
            </Category>
          ))}
        </ContentWrapper>
        <ButtonContainer>
          <SearchButton>Search Recipes</SearchButton>
        </ButtonContainer>
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
  max-width: 100%; // Убедитесь, что это значение не превышает ширину родительского элемента
  padding: 0 10px;
  margin: auto;
`;

const Category = styled.div`
  flex: 1 1 20%; // Уменьшаем базовую ширину до 20%
  margin: 5px;
  padding: 10px;
  background-color: #fff;
  box-sizing: border-box; // Это должно уже быть установлено, но убедитесь, что это правило применяется

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 5px;
  }

  @media (max-width: 1200px) {
    flex: 1 1 45%; // Возможно, потребуется уменьшить это значение, если колонки все еще выходят за пределы экрана
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

const HeroTitle = styled.h1`
  font-family: Montserrat, sans-serif;
  font-size: 45px;
  text-align: center;
  width: 100%; // Ensure the title spans the full width
  margin-bottom: 20px; // Add more space below the title
`;

const CategoryTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 30px; // Increase margin for better visual separation
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.11);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1); /* Более легкая тень */
  padding: 20px;
  text-align: center;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
  width: 30px; // Ensure this is large enough to be visible
  height: 30px; // Ensure this is large enough to be visible
  margin-right: 10px; // Space between the checkbox and the label text
  appearance: none; // Remove default system appearance
  background: white; // Background color for checkbox
  border: 1px solid black; // Solid border with color
  border-radius: 8px; // Apply border-radius here
  transition: background-color 0.3s, border-color 0.3s; // Smooth transition for visual feedback

  &:checked {
    background-color: #000; // Change background when checked
    border-color: #000; // Ensure border color matches background
  }

  &:focus {
    outline: none; // Removes the default focus outline
    border-color: #666; // Optional: changes border color on focus for better accessibility
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  width: 100%; // Занимает полную ширину
  display: flex;
  justify-content: center; // Центрирует содержимое по горизонтали
  margin-top: 20px; // Отступ сверху для отделения от списка категорий
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
  display: block; // Обеспечивает блочное отображение
  margin: 0 auto; // Центрирует кнопку в своем контейнере
  margin-top: 20px; // Дополнительный верхний отступ

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default IngredientsComponent;
