/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";

import { Link, withRouter, Redirect } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
// reactstrap components
import {
  Button,
  ButtonGroup,
  // Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Container,
  Col,
  Collapse,
} from "reactstrap";
import TowingLogo from "assets/images/projectLogoImages/towinglog.odd";

function HozlaAbout() {
  return (
    <Card>
      <MDBox
        variant="gradient"
        bgColor="mekatnar"
        borderRadius="lg"
        coloredShadow="mekatnar"
        mx={2}
        mt={-3}
        p={2}
        mb={1}
        textAlign="center"
      >
        <MDBox component="img" src={TowingLogo} alt="TowingLogo" width="10rem" alignSelf="center" />
        {/* <MDTypography variant="h4" fontWeight="medium"    mt={1}>מערכת הוצל"א</MDTypography> */}
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDTypography variant="h5" fontWeight="medium" mt={1}>
          מערכת יומן גרירות ייעוד המערכת הינו ניהול ותיעוד הזמנות הגרירות ליחידה 791 באגד טנ"א ארצי.
          תהליכים זמינים למשתמש במערכת: הזנת טופס הזמנת שירות עדכון וצפייה בטפסי הזמנות שירות צפייה
          בדשבורד שירות המציג את סטטוס ההזמנות, ההזמנות להיום, ועוד.
        </MDTypography>
      </MDBox>
    </Card>
  );
}

export default HozlaAbout;
