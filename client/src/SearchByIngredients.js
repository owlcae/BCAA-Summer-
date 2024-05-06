import React from 'react';
import styled from 'styled-components';

function Hero() {
  const handleSearch = () => {
    console.log("Search initiated!");
    // Здесь может быть код для выполнения поиска
  };

  return (
    <HeroSection>
      <HeroTitle>Enter your ingredients</HeroTitle>
      <SearchInput type="text" placeholder="Type here" />
      <SearchButton onClick={handleSearch}>Search</SearchButton>
      <SeeAllLink href="/ingredients">See all ingredients</SeeAllLink>
      <SeeAllLink href="/recipes">See all recipes</SeeAllLink>
    </HeroSection>
  );
}

function SearchComponent() {
  return (
    <PageWrapper>
        <ContentWrapper>
        <Hero />
      </ContentWrapper>
    </PageWrapper>
  );
}

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
  flex-direction: column;
  align-items: center;
  max-width: 1160px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 62px;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const HeroTitle = styled.h1`
  font-family: Montserrat, sans-serif;
  font-size: 45px;
  text-align: center;
  margin-top: 25px;

  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

const SearchInput = styled.input`
  font-family: Montserrat, sans-serif;
  border: 1px solid rgba(0, 0, 0, 0.02);
  border-radius: 100px;
  box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.25);
  margin-top: 25px;
  max-width: 490px;
  width: 100%;
  height: 25px;
  padding: 10px 16px;

  @media (max-width: 991px) {
    margin-top: 40px;
    padding-right: 20px;
  }
`;

const SearchButton = styled.button`
  font-family: Montserrat, sans-serif;
  font-size: 18px;
  border: 1px solid rgba(0, 0, 0, 0.02);
  border-radius: 100px;
  box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.25);
  margin-top: 30px;
  padding: 10px 20px;
  white-space: nowrap;
  background-color: white;  // Установка белого фона
  color: black;  // Установка чёрного цвета текста
  cursor: pointer; // Чтобы пользователь понимал, что кнопка интерактивна

  &:hover {
    background-color: #f0f0f0;  // Светло-серый фон при наведении для визуальной обратной связи
  }

  @media (max-width: 991px) {
    margin-top: 30px;
    white-space: initial;
  }
`;


const SeeAllLink = styled.a`
  font-family: 'Montserrat', sans-serif; // Шрифт Montserrat используется для соответствия вашему дизайну
  text-decoration: underline; // Постоянное подчеркивание текста
  color: black; // Цвет текста, если дефолтный не подходит
  font-size: 16px; // Размер шрифта увеличен для лучшей видимости
  margin-top: 20px; // Увеличенный вертикальный отступ для разделения
  display: block; // Ссылки ведут себя как блочные элементы
  cursor: pointer; // Указывает, что элемент интерактивный

  &:hover {
    color: darkblue; // Изменение цвета при наведении для лучшей видимости
  }
`;


export default SearchComponent;