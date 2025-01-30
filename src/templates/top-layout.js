import "@fontsource/roboto";
// import "../../src/normalize.css";
// import "../../src/style.css";

import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../src/theme";

export default function TopLayout(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
}

import React from "react";
import TopLayout from "./TopLayout";

export const wrapRootElement = ({ element }) => {
  return <TopLayout>{element}</TopLayout>;
};