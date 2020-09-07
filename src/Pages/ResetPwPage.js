import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Snackbar } from "@material-ui/core";
import { SnackbarContent } from "@material-ui/core";

import ResetPw from "../Components/resetPw/ResetPw";
import { tokenApi, TOKEN } from "../Config/urls";

import Img1 from "../Images/MaskGroup.png";
import Img2 from "../Images/MaskGroup2.png";

function ResetPwPage(props) {
  const [valid, setvalid] = useState(false);
  const [open, setOpen] = useState(false);

  let url = props.location.search;
  let i = url.indexOf("=");
  let token = url.slice(i + 1, url.length);

  function checkIfTokenValid() {
    // const api = "https://api.buzzikid.com/PartnersApi/validate_reset_token.php";
    const formData = new FormData();
    formData.append("token", token);
    fetch(tokenApi, {
      method: "POST",
      headers: {
        Authorization: TOKEN,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === 1) {
          setvalid(true);
        } else {
          setvalid(false);
          setOpen(true);
          setTimeout(() => {
            props.history.push("/");
          }, 2000);
        }
      });
  }

  useEffect(() => {
    checkIfTokenValid();
  });

  if (valid) {
    return (
      <Container>
        <ImgRight src={Img1} />
        <ImgLeft src={Img2} />
        <ResetPw props={props} token={token} />
      </Container>
    );
  }
  return (
    <Container>
      <Snackbar
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        open={open}
        message="링크의 유효기간이 만료되었습니다."
      >
        <SnackbarContent
          message="링크의 유효기간이 만료되었습니다."
          style={{
            backgroundColor: " #E5E5E5",
          }}
        />
      </Snackbar>
    </Container>
  );
}

export default ResetPwPage;

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
  width: 20%;
  border-radius: 20px;
  opacity: 0.4;
  box-shadow: -30px -8px #384bc7;
  @media screen and (max-width: 755px) {
    display: none;
  }
`;

// const SnackbarWraper = styled.div`
//   position: absolute;
//   top: 50%;
// `;
