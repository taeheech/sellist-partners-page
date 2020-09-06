import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    font-family: ‘Roboto’, sans-serif;
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
  <style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
</style>
`;

export default GlobalStyle;
