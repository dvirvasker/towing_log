/* eslint-disable import/no-unresolved */
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
/* eslint-disable no-unused-vars */
import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";

// Custom styles for MDProgress
import MDProgressRoot from "components/MDCircularProgress/MDProgressRoot";
import MDBadge from "components/MDBadge";

const MDProgress = forwardRef(({ variant, color, value, label, ...rest }, ref) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row-reverse",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-around",
      height: "15vh",
    }}
  >
    <MDProgressRoot
      size={130}
      thickness={5}
      color={value === "0" || value === 0 ? "light" : color}
      // {...rest}
      // ref={ref}
      variant="determinate"
      value={value === "0" || value === 0 ? 100 : value}
      ownerState={{ color, value, variant }}
    />
    <MDBadge
      style={{
        position: "absolute",
      }}
      color={color}
      badgeContent={`${value}%`}
      variant="contained"
      container
    />
  </div>
));

// Setting default values for the props of MDProgress
MDProgress.defaultProps = {
  variant: "contained",
  color: "mekatnar",
  value: 0,
  label: false,
};

// Typechecking props for the MDProgress
MDProgress.propTypes = {
  variant: PropTypes.oneOf(["contained", "gradient"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "mekatnar",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  value: PropTypes.number,
  label: PropTypes.bool,
};

export default MDProgress;
