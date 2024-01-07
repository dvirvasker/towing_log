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

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function SimpleInfoCard({ color, icon, title, description, value, py }) {
  return (
    <Card>
      <MDBox p={1} mx={2} display="flex" justifyContent="center">
        {icon && (
          <MDBox
            display="grid"
            justifyContent="center"
            alignItems="center"
            bgColor={color}
            color="white"
            width="4rem"
            height="4rem"
            shadow="md"
            borderRadius="lg"
            variant="gradient"
          >
            <Icon fontSize="default">{icon}</Icon>
          </MDBox>
        )}
      </MDBox>
      <MDBox pb={1} py={py} px={1} textAlign="center" lineHeight={1}>
        {value && (
          <MDTypography variant="h5" fontWeight="medium">
            {value}
          </MDTypography>
        )}
        {description && !value ? null : <Divider />}
        <MDTypography variant="h6" fontWeight="large" textTransform="capitalize">
          {title}
        </MDTypography>
        {description && (
          <MDTypography variant="caption" color="text" fontWeight="regular">
            {description}
          </MDTypography>
        )}
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of SimpleInfoCard
SimpleInfoCard.defaultProps = {
  color: "mekatnar",
  value: "",
  description: "",
  py: 1,
};

// Typechecking props for the SimpleInfoCard
SimpleInfoCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "mekatnar",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  py: PropTypes.number,
};

export default SimpleInfoCard;
