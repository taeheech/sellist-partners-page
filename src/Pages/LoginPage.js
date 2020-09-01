import React from "react";
import { useMediaQuery } from "react-responsive";
import PartnersMobile from "./PartnersMobile";
import PartnersDesktop from "./PartnersDesktop";

function LoginPage(props) {
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  return (
    <>{isPortrait ? <PartnersMobile props={props} /> : <PartnersDesktop />}</>
  );
}
export default LoginPage;
