import React from "react";
import styled from "styled-components";
import BgImg from "../Assets/background.png";
import { useNavigate } from "react-router-dom";

function StartPage() {
  const navigate = useNavigate();

  return (
    <Background>
      <Title>MOVIE EDITION</Title>
      <Button onClick={() => navigate("/hangman")}>START</Button>
    </Background>
  );
}

export default StartPage;

const Background = styled.div`
  background: url(${BgImg});
  width: 100%;
  background-size: cover;
  height: 100vh;
  color: #f5f5f5;
`;

const Title = styled.p`
  color: rgba(250, 250, 250, 0.8);
  position: absolute;
  font-family: Chalk;
  top: 40%;
  left: 50%;
  font-size: 3rem;
  letter-spacing: 15px;
`;

const Button = styled.button`
  position: absolute;
  top: 29%;
  left: 62%;
  width: 200px;
  height: 50px;
  background: none;
  border-radius: 50px;
  font-family: Chalk;
  color: rgba(250, 250, 250, 0.8);
  font-size: 1.5rem;
  letter-spacing: 5px;
`;
