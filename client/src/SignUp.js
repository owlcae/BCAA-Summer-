import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    overflow-x: hidden; // Prevents horizontal scrolling
    font-family: 'Montserrat', sans-serif;
  }
`;

const data = [
  {
    type: "text",
    placeholder: "Login",
  },
  {
    type: "email",
    placeholder: "E-mail",
  },
];

function RegisterComponent() {
  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <ContentWrapper>
          <HeroSection>
            <HeroTitle>Registration</HeroTitle>
            <Form>
              {data.map((item, index) => (
                <React.Fragment key={index}>
                  <Label htmlFor={item.label}>
                    {item.label}
                  </Label>
                  <Input
                    type={item.type}
                    id={item.label}
                    placeholder={item.placeholder}
                    aria-label={item.placeholder}
                  />
                </React.Fragment>
              ))}
              <SubmitButton type="submit">Register</SubmitButton>
            </Form>
          </HeroSection>
        </ContentWrapper>
      </PageWrapper>
    </>
  );
}

const PageWrapper = styled.div`
  background-color: #fff;
  color: #000;
  font-size: 15px;
  font-weight: 400;
  padding: 20px; // Reduced padding for a more compact look
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1160px;
  margin: auto;
  width: 100%;
  text-align: center;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 62px;
`;

const HeroTitle = styled.h1`
  font-family: Montserrat, sans-serif;
  font-size: 45px;
  text-align: center;
  margin-top: 25px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  &.visually-hidden {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
  }
`;

const Input = styled.input`
  font-family: Montserrat, sans-serif;
  border-radius: 100px;
  box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.02);
  padding: 10px 20px;
  margin-top: 10px;
  width: 100%;  // Ensure full width input boxes
`;

const SubmitButton = styled.button`
  font-family: Montserrat, sans-serif;
  font-size: 18px;
  border-radius: 100px;
  box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.25);
  border: none;
  margin-top: 30px;
  padding: 10px 20px;
  white-space: nowrap;
  background-color: white;
  color: black;
  cursor: pointer;
  align-self: center;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default RegisterComponent;
