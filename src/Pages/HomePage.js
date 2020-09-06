import React from "react";
import { useMediaQuery } from "react-responsive";

import HomeMobile from "../Components/homeComponents/HomeMobile";
import HomeDesktop from "../Components/homeComponents/HomeDesktop";

function HomePage(props) {
  const isPortrait = useMediaQuery({ query: "min-width:530" });

  return (
    <>
      {isPortrait ? (
        <HomeMobile props={props} />
      ) : (
        <HomeDesktop props={props} />
      )}
    </>
  );
}
export default HomePage;
