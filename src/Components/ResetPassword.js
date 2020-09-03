import React from "react";
import styled from "styled-components";
import ArrowBack from "../Images/ArrowBack";

function ResetPassword(props) {
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
        <Text></Text>
      </TopBox>
      <InputBox>
        <div>Pick a new password</div>
        <input
          type="password"
          placeholder="새 비밀번호"
          className="newPassword"
        />
        <input type="password" placeholder="비밀번호 확인" />
      </InputBox>
      <FooterBox>
        <Button>CHANGE PASSWORD</Button>
      </FooterBox>
    </Container>
  );
}

export default ResetPassword;

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
`;

const Text = styled.p`
  margin-left: 24px;
  color: #757575;
`;

const InputBox = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  padding-right: 16px;
  padding-left: 16px;

  div {
    margin-bottom: 32px;
    font-weight: 500;
    font-size: 21px;
    line-height: 25px;
  }
  input {
    padding: 13px;
    width: 100%;
    height: 56px;
    background: white;
    font-size: 16px;
  }

  .newPassword {
    margin-bottom: 5%;
  }

  .name {
    margin-bottom: 5%;
  }
`;

const FooterBox = styled.div`
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  padding-right: 16px;
  padding-left: 16px;

  p {
    height: 18px;
    font-size: 14px;
    text-align: center;
    color: #424242;
  }

  .terms {
    margin-top: 5%;
    display: flex;
    justify-content: space-evenly;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.08em;
  }

  div {
    font-size: 12px;
    line-height: 14px;
    font-weight: bold;
    color: #212121;
  }
`;

const Button = styled.button`
  margin-top: 10%;
  height: 48px;
  background: #bdbdbd;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.08em;
  color: #FFFFFF;
}
`;
