/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

export default styled(CircularProgress)(({ theme, ownerState }) => {
  const { palette, functions } = theme;
  const { color, value, variant } = ownerState;

  const { text, gradients } = palette;
  const { linearGradient } = functions;

  // background value
  let backgroundValue;

  if (variant === "gradient") {
    backgroundValue = gradients[color]
      ? linearGradient(gradients[color].main, gradients[color].state)
      : linearGradient(gradients.mekatnar.main, gradients.mekatnar.state);
  } else {
    backgroundValue = palette[color] ? palette[color].main : palette.mekatnar.main;
  }

  return {
    "& .MuiCircularProgress-bar": {
      background: backgroundValue,
      width: `${value}%`,
      color: text.main,
    },
  };
});
