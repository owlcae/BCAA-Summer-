import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Header from './Headerstyles'; // Подразумевается, что у вас есть компонент Header
import SearchComponent from './SearchByIngredients';
import RecipesComponent from './Recipes';
import IngredientsComponent from './Ingredients';
import RegisterComponent from './SignUp';
import LoginComponent from './SingIn';
import RecipePage from './RecipeTemplate'; 

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    overflow-x: hidden; // Скрыть горизонтальную прокрутку
    font-family: 'Montserrat', sans-serif; // Установить шрифт по умолчанию
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<SearchComponent />} />
        <Route path="/recipes" element={<RecipesComponent />} />
        <Route path="/ingredients" element={<IngredientsComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/signin" element={<LoginComponent />} />
        <Route path="/recipes/:recipeTitle" element={<RecipePage />} />
      </Routes>
    </Router>
  );
}

export default App;
