import React, { useState } from "react";
import styled from "styled-components";
import { Snackbar } from "@material-ui/core";
import { SnackbarContent } from "@material-ui/core";

import { forgotPwApi, TOKEN } from "../../Config/urls";

import ArrowBack from "../../Images/ArrowBack";
import Logo from "../../Images/Logo";
import Partners from "../../Images/Partners";

function ForgotPassword(props) {
  const propsFromPage = props.props;
  const [open, setOpen] = useState(false);
  const [input, setUserEmail] = useState({ userEmail: "" });
  const btnActive = !(input.userEmail.length > 0);
  const [success, setSuccess] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function InputUserEmail(e) {
    setUserEmail({ userEmail: e.target.value });
  }

  const handleClick = (e) => {
    console.log("클릭");
    // const api = "https://api.buzzikid.com/PartnersApi/pswd_reset_request.php";
    const formData = new FormData();
    formData.append("email", input.userEmail);
    fetch(forgotPwApi, {
      method: "POST",
      headers: {
        Authorization: TOKEN,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === 1) {
          setOpen(true);
          setSuccess(true);
          setTimeout(() => {
            propsFromPage.history.push("/");
          }, 2500);
        }
        if (res.success === 0) {
          setOpen(true);
          setSuccess(false);
        }
      });
  };

  return (
    <Center>
      <Container>
        <TopBar>
          <div>
            <div className="rectangle"></div>
            <div className="circle"></div>
            <div className="triangle"></div>
          </div>
        </TopBar>
        <TopBox>
          <div onClick={() => propsFromPage.history.push("/")}>
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
            onChange={InputUserEmail}
          />
        </InputBox>
        <FooterBox>
          <ChangeButton
            disabled={btnActive}
            button={btnActive}
            onClick={handleClick}
          >
            비밀번호 찾기
          </ChangeButton>
          <Snackbar
            anchorOrigin={{
              vertical: "",
              horizontal: "center",
            }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
          >
            <SnackbarContent
              message={
                success
                  ? "비밀번호 재설정을 위한 Email이 사용자의 계정으로 전송되었습니다."
                  : "이메일을 확인해 주세요"
              }
              style={{
                backgroundColor: " #E5E5E5",
              }}
            />
          </Snackbar>
        </FooterBox>
      </Container>
    </Center>
  );
}
export default ForgotPassword;

const Center = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Container = styled.div`
  background: #f2f6ff;
  width: 100vw;
  height: 100vh;
  @media screen and (min-width: 530px) {
    width: 420px;
    height: 660px;
    background: #f2f6ff;
    border-radius: 16px;
    margin-left: 12vw;
  }
`;
const TopBar = styled.div`
  padding-top: 7px;
  padding-right: 7px;
  height: 24px;
  background: #f5f5f5;
  display: flex;
  justify-content: flex-end;
  @media screen and (min-width: 530px) {
    border-radius: 20px;
    background: #f2f6ff;
    padding-top: 7px;
    padding-right: 7px;
    height: 24px;
    display: flex;
    justify-content: flex-end;
  }
  div {
    display: flex;
    justify-content: space-between;
    width: 53px;
    @media screen and (min-width: 530px) {
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
  @media screen and (min-width: 530px) {
    display: none;
  }
`;
const LogoWrapper = styled.div`
  margin-left: 130px;
  margin-top: 40px;
  @media screen and (max-width: 530px) {
    display: none;
  }
`;
const PartnersWrapper = styled.div`
  width: 67px;
  height: 23px;
  margin-left: 130px;
  margin-bottom: 60px;
  @media screen and (max-width: 530px) {
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
  ${({ button }) => (button ? `background: #BDBDBD;` : `background: #212121;`)}
  @media screen and (max-width: 530px) {
    margin-top: 65%;
  }
`;
