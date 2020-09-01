import React from "react";
import { useMediaQuery } from "react-responsive";
import PartnersMobile from "../Components/PartnersMobile";
import HomeDesktop from "../Components/HomeDesktop";

function HomePage(props) {
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  return (
    <>
      {isPortrait ? (
        <PartnersMobile props={props} />
      ) : (
        <HomeDesktop props={props} />
      )}
    </>
  );
}
export default HomePage;
