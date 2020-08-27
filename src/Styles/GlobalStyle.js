import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    font-family:"Alliance";
}
  input:focus,
  button:focus {
    outline: none;
  }
  input,
  button {
    background-color: inherit;
    border: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
