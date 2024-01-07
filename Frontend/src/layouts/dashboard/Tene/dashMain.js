/* eslint-disable react/no-array-index-key */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
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
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import { Dialog, DialogContent, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import adminManagementData from "layouts/tables/data/userManagementTable";
import { useEffect, useState } from "react";

import { authenticate, isAuthenticated, signin } from "auth/index";
import axios from "axios";
import AppThumnailCard from "examples/Cards/AppThumnailCard";
import ImgDoughnutChart from "examples/Charts/DoughnutCharts/ImgDoughnutChart";
import { Navigate, Outlet } from "react-router-dom";
import { CardBody, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";

import Img3 from "assets/images/unitsimg/pikudmerkaz.png";
import Img2 from "assets/images/unitsimg/pikudtzafon.png";
import DashboardHeader from "../components/DashboardHeader";

const number = 15;

const MainDashbord = () => {
  const tableApps = [
    {
      name: "תמונת מצב",
      link: "/genralInfo",
      linkType: "internal",
      image: Img3,
    },
    {
      name: "כשירות מסגרות",
      link: "/kshirotMisgrot",
      linkType: "internal",
      image: Img3,
    },
    {
      name: "משקים והמאמץ הטכנולוגי",
      link: "/mashkTech",
      linkType: "internal",
      image: Img3,
    },
    {
      name: "כלים פגועים",
      link: "/damegedTools",
      linkType: "internal",
      image: Img3,
    },
    {
      name: "נסועה ושחיקה",
      link: "/nesoaShchika",
      linkType: "internal",
      image: Img3,
    },
    {
      name: "חלפים",
      link: "/halfim",
      linkType: "internal",
      image: Img3,
    },
    // {
    //   name: "תובנות מרכזיות",
    //   link: "/summaryInsights",
    //   linkType: "internal",
    //   image: Img3,
    // },
  ];

  const dashbord = () => (
    <MDBox py={6}>
      <Grid container spacing={3}>
        {tableApps.map((app, index) => (
          <Grid item xs={12} md={8} lg={4} key={index}>
            <AppThumnailCard
              color="mekatnar"
              title={app.name}
              image={app.image}
              action={{
                type: app.linkType,
                route: app.link,
              }}
            />
          </Grid>
        ))}
      </Grid>
    </MDBox>
  );
  return (
    <div style={{ padding: "2%" }}>
      {/* <DashboardNavbar /> */}
      <DashboardHeader />
      {dashbord()}

      {/* <ImgDoughnutChart
        icon={{ color: "info", component: "leaderboard" }}
        title="Default Doughnut Chart"
        description="Affiliates program"
        chart={{
          labels: ["V", "X"],
          datasets: {
            label: "Projects",
            backgroundColors: ["success", "error"],
            data: [number, 100 - number],
          },
        }}
        donatImg={Img2}
      />
      <ImgDoughnutChart
        icon={{ color: "info", component: "leaderboard" }}
        title="Default Doughnut Chart"
        description="Affiliates program"
        chart={{
          labels: ["V", "X"],
          datasets: {
            label: "Projects",
            backgroundColors: ["success", "error"],
            data: [number, 100 - number],
          },
        }}
        donatImg={Img3}
      /> */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainDashbord;
