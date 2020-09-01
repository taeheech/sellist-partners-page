import React from "react";
import styled from "styled-components";
import PartnersMobile from "../Components/PartnersMobile";
import Img1 from "../Images/MaskGroup.png";
import Img2 from "../Images/MaskGroup2.png";

function HomeDesktop(props) {
  const propsFromHomePage = props.props;

  return (
    <Container>
      <ImgRight src={Img1} />
      <ImgLeft src={Img2} />
      <PartnersMobile props={propsFromHomePage} />
      {/* <ResetPsw /> */}
    </Container>
  );
}

export default HomeDesktop;

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
`;

const ImgLeft = styled.img`
  position: absolute;
  left: 50.24%;
  top: 30%;
  bottom: 0.09%;
  transform: rotate(20deg);
  width: 20%;
  border-radius: 20px;
  opacity: 0.4;
  box-shadow: -30px -8px #384bc7;
`;
