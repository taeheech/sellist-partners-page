import React, { useState } from "react";
import styled from "styled-components";

import LogIn from "./LogIn";
import Register from "./Register";
import { center, container, topbar } from "../../Config/commonStyles";

import Logo from "../../Images/Logo";
import Partners from "../../Images/Partners";

function Home(props) {
  const propsFromHomePage = props.props;

  const [activeTab, setActiveTab] = useState(false);

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
        <Content>
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
          <Tab>
            <ul>
              <li onClick={() => setActiveTab(true)}>
                <div className={activeTab && "tabStyle"}> 가 입 </div>
              </li>
              <li onClick={() => setActiveTab(false)}>
                <div className={activeTab || "tabStyle"}>로그인</div>
              </li>
            </ul>
          </Tab>
          {activeTab ? (
            <Register props={propsFromHomePage} setActiveTab={setActiveTab} />
          ) : (
            <LogIn props={propsFromHomePage} />
          )}
        </Content>
      </Container>
    </Center>
  );
}
export default Home;

const Center = center;

const Container = container;

const Content = styled.div``;

const TopBar = topbar;

const Header = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    position: relative;
    width: 154px;
    height: 58px;

    .logo {
      position: absolute;
      top: 0;
      left: 0;
    }

    .partners {
      width: 67px;
      height: 23px;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
`;

const Tab = styled.div`
  margin-top: 10%;
  padding-right: 16px;
  padding-left: 16px;

  ul {
    display: flex;

    li {
      font-style: normal;
      font-weight: bold;
      font-size: 12px;
      letter-spacing: 0.08em;
      width: 100%;
      height: 29px;
      text-align: center;
      color: #757575;
      cursor: pointer;

      .tabStyle {
        height: 29px;
        border-bottom: 1px solid rgb(33, 33, 33);
        color: #212121;
      }
    }
  }
`;
