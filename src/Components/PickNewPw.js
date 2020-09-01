import React from "react";
import styled from "styled-components";
import ArrowBack from "../Images/ArrowBack";
import Logo from "../Images/Logo";
import Partners from "../Images/Partners";
import Snackbar from "@material-ui/core/Snackbar";

function PickNewPw(props) {
  const propsFromPickNewPwPage = props.props;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
        <div onClick={() => propsFromPickNewPwPage.history.push("/")}>
          <ArrowBack />
        </div>
      </TopBox>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <PartnersWrapper>
        <Partners />
      </PartnersWrapper>
      <InputBox>
        <InputBoxText>비밀번호 찾기</InputBoxText>
        <input
          placeholder="가입하신 이메일을 입력해주세요."
          className="newPassword"
        />
      </InputBox>
      <FooterBox>
        <ChangeButton onClick={handleClick}>비밀번호 찾기</ChangeButton>
        <Snackbar
          className="sc"
          anchorOrigin={{
            vertical: "",
            horizontal: "center",
          }}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message="이메일을 확인해 주세요"
        />
      </FooterBox>
    </Container>
  );
}
export default PickNewPw;

const Container = styled.div`
  background: #f2f6ff;
  width: 100vw;
  height: 100vh;

  @media screen and (min-width: 755px) {
    position: relative;
    width: 420px;
    height: 660px;
    background: #f2f6ff;
    border-radius: 16px;
    margin-left: 10%;
    top: 5%;
  }
`;
const TopBar = styled.div`
  padding-top: 7px;
  padding-right: 7px;
  height: 24px;
  background: #f5f5f5;
  display: flex;
  justify-content: flex-end;

  @media screen and (max-width: 1440px) {
    border-radius: 20px;
  }

  div {
    display: flex;
    justify-content: space-between;
    width: 53px;

    @media screen and (min-width: 755px) {
      display: none;
    }

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
  @media screen and (min-width: 755px) {
    display: none;
  }
`;
const Text = styled.p`
  margin-left: 24px;
  color: #757575;
`;

const LogoWrapper = styled.div`
  margin-left: 130px;
  margin-top: 40px;
  @media screen and (max-width: 755px) {
    display: none;
  }
`;

const PartnersWrapper = styled.div`
  width: 67px;
  height: 23px;
  margin-left: 130px;
  margin-bottom: 60px;
  @media screen and (max-width: 755px) {
    display: none;
  }
`;

const InputBox = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  padding-right: 16px;
  padding-left: 16px;

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

const InputBoxText = styled.div`
  margin-bottom: 32px;
  font-weight: 500;
  font-size: 17px;
  line-height: 25px;
  margin-left: 10px;
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
    font-size: 14px;
    line-height: 14px;
    font-weight: bold;
    color: white;
    justify-content: center;
  }
`;
const ChangeButton = styled.button`
  margin-top: 50%;
  height: 48px;
  background: #bdbdbd;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.08em;
  color: #ffffff;

  @media screen and (max-width: 755px) {
    margin-top: 65%;
  }
`;
