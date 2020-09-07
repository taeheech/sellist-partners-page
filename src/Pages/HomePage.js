import React from "react";
import styled from "styled-components";

import Home from "../Components/homeComponents/Home";

import Img1 from "../Images/MaskGroup.png";
import Img2 from "../Images/MaskGroup2.png";

function HomePage(props) {
  return (
    <Container>
      <ImgRight src={Img1} />
      <ImgLeft src={Img2} />
      <Home props={props} />
    </Container>
  );
}
export default HomePage;

const Container = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #3c66ba;
  overflow: hidden;
`;
const ImgRight = styled.img`
  position: absolute;
  left: 81.24%;
  right: -70.75%;
  top: 7%;
  bottom: 0.09%;
  transform: rotate(20deg);
  opacity: 0.4;
  @media screen and (max-width: 755px) {
    display: none;
  }
`;
const ImgLeft = styled.img`
  position: absolute;
  left: 50.24%;
  top: 30%;
  bottom: 0.09%;
  transform: rotate(20deg);
  border-radius: 20px;
  opacity: 0.4;
  @media screen and (max-width: 755px) {
    display: none;
  }
`;
