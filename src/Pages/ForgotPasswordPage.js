import React from "react";
import styled from "styled-components";

import ForgotPassword from "../Components/forgotPassword/ForgotPassword";

import Img1 from "../Images/MaskGroup.png";
import Img2 from "../Images/MaskGroup2.png";

function ForgotPasswordPage(props) {
  return (
    <Container>
      <ImgRight src={Img2} />
      <ImgLeft src={Img1} />
      <ForgotPassword props={props} />
    </Container>
  );
}
export default ForgotPasswordPage;

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
