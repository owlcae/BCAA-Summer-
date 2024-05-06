import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const navItems = [
  { label: 'Sign-in', url: '/signin' },
  { label: 'Registration', url: '/register' },
];

export function Header() {
    return (
      <HeaderWrapper>
        <Link to="/">
          <Logo src="/pc-logo.png" alt="Logo" />
        </Link>
        <Nav>
          {navItems.map((item) => (
            <NavItem key={item.label} to={item.url}> {/* Исправлено с navItem на NavItem и href на to */}
              {item.label}
            </NavItem>
          ))}
        </Nav>
      </HeaderWrapper>
    );
  }
  

export const PageWrapper = styled.div`
  background-color: #fff;
  color: #000;
  font-size: 15px;
  font-weight: 400;
  padding: 10px 60px 80px;

  @media (max-width: 1400px) {
    padding: 0 20px;
  }
`;

export const ContentWrapper = styled.div`
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

export const Logo = styled.img`
  height: auto; // Поддержка пропорций по высоте
  width: auto;  // Поддержка пропорций по ширине
  max-height: 80px;  // Максимальная высота логотипа
  max-width: 180px;  // Максимальная ширина логотипа
`;

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  gap: 20px;
  height: 60px;
  margin-top: 20px;
  padding: 0 15px;

  // Сюда можно добавить любые другие стили, которые нужны для хедера
`;


export const Nav = styled.nav`
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;

export const NavItem = styled(Link)`
  font-family: Montserrat, sans-serif;
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: none;
    color: inherit; // можно изменить, если нужно другое поведение при наведении
  }
`;

export default Header;
