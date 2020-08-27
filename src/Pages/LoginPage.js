import React from "react";
import { useMediaQuery } from "react-responsive";
import PartnersMobile from "./PartnersMobile";
import PartnersDesktop from "./PartnersDesktop";

function LoginPage() {
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  return <>{isPortrait ? <PartnersMobile /> : <PartnersDesktop />}</>;
}
export default LoginPage;
