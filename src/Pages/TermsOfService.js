import React from "react";
import styled from "styled-components";
import ArrowBack from "../Images/ArrowBack";

function TermsOfService(props) {
  return (
    <Container>
      <TopBar>
        <div>
          <div className="rectangle"></div>
          <div className="circle"></div>
          <div className="triangle"></div>
        </div>
      </TopBar>
      <TopBox>
        <div onClick={() => props.history.push("/")}>
          <ArrowBack />
        </div>
        <Text>서비스 이용약관</Text>
      </TopBox>
    </Container>
  );
}

export default TermsOfService;

const Container = styled.div`
  background: #f2f6ff;
  width: 100vw;
  height: 100vh;
`;

const TopBar = styled.div`
  padding-top: 7px;
  padding-right: 7px;
  height: 24px;
  background: #f5f5f5;
  display: flex;
  justify-content: flex-end;

  div {
    display: flex;
    justify-content: space-between;
    width: 53px;

    .rectangle {
      width: 10px;
      height: 10px;
      background: #212121;
    }
    .circle {
      width: 10px;
      height: 10px;
      background: #212121;
      border-radius: 100px;
    }
    .triangle {
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 10px solid black;
    }
  }
`;

const TopBox = styled.div`
  display: flex;
  height: 56px;
  padding: 32px;
  box-shadow: 0px 2px 4px rgba(66, 66, 66, 0.14),
    0px 4px 5px rgba(66, 66, 66, 0.12), 0px 1px 10px rgba(66, 66, 66, 0.2);
`;

const Text = styled.p`
  margin-left: 24px;
  color: #757575;
`;
