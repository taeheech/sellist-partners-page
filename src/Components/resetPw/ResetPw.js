import React, { useState } from "react";
import styled from "styled-components";
import { Snackbar } from "@material-ui/core";
import { SnackbarContent } from "@material-ui/core";

import { resetPwApi, TOKEN } from "../../Config/urls";
import { center, container, topbar, header } from "../../Config/commonStyles";

import Logo from "../../Images/Logo";
import Partners from "../../Images/Partners";
import ArrowBack from "../../Images/ArrowBack";

function ResetPw(props) {
  const propsFromResetPwPage = props.props;

  const [error, setError] = useState(false);
  const [inputState, setInputState] = useState({
    newPassword: "",
    checkPassword: "",
  });
  const [open, setOpen] = useState(false);

  const regPassword = /^[a-zA-Z0-9!@#$%\^&*)(+=._-]{8,}$/; //영문대소문,숫자,특수문자,최소8자
  const isBtnActive =
    inputState.newPassword.length > 0 && inputState.checkPassword.length > 0;
  const pwFilled = inputState.newPassword !== "";
  const pwCheckFilled = inputState.checkPassword.length > 0;

  function inputHandler(e) {
    const { name, value } = e.target;

    if (name === "newPassword" && !regPassword.test(value)) {
      setError(true);
      if (value.length === 0) {
        setError(false);
        setInputState({ newPassword: "", checkPassword: "" });
      }
    } else {
      setError(false);
      setInputState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  }

  function handlebtn(e) {
    const { newPassword, checkPassword } = inputState;
    if (regPassword.test(newPassword)) {
    }
    if (newPassword !== checkPassword) {
      alert("비밀번호가 일치하지 않습니다.");
    } else if (newPassword === checkPassword) {
      getFetch();
    }
  }

  function getFetch() {
    const formData = new FormData();
    formData.append("password", inputState.newPassword);
    formData.append("token", props.token);
    fetch(resetPwApi, {
      method: "post",
      headers: {
        Authorization: TOKEN,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === 1) {
          setOpen(true);
          setTimeout(() => {
            propsFromResetPwPage.history.push("/");
          }, 3000);
        }
      });
  }

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
          <div onClick={() => propsFromResetPwPage.history.push("/")}>
            <ArrowBack />
          </div>
        </TopBox>
        {/* <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <PartnersWrapper>
          <Partners />
        </PartnersWrapper> */}
        <Header>
          <div>
            <div className="logo">
              <Logo />
            </div>
            <div className="partners">
              <Partners />
            </div>
          </div>
        </Header>
        <InputBox
          error={error}
          pwFilled={pwFilled}
          pwCheckFilled={pwCheckFilled}
        >
          <InputBoxText>새로운 비밀번호를 입력하세요.</InputBoxText>
          <input
            type="password"
            placeholder="새 비밀번호"
            className="newPw errorForPw"
            name="newPassword"
            onChange={inputHandler}
          />
          {error && (
            <div className="passwordError">
              비밀번호는 최소 8자 이상이어야 합니다.
            </div>
          )}
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="checkNewPw"
            onChange={inputHandler}
            name="checkPassword"
          />
        </InputBox>
        <FooterBox>
          <ChangeButton
            button={isBtnActive}
            disabled={!isBtnActive}
            onClick={handlebtn}
          >
            비밀번호 변경
          </ChangeButton>
          <Snackbar
            anchorOrigin={{
              vertical: "",
              horizontal: "center",
            }}
            open={open}
            autoHideDuration={3000}
          >
            <SnackbarContent
              message="비밀번호가 변경되었습니다."
              style={{
                backgroundColor: "#757575",
              }}
            />
          </Snackbar>
        </FooterBox>
      </Container>
    </Center>
  );
}
export default ResetPw;

const Center = center;

const Container = container;

const TopBar = topbar;

const TopBox = styled.div`
  display: flex;
  height: 56px;
  padding: 32px;
  cursor: pointer;
  @media screen and (min-width: 529px) {
    display: none;
  }
`;

const Header = header;

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
  .errorForPw {
    ${({ error }) => error && `border-bottom: 1px solid red`}
  }

  .passwordError {
    top: -16px;
    font-size: 13px;
    color: #e64a19;
    left: 2%;
  }
  .checkNewPw {
    margin-top: 5%;
  }
`;
const InputBoxText = styled.div`
  margin-bottom: 32px;
  font-weight: 500;
  font-size: 21px;
  line-height: 25px;
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
  margin-top: 37%;
  height: 48px;
  background: #bdbdbd;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.08em;
  color: #ffffff;
  @media screen and (max-width: 529px) {
    margin-top: 55%;
  }
  ${({ button }) => (button ? `background: #212121;` : `background: #BDBDBD;`)}
`;
