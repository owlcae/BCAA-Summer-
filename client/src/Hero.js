import React from 'react';
import styled from 'styled-components';

function Hero() {
    return (
        <HeroSection>
            <Heading>Welcome to PantryChef!</Heading>
            <SeeAllLink href="/ingredients">See all ingredients</SeeAllLink>
            <SeeAllLink href="/recipes">See all recipes</SeeAllLink>
        </HeroSection>
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

const SeeAllLink = styled.a`
  font-family: 'Montserrat', sans-serif;
  text-decoration: underline;
  color: black;
  font-size: 16px;
  margin-top: 20px;
  display: block;
  cursor: pointer;

  &:hover {
    color: darkblue;
  }
`;

export default Hero;